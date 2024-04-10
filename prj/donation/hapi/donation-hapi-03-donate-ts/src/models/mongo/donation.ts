import { Schema, model } from "mongoose";
import { Donation } from "../../types/donation-types";

const donationSchema = new Schema<Donation>({
  amount: Number,
  method: String,
  donor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidate",
  },
  lat: String,
  lng: String,
});

export const DonationMongoose = model("Donation", donationSchema);
