import { Schema, model } from "mongoose";
import { Candidate } from "../../types/donation-types";

const candidateSchema = new Schema<Candidate>({
  firstName: String,
  lastName: String,
  office: String,
});

export const CandidateMongoose = model("Candidate", candidateSchema);
