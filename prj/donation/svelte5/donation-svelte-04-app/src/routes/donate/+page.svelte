<script lang="ts">
  import { loggedInUser, subTitle } from "$lib/runes.svelte";
  import { donationService } from "$lib/services/donation-service";
  import Card from "$lib/ui/Card.svelte";
  import { onMount } from "svelte";
  import DonateForm from "./DonateForm.svelte";
  import type { Candidate, Donation } from "$lib/types/donation-types";
  import DonationList from "$lib/ui/DonationList.svelte";

  subTitle.text = "Make a Donation";
  let candidateList: Candidate[] = [];
  let donations: Donation[] = [];

  onMount(async () => {
    candidateList = await donationService.getCandidates(loggedInUser.token);
    donations = await donationService.getDonations(loggedInUser.token);
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
