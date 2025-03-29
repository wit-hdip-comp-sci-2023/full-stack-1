<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";

  subTitle.text = "Donations to date";
</script>

<Card title="Donations">
  <DonationList />
</Card>
