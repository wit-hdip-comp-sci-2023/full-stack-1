import type { User } from "$lib/types/donation-types";
import { Schema, model } from "mongoose";
import pkg from "mongoose";
const { models } = pkg;

const userSchema = new Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

export const UserMongoose = models["User"] || model("User", userSchema);
