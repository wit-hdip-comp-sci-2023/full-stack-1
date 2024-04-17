<script lang="ts">
  import { donationService } from "$lib/services/donation-service";
  import type { Donation } from "$lib/types/donation-types";
  import { currentSession, subTitle } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  subTitle.set("Donations to Date");
  let donations: Donation[] = [];
  onMount(async () => {
    donations = await donationService.getDonations(get(currentSession));
  });
</script>

<Card title="Donations">
  <DonationList {donations} />
</Card>
