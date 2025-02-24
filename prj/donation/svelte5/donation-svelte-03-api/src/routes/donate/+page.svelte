<script lang="ts">
  import { loggedInUser, subTitle } from "$lib/runes.svelte";
  import { donationService } from "$lib/services/donation-service";
  import Card from "$lib/ui/Card.svelte";
  import { onMount } from "svelte";
  import DonateForm from "./DonateForm.svelte";
  import type { Candidate } from "$lib/types/donation-types";

  subTitle.text = "Make a Donation";
  let candidateList: Candidate[] = [];

  onMount(async () => {
    candidateList = await donationService.getCandidates(loggedInUser.token);
  });
</script>

<Card title="Please Donate">
  <DonateForm {candidateList} />
</Card>
