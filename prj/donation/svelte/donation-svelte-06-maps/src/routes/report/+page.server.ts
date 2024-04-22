import { get } from "svelte/store";
import { donationService } from "$lib/services/donation-service";
import type { PageServerLoad } from "./$types";
import { currentSession } from "$lib/stores";

export const ssr = false;

export const load: PageServerLoad = async () => {
  const donations = await donationService.getDonations(get(currentSession));
  return { donations: donations };
};

// import { browser } from "$app/environment";
// if (browser) {
//   const savedSession = localStorage.donation;
//   if (savedSession) {
//     const session = JSON.parse(savedSession);
//     currentSession.set(session);
//   }
// }
