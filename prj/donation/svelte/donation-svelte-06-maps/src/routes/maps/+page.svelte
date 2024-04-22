<script lang="ts">
  import { currentSession, subTitle } from "$lib/stores";
  import { donationService } from "$lib/services/donation-service";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import type { Donation } from "$lib/types/donation-types";
  import { get } from "svelte/store";

  subTitle.set("Donations Geo Data");
  let map: LeafletMap;

  onMount(async () => {
    const donations = await donationService.getDonations(get(currentSession));
    donations.forEach((donation: Donation) => {
      if (typeof donation.candidate !== "string") {
        const popup = `${donation.candidate.firstName} ${donation.candidate.lastName}: €${donation.amount}`;
        map.addMarker(donation.lat, donation.lng, popup);
      }
    });
    const lastDonation = donations[donations.length - 1];
    if (lastDonation) map.moveTo(lastDonation.lat, lastDonation.lng);
  });
</script>

<Card title="Donations Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>
