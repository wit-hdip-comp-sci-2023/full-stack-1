<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";
  import { currentDonations, subTitle } from "$lib/runes.svelte";

  subTitle.text = "Donation to Date";
  export let data: any;
  currentDonations.donations = data.donations;
</script>

<Card title="Donations">
  <DonationList />
</Card>
