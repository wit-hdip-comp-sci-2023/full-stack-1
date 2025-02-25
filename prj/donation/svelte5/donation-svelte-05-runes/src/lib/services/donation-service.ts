import axios from "axios";
import type { Session, User } from "$lib/types/donation-types";
import type { Candidate, Donation } from "$lib/types/donation-types";
import { currentDonations, currentCandidates, loggedInUser } from "$lib/runes.svelte";

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
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
        email,
        password
      });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        this.refreshDonationInfo();
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  saveSession(session: Session) {
    loggedInUser.email = session.name;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;
    localStorage.donation = JSON.stringify(loggedInUser);
  },

  async restoreSession() {
    const savedLoggedInUser = localStorage.donation;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
    }
    await this.refreshDonationInfo();
  },

  clearSession() {
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("donation");
  },

  async refreshDonationInfo() {
    if (loggedInUser.token) {
    currentDonations.donations = await this.getDonations(loggedInUser.token);
    currentCandidates.candidates = await this.getCandidates(loggedInUser.token);
    }
  },

  disconnect() {
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("donation");
  },

  async donate(donation: Donation, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(
        this.baseUrl + "/api/candidates/" + donation.candidate + "/donations",
        donation
      );
      await this.refreshDonationInfo();
      return response.status == 200;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getCandidates(token: string): Promise<Candidate[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/candidates");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getDonations(token: string): Promise<Donation[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/donations");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};
