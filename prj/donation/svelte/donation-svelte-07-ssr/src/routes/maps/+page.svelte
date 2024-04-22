<script lang="ts">
  import { subTitle } from "$lib/stores";
  import type { Donation } from "$lib/types/donation-types";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";

  export let data: any;
  let map: LeafletMap;

  subTitle.set("Donations Locations");

  onMount(async () => {
    const leaflet = await import("leaflet");
    const donations = data.donations;
    donations.forEach((donation: Donation) => {
      if (typeof donation.candidate !== "string") {
        const popup = `${donation.candidate.firstName} ${donation.candidate.lastName}: €${donation.amount}`;
        map.addMarker(donation.lat, donation.lng, popup);
      }
    });
    const lastDonation = donations[donations.length - 1];
    if (lastDonation && map) map.moveTo(lastDonation.lat, lastDonation.lng);
  });
</script>

<Card title="Donations Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>
