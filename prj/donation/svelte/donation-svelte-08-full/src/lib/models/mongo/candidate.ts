import type { Candidate } from "$lib/types/donation-types";
import { Schema, model } from "mongoose";
import pkg from "mongoose";
const { models } = pkg;

const candidateSchema = new Schema<Candidate>({
  firstName: String,
  lastName: String,
  office: String
});

export const CandidateMongoose = models["Candidate"] || model("Candidate", candidateSchema);
