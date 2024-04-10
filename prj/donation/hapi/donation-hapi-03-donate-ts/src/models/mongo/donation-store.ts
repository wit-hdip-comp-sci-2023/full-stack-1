import { Donation } from "../../types/donation-types.js";
import { DonationMongoose } from "./donation.js";

export const donationStore = {
  async find(): Promise<Donation[]> {
    const donations = await DonationMongoose.find().populate("donor").populate("candidate").lean();
    donations.forEach((donation) => {
      // @ts-ignore
      donation.donor = `${donation.donor.firstName} ${donation.donor.lastName}`;
    });
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
    let newDonation = new DonationMongoose({ ...donation });
    await newDonation.save();
    return newDonation;
  },

  async delete() {
    await DonationMongoose.deleteMany({});
  },
};
