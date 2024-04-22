import type { Candidate } from "$lib/types/donation-types.js";
import { CandidateMongoose } from "./candidate.js";

export const candidateStore = {
  async find(): Promise<Candidate[]> {
    const candidates = await CandidateMongoose.find().lean();
    return candidates;
  },

  async findOne(id: string): Promise<Candidate | null> {
    const candidate = await CandidateMongoose.findOne({ _id: id }).lean();
    return candidate;
  },

  async findBy(lastName: string, firstName: string): Promise<Candidate | null> {
    const candidate = await CandidateMongoose.findOne({
      lastName,
      firstName
    }).lean();
    return candidate;
  }
};
