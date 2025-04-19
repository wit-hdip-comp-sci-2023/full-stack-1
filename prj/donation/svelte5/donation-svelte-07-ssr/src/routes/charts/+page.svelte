<script lang="ts">
  import { curentDataSets, currentCandidates, currentDonations } from "$lib/runes.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Card from "$lib/ui/Card.svelte";
  import { computeByCandidate, computeByMethod } from "$lib/services/donation-utils";

  export let data: any;
  currentDonations.donations = data.donations;
  currentCandidates.candidates = data.candidates;
  computeByMethod(currentDonations.donations);
  computeByCandidate(currentDonations.donations, currentCandidates.candidates);
</script>

<div class="columns">
  <div class="column">
    <Card title="Donations By Method">
      <Chart data={curentDataSets.donationsByMethod} type="bar" />
    </Card>
  </div>
  <div class="column has-text-centered">
    <Card title="Donations By Method">
      <Chart data={curentDataSets.donationsByCandidate} type="pie" />
    </Card>
  </div>
</div>
