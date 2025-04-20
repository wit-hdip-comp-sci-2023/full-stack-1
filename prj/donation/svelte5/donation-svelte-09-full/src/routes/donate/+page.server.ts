import { donationService } from "$lib/services/donation-service";
import type { Session } from "$lib/types/donation-types";
import type { PageServerLoad } from "./$types";
import type { RequestEvent } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  return {
    donations: await donationService.getDonations(),
    candidates: await donationService.getCandidates()
  };
};

export const actions = {
  donate: async ({ request, cookies }: RequestEvent) => {
    const cookieStr = cookies.get("donation-user") as string;
    if (!cookieStr) {
      return { success: false, error: "No user session found" };
    }

    const session = JSON.parse(cookieStr) as Session;
    if (!session) {
      return { success: false, error: "Invalid session" };
    }

    const form = await request.formData();
    const donation = {
      amount: form.get("amount") as unknown as number,
      method: form.get("method") as string,
      candidate: form.get("candidate") as string,
      lat: form.get("lat") as unknown as number,
      lng: form.get("lng") as unknown as number,
      donor: session._id
    };

    try {
      const newDonation = await donationService.donate(donation);
      return newDonation;
    } catch (error) {
      return {
        success: false,
        error: "Failed to create donation"
      };
    }
  }
};
