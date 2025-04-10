<script lang="ts">
  import { curentDataSets, subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import DonateForm from "./DonateForm.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import DonationList from "$lib/ui/DonationList.svelte";

  subTitle.text = "Make a Donation";
</script>

<div class="columns">
  <div class="column">
    <Card title="Donations to Date">
      <Chart data={curentDataSets.donationsByCandidate} type="bar" />
      <DonationList />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonateForm />
    </Card>
  </div>
</div>
