import type { Donation } from "$lib/types/donation-types";
import { Schema, model } from "mongoose";

const donationSchema = new Schema<Donation>({
  amount: Number,
  method: String,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  donor: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidate"
  },
  lat: String,
  lng: String
});

export const DonationMongoose = model("Donation", donationSchema);
