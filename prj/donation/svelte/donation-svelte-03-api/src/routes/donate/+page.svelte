<script lang="ts">
  import { currentSession, subTitle } from "$lib/stores";
  import DonateForm from "./DonateForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { donationService } from "$lib/services/donation-service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { Candidate } from "$lib/types/donation-types";

  let candidateList: Candidate[] = [];
  subTitle.set("Make a Donation");

  onMount(async () => {
    candidateList = await donationService.getCandidates(get(currentSession));
  });
</script>

<Card title="Please Donate">
  <DonateForm {candidateList} />
</Card>
