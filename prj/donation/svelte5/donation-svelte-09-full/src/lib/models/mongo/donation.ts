import type { Donation } from "$lib/types/donation-types";
import mongoose, { Model } from "mongoose";

const donationSchema = new mongoose.Schema<Donation>({
  amount: Number,
  method: String,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate"
  },
  lat: Number,
  lng: Number
});

let DonationMongoose: Model<Donation>;
try {
  // Try to get the existing model
  DonationMongoose = mongoose.model<Donation>("Donation");
} catch {
  // Model doesn't exist, create it
  DonationMongoose = mongoose.model<Donation>("Donation", donationSchema);
}

export { DonationMongoose };
