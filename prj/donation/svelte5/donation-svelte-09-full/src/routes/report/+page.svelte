<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";
  import { subTitle } from "$lib/runes.svelte";
  import { refreshDonationState } from "$lib/services/donation-utils";
  import type { PageData } from "./$types";

  subTitle.text = "Donation to Date";
  let { data } = $props<{ data: PageData }>();
  refreshDonationState(data.donations, data.candidates);
</script>

<Card title="Donations">
  <DonationList />
</Card>
