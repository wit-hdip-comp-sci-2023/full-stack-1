import type { Donation } from "$lib/types/donation-types.js";
import { DonationMongoose } from "./donation.js";

export const donationStore = {
  async find(): Promise<Donation[]> {
    const donations = await DonationMongoose.find().populate("donor").populate("candidate").lean();
    return donations;
  },

  async findBy(id: string): Promise<Donation | null> {
    const donation = await DonationMongoose.findOne({ candidate: id });
    if (!donation) {
      return null;
    }
    return donation;
  },

  async add(donation: Donation): Promise<Donation | null> {
    const newDonation = new DonationMongoose({ ...donation });
    await newDonation.save();
    const populatedDonation = await DonationMongoose.findById(newDonation._id).populate("donor").populate("candidate").lean();
    return populatedDonation;
  },

  async delete() {
    await DonationMongoose.deleteMany({});
  }
};
