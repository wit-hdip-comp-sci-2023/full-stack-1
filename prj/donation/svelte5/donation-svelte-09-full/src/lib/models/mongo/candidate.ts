import type { Candidate } from "$lib/types/donation-types";
import mongoose, { Model } from "mongoose";

const candidateSchema = new mongoose.Schema<Candidate>({
  firstName: String,
  lastName: String,
  office: String
});

let CandidateMongoose: Model<Candidate>;
try {
  CandidateMongoose = mongoose.model<Candidate>("Candidate");
} catch {
  CandidateMongoose = mongoose.model<Candidate>("Candidate", candidateSchema);
}

export { CandidateMongoose };
