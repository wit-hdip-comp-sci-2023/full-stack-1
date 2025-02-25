<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";
  import { latestDonations, loggedInUser, subTitle } from "$lib/runes.svelte";
  import { donationService } from "$lib/services/donation-service";
  import { onMount } from "svelte";

  subTitle.text = "Donation to Date";

  onMount(async () => {
    latestDonations.donations = await donationService.getDonations(loggedInUser.token);
  });
</script>

<Card title="Donations">
  <DonationList />
</Card>
