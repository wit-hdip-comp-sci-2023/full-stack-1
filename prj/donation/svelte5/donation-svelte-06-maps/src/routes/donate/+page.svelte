<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import Chart from "svelte-frappe-charts";
  import DonateForm from "./DonateForm.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";

  subTitle.text = "Make a Donation";
</script>

<div class="columns">
  <div class="column">
    <Card title="Donations to Date">
      <LeafletMap height={30} />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonateForm />
    </Card>
  </div>
</div>
<div class="columns">
  <div class="column">
    <Card title="Donations to Date">
      <Chart data={donationsByCandidate} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonationList {donations} />
    </Card>
  </div>
</div>
