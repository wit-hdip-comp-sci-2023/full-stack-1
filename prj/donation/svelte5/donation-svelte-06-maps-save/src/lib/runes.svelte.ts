import type { Candidate, Donation } from "./types/donation-types";

export const subTitle = $state({ text: "" });
export const loggedInUser = $state({
  email: "",
  name: "",
  token: "",
  _id: ""
});
export const currentDonations = $state({ donations: [] as Donation[] });
export const currentCandidates = $state({ candidates: [] as Candidate[] });
