import type { Candidate } from "$lib/types/donation-types";
import mongoose, { Model } from "mongoose";

const candidateSchema = new mongoose.Schema<Candidate>({
  firstName: String,
  lastName: String,
  office: String
});

let CandidateMongoose: Model<Candidate>;
try {
  // Try to get the existing model
  CandidateMongoose = mongoose.model<Candidate>("Candidate");
} catch {
  // Model doesn't exist, create it
  CandidateMongoose = mongoose.model<Candidate>("Candidate", candidateSchema);
}

export { CandidateMongoose };
