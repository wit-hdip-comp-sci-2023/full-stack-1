<script lang="ts">
  import { curentDataSets } from "$lib/runes.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Card from "$lib/ui/Card.svelte";
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
