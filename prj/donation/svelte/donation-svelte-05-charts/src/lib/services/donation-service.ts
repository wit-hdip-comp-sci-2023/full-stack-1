import axios from "axios";
import type { Session, User } from "$lib/types/donation-types";
import type { Candidate, Donation } from "$lib/types/donation-types";

export const donationService = {
  baseUrl: "http://localhost:4000",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data.id
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async donate(donation: Donation, session: Session) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.post(this.baseUrl + "/api/candidates/" + donation.candidate + "/donations", donation);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  },

  async getCandidates(session: Session): Promise<Candidate[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/candidates");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getDonations(session: Session): Promise<Donation[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/donations");
      return response.data;
    } catch (error) {
      return [];
    }
  }
};
