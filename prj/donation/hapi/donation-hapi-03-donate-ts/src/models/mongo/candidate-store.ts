import { CandidateMongoose } from "./candidate.js";

export const candidateStore = {
  async find() {
    const candidates = await CandidateMongoose.find().lean();
    return candidates;
  },

  async findOne(id: string) {
    const candidate = await CandidateMongoose.findOne({ _id: id }).lean();
    return candidate;
  },

  async findBy(lastName: string, firstName: string) {
    const candidate = await CandidateMongoose.findOne({
      lastName,
      firstName,
    });
    return candidate;
  },
};
