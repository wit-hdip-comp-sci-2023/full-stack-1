import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { createToken } from "./jwt-utils.js";
import { User } from "../types/donation-types.js";

export const userApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const users = await db.userStore.find();
        return h.response(users).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const user = (await db.userStore.findOne(request.params.id)) as User;
        if (user === null) {
          return Boom.notFound("No User with this id");
        }
        return h.response(user).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        console.log("HERE");
        const userPayload = request.payload as User;
        console.log(userPayload);
        const user = (await db.userStore.add(userPayload)) as User;
        return h.response({ success: true }).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.userStore.delete();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  authenticate: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      const payload = request.payload as User;
      try {
        const user = (await db.userStore.findBy(payload.email)) as User;
        if (user === null) return Boom.unauthorized("User not found");
        const passwordsMatch: boolean = payload.password === user.password;
        if (!passwordsMatch) return Boom.unauthorized("Invalid password");
        const token = createToken(user);
        return h.response({ success: true, 
                            name: `${user.firstName} ${user.lastName}`, 
                            token: token, _id: user._id 
                          }).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
