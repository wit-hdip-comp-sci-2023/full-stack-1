<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/stores";
  export let data: any;

  subTitle.set("Donations Data");
</script>

<div class="columns">
  <div class="column">
    <Card title="Donations By Method">
      <Chart data={data.byMethod} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Donations By Candidate">
      <Chart data={data.byCandidate} type="pie" />
    </Card>
  </div>
</div>
