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
  import type { Donation } from "$lib/types/donation-types";
  import type { PageProps } from "./$types";

  subTitle.text = "Make a Donation";

  let { data }: PageProps = $props();
  let message = $state("Please Donate!");

  const handleDonationSuccess = () => {
    return async ({ result }: { result: ActionResult }) => {
      if (result.type === "success") {
        const donation = result.data as Donation;
        currentDonations.donations.push(donation);
        map.addMarker(donation.lat, donation.lng, "");
        map.moveTo(donation.lat, donation.lng);
        refreshDonationState(currentDonations.donations, currentCandidates.candidates);
        message = `Thanks! You donated ${donation.amount} to ${donation.candidate.firstName} ${donation.candidate.lastName}`;
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
      <DonateForm candidateList={currentCandidates.candidates} enhanceFn={handleDonationSuccess} {message} />
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
