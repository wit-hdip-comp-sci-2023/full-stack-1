<script lang="ts">
  import { currentDonations, subTitle } from "$lib/runes.svelte";
  import { refreshDonationMap } from "$lib/services/donation-utils";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";

  subTitle.text = "Donations Geo Data";
  let map: LeafletMap;

  export let data: any;
  currentDonations.donations = data.donations;

  onMount(async () => {
    await refreshDonationMap(map);
  });
</script>

<Card title="Donations Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>
