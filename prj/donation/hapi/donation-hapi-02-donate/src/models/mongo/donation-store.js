import { DonationMongoose } from "./donation.js";

export const donationStore = {
  async find() {
    const donations = await DonationMongoose.find().populate("donor").populate("candidate").lean();
    donations.forEach((donation) => {
      // @ts-ignore
      donation.donor = `${donation.donor.firstName} ${donation.donor.lastName}`;
    });
    return donations;
  },

  async findBy(id) {
    const donations = await DonationMongoose.find({ candidate: id });
    return donations;
  },

  async add(donation) {
    let newDonation = new DonationMongoose({ ...donation });
    await newDonation.save();
    newDonation = await DonationMongoose.findOne({ _id: newDonation._id }).populate("candidate").lean();
    return newDonation;
  },

  async delete() {
    await DonationMongoose.deleteMany({});
  },
};
