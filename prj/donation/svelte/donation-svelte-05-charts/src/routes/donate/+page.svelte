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

  let candidateList: Candidate[] = [];
  let donations: Donation[] = [];
  let donationsByCandidate: DataSet;
  let candidates: Candidate[] = [];

  subTitle.set("Make a Donation");

  onMount(async () => {
    candidateList = await donationService.getCandidates(get(currentSession));
    donations = await donationService.getDonations(get(currentSession));
    candidates = await donationService.getCandidates(get(currentSession));
    donationsByCandidate = generateByCandidate(donations, candidates);
  });

  latestDonation.subscribe(async (donation) => {
    if (donation) {
      donations.push(donation);
      donations = [...donations];
      donationsByCandidate = generateByCandidate(donations, candidates);
    }
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Donations to Date">
      <Chart data={donationsByCandidate} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonateForm {candidateList} />
    </Card>
  </div>
</div>
