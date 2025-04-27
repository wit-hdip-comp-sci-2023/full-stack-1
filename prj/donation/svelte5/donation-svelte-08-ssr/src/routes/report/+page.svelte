<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";
  import { subTitle } from "$lib/runes.svelte";
  import { refreshDonationState } from "$lib/services/donation-utils";
  import type { PageProps } from "./$types";

  subTitle.text = "Donation to Date";
  let { data }: PageProps = $props();
  refreshDonationState(data.donations, data.candidates);
</script>

<Card title="Donations">
  <DonationList />
</Card>
