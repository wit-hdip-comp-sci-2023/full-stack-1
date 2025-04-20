<script lang="ts">
  import { curentDataSets, currentCandidates, currentDonations, loggedInUser, subTitle } from "$lib/runes.svelte";
  import type { ActionResult } from "@sveltejs/kit";
  import Card from "$lib/ui/Card.svelte";
  import DonateForm from "./DonateForm.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import DonationList from "$lib/ui/DonationList.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import { refreshDonationMap, refreshDonationState } from "$lib/services/donation-utils";

  subTitle.text = "Make a Donation";

  let data = $props();

  const handleDonationSuccess = () => {
    return async ({ result }: { result: ActionResult }) => {
      if (result.type === "success") {
        await refreshDonationState();
        const latestDonation = currentDonations.donations[currentDonations.donations.length - 1];
        map.addMarker(latestDonation.lat, latestDonation.lng, "");
        map.moveTo(latestDonation.lat, latestDonation.lng);
      }
    };
  };

  let map: LeafletMap;

  onMount(async () => {
    await refreshDonationState(data.donations, data.candidates);
    await refreshDonationMap(map);
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Donations to Date">
      <LeafletMap height={50} bind:this={map} />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonateForm candidateList={currentCandidates.candidates} enhanceFn={handleDonationSuccess} />
    </Card>
  </div>
</div>
<div class="columns">
  <div class="column">
    <Card title="Donations to Date">
      <Chart data={curentDataSets.donationsByCandidate} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonationList />
    </Card>
  </div>
</div>
