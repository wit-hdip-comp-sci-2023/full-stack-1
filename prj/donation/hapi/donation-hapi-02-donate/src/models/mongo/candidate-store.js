import { CandidateMongoose } from "./candidate.js";

export const candidateStore = {
  async find() {
    const candidates = await CandidateMongoose.find().lean();
    return candidates;
  },

  async findOne(id) {
    const candidate = await CandidateMongoose.findOne({ _id: id }).lean();
    return candidate;
  },

  async findBy(lastName, firstName) {
    const candidate = await CandidateMongoose.findOne({
      lastName,
      firstName,
    });
    return candidate;
  },
};
