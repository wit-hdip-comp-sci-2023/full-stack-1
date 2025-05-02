import { donationService } from "$lib/services/donation-service";
import type { Session } from "$lib/types/donation-types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const cookieStr = cookies.get("donation-user") as string;
  if (cookieStr) {
    const session = JSON.parse(cookieStr) as Session;
    return {
      donations: await donationService.getDonations(session.token),
      candidates: await donationService.getCandidates(session.token)
    };
  }
};


// export const load: PageServerLoad = async ({ parent }) => {
//   const { session } = await parent();
//   if (session) {
//     return {
//       donations: await donationService.getDonations(session.token),
//       candidates: await donationService.getCandidates(session.token)
//     };
//   }
// };