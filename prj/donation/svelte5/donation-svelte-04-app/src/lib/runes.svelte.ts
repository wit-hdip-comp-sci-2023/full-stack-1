import type { Donation } from "./types/donation-types";

export const subTitle = $state({ text: "" });
export const loggedInUser = $state({ 
    email: "",
    name: "",
    token: "",
    _id: ""
 });
 export const latestDonations = $state({donations: [] as Donation[]});