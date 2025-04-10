import { curentDataSets, currentDonations, loggedInUser } from "$lib/runes.svelte";
import type { Candidate, Donation } from "$lib/types/donation-types";
import type LeafletMap from "$lib/ui/LeafletMap.svelte";
import { donationService } from "./donation-service";

export function computeByMethod(donationList: Donation[]) {
    donationList.forEach((donation) => {
        if (donation.method == "paypal") {
            curentDataSets.donationsByMethod.datasets[0].values[0] += donation.amount;
        } else if (donation.method == "direct") {
            curentDataSets.donationsByMethod.datasets[0].values[1] += donation.amount;
        }
    });
}

export function computeByCandidate(donationList: Donation[], candidates: Candidate[]) {
    curentDataSets.donationsByCandidate.labels = [];
    candidates.forEach((candidate) => {
        curentDataSets.donationsByCandidate.labels.push(`${candidate.lastName}, ${candidate.firstName}`);
        curentDataSets.donationsByCandidate.datasets[0].values.push(0);
    });

    candidates.forEach((candidate, i) => {
        donationList.forEach((donation) => {
            if (typeof donation.candidate !== "string") {
                if (donation.candidate._id == candidate._id) {
                    curentDataSets.donationsByCandidate.datasets[0].values[i] += donation.amount;
                }
            }
        });
    });
}

export async function refreshDonationMap (map:LeafletMap) {
    if (!loggedInUser.token) donationService.restoreSession();
    const donations = await donationService.getDonations(loggedInUser.token);
    donations.forEach((donation: Donation) => {
        if (typeof donation.candidate !== "string") {
          const popup = `${donation.candidate.firstName} ${donation.candidate.lastName}: €${donation.amount}`;
          map.addMarker(donation.lat, donation.lng, popup);
        }
      });
      const lastDonation = donations[donations.length - 1];
      if (lastDonation) map.moveTo(lastDonation.lat, lastDonation.lng);
}
