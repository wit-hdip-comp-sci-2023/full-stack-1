<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { currentSession, latestDonation, subTitle } from "$lib/stores";
  import DonateForm from "./DonateForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { donationService } from "$lib/services/donation-service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { Candidate, DataSet, Donation } from "$lib/types/donation-types";
  import { generateByCandidate } from "$lib/services/donation-utils";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";

  let candidateList: Candidate[] = [];
  let donations: Donation[] = [];
  let donationsByCandidate: DataSet;
  let candidates: Candidate[] = [];
  let map: LeafletMap;

  subTitle.set("Make a Donation");

  onMount(async () => {
    candidateList = await donationService.getCandidates(get(currentSession));
    donations = await donationService.getDonations(get(currentSession));
    candidates = await donationService.getCandidates(get(currentSession));
    donationsByCandidate = generateByCandidate(donations, candidates);

    donations.forEach((donation: Donation) => {
      if (typeof donation.candidate !== "string") {
        const popup = `${donation.candidate.firstName} ${donation.candidate.lastName}: €${donation.amount}`;
        map.addMarker(donation.lat, donation.lng, popup);
      }
    });
    const lastDonation = donations[donations.length - 1];
    if (lastDonation) map.moveTo(lastDonation.lat, lastDonation.lng);
  });

  latestDonation.subscribe(async (donation) => {
    if (donation) {
      donations.push(donation);
      donations = [...donations];
      donationsByCandidate = generateByCandidate(donations, candidates);
    }
    if (typeof donation.candidate !== "string") {
      const popup = `${donation.candidate.firstName} ${donation.candidate.lastName}: €${donation.amount}`;
      map.addMarker(donation.lat, donation.lng, popup);
      map.moveTo(donation.lat, donation.lng);
    }
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Donations to Date">
      <LeafletMap height={30} bind:this={map} />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonateForm {candidateList} />
    </Card>
  </div>
</div>
<div class="columns">
  <div class="column">
    <Card title="Donations to Date">
      <Chart data={donationsByCandidate} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonationList {donations} />
    </Card>
  </div>
</div>
