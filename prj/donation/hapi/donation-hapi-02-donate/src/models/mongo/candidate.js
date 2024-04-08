import Mongoose from "mongoose";

const { Schema } = Mongoose;

const candidateSchema = new Schema({
  firstName: String,
  lastName: String,
  office: String,
});

export const CandidateMongoose = Mongoose.model("Candidate", candidateSchema);
