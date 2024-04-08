import { UserMongoose } from "./user.js";

export const userStore = {
  async find() {
    const users = await UserMongoose.find().lean();
    return users;
  },

  async findOne(id) {
    if (id) {
      const user = await UserMongoose.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async add(user) {
    const newUser = new UserMongoose(user);
    const userObj = await newUser.save();
    return userObj;
  },

  async findBy(email) {
    const user = await UserMongoose.findOne({ email: email }).lean();
    return user;
  },

  async deleteOne(id) {
    try {
      await UserMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async delete() {
    await UserMongoose.deleteMany({});
  },
};