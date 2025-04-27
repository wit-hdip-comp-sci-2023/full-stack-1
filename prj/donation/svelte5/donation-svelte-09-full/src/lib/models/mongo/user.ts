import type { User } from "$lib/types/donation-types";
import mongoose, { Model } from "mongoose";

const userSchema = new mongoose.Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

let UserMongoose: Model<User>;
try {
  UserMongoose = mongoose.model<User>("User");
} catch {
  UserMongoose = mongoose.model<User>("User", userSchema);
}

export { UserMongoose };
