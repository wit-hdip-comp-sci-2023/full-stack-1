import type { Donation } from "$lib/types/donation-types";
import mongoose, { Model } from "mongoose";

const donationSchema = new mongoose.Schema<Donation>({
  amount: Number,
  method: String,
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate"
  },
  lat: Number,
  lng: Number
});

let DonationMongoose: Model<Donation>;
try {
  DonationMongoose = mongoose.model<Donation>("Donation");
} catch {
  DonationMongoose = mongoose.model<Donation>("Donation", donationSchema);
}

export { DonationMongoose };
