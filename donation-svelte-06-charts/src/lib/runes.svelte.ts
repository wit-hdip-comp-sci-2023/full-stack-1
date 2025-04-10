import type { Candidate, Donation, DataSet } from "./types/donation-types";

export const subTitle = $state({ text: "" });
export const loggedInUser = $state({
  email: "",
  name: "",
  token: "",
  _id: ""
});
export const currentDonations = $state({
  donations: [] as Donation[],
});
export const currentCandidates = $state({ candidates: [] as Candidate[] });

export const curentDataSets = $state({
  donationsByMethod: {
    labels: ["paypal", "direct"],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  },
  donationsByCandidate: {
    labels: [],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  }
})


