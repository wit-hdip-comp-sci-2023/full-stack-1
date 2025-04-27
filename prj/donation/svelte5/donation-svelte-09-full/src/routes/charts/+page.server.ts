import { donationService } from "$lib/services/donation-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    donations: await donationService.getDonations(),
    candidates: await donationService.getCandidates()
  };
}