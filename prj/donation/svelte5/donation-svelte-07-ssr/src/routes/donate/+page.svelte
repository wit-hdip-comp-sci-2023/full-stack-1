<script lang="ts">
  import { curentDataSets, currentCandidates, currentDonations, loggedInUser, subTitle } from "$lib/runes.svelte";
  import { enhance } from "$app/forms";
  import type { ActionResult } from "@sveltejs/kit";
  import Card from "$lib/ui/Card.svelte";
  import DonateForm from "./DonateForm.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import DonationList from "$lib/ui/DonationList.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import type { Candidate, Donation } from "$lib/types/donation-types";
  import { donationService } from "$lib/services/donation-service";
  import { computeByCandidate, computeByMethod, refreshDonationMap } from "$lib/services/donation-utils";

  subTitle.text = "Make a Donation";

  let data = $props();

  let latestDonation = $state<Donation | null>(null);

  const handleDonationSuccess = () => {
    return async ({ result }: { result: ActionResult }) => {
      if (result.type === "success") {
        await donationService.refreshDonationState();
        console.log(currentDonations.donations);
        latestDonation = currentDonations.donations[currentDonations.donations.length - 1];
      }
    };
  };

  let map: LeafletMap;

  $effect(() => {
    if (latestDonation) {
      donationMade(latestDonation);
    }
  });

  function donationMade(donation: Donation) {
    map.addMarker(donation.lat, donation.lng, "");
    map.moveTo(donation.lat, donation.lng);
  }

  onMount(async () => {
    await refreshDonationMap(map);
    donationService.refreshDonationState(data.donations, data.candidates);
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
      {#key currentDonations.donations.length}
        <DonationList />
      {/key}
    </Card>
  </div>
</div>
