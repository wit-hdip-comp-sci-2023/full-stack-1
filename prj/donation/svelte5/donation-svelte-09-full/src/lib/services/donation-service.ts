import type { Session, User } from "$lib/types/donation-types";
import type { Candidate, Donation } from "$lib/types/donation-types";
import { userStore } from "$lib/models/mongo/user-store";
import { donationStore } from "$lib/models/mongo/donation-store";
import { candidateStore } from "$lib/models/mongo/candidate-store";

export const donationService = {
  async signup(user: User): Promise<boolean> {
    try {
      const newUser = await userStore.add(user);
      return !!newUser;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const user = await userStore.findBy(email);
      if (user !== null && user.password === password) {
        const session = {
          name: `${user.firstName} ${user.lastName}`,
          token: user._id!.toString(),
          _id: user._id!.toString(),
          email: user.email
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async donate(donation: Donation) {
    try {
      const newDonation = await donationStore.add(donation);
      return JSON.parse(JSON.stringify(newDonation));
    } catch (error) {
      return false;
    }
  },

  async getCandidates(): Promise<Candidate[]> {
    try {
      const candidates = await candidateStore.find();
      return JSON.parse(JSON.stringify(candidates));
    } catch (error) {
      return [];
    }
  },

  async getDonations(): Promise<Donation[]> {
    try {
      const donations = await donationStore.find();
      return JSON.parse(JSON.stringify(donations));
    } catch (error) {
      return [];
    }
  }
};
