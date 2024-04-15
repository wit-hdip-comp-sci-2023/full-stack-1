<script lang="ts">
  import { subTitle } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";

  subTitle.set("Donations to Date");
</script>

<Card title="Donations">
  <DonationList />
</Card>
