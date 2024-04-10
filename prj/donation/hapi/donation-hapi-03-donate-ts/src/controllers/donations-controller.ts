import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const donationsController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const candidates = await db.candidateStore.find();
      return h.view("donate", {
        title: "Make a Donation",
        user: loggedInUser,
        candidates: candidates,
      });
    },
  },
  donate: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const loggedInUser = request.auth.credentials;
        const donationPayload = request.payload as any;
        const donation = {
          amount: donationPayload.amount,
          method: donationPayload.method,
          donor: loggedInUser._id,
          candidate: donationPayload.candidate,
          lat: donationPayload.lat,
          lng: donationPayload.lng,
        };
        await db.donationStore.add(donation);

        return h.redirect("/donate");
      } catch (err: any) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
  report: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const donations = await db.donationStore.find();
      return h.view("report", {
        title: "Report",
        user: loggedInUser,
        donations: donations,
      });
    },
  },
};
