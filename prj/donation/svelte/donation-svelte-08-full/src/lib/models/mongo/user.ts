import type { User } from "$lib/types/donation-types";
import { Schema, model } from "mongoose";

const userSchema = new Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

export const UserMongoose = model("User", userSchema);
