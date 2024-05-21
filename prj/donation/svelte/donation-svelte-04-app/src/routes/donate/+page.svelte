<script lang="ts">
  import { currentSession, latestDonation, subTitle } from "$lib/stores";
  import DonateForm from "./DonateForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { donationService } from "$lib/services/donation-service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { Candidate, Donation } from "$lib/types/donation-types";
  import DonationList from "$lib/ui/DonationList.svelte";

  let candidateList: Candidate[] = [];
  let donations: Donation[] = [];
  subTitle.set("Make a Donation");

  onMount(async () => {
    candidateList = await donationService.getCandidates(get(currentSession));
    donations = await donationService.getDonations(get(currentSession));
  });

  latestDonation.subscribe(async (donation) => {
    if (donation) {
      donations.push(donation);
      donations = [...donations];
    }
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Donations to Date">
      <DonationList {donations} />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonateForm {candidateList} />
    </Card>
  </div>
</div>
