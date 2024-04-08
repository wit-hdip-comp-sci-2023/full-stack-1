import Mongoose from "mongoose";

const { Schema } = Mongoose;

const donationSchema = new Schema({
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

export const DonationMongoose = Mongoose.model("Donation", donationSchema);
