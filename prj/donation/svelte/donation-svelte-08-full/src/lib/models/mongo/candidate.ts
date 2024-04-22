import type { Candidate } from "$lib/types/donation-types";
import { Schema, model } from "mongoose";

const candidateSchema = new Schema<Candidate>({
  firstName: String,
  lastName: String,
  office: String
});

export const CandidateMongoose = model("Candidate", candidateSchema);
