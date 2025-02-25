<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";
  import { loggedInUser, subTitle } from "$lib/runes.svelte";
  import { donationService } from "$lib/services/donation-service";
  import { onMount } from "svelte";
  import type { Donation } from "$lib/types/donation-types";

  subTitle.text = "Donation to Date";

  let donations: Donation[] = [];
  onMount(async () => {
    donations = await donationService.getDonations(loggedInUser.token);
  });
</script>

<Card title="Donations">
  <DonationList {donations} />
</Card>
