import { donationService } from "$lib/services/donation-service";
import type { Session } from "$lib/types/donation-types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    donations: await donationService.getDonations(),
    candidates: await donationService.getCandidates()
  };
};

export const actions = {
  donate: async ({ request, cookies }) => {
    const cookieStr = cookies.get("donation-user") as string;
    if (cookieStr) {
      const session = JSON.parse(cookieStr) as Session;
      if (session) {
        const form = await request.formData();
        const donation = {
          amount: form.get("amount") as unknown as number,
          method: form.get("method") as string,
          candidate: form.get("candidate") as string,
          lat: form.get("lat") as unknown as number,
          lng: form.get("lng") as unknown as number,
          donor: session._id
        };
        donationService.donate(donation);
      }
    }
  }
};
