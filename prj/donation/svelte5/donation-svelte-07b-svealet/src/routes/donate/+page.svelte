<script lang="ts">
  import { curentDataSets, loggedInUser, subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import DonateForm from "./DonateForm.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import DonationList from "$lib/ui/DonationList.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import type { Donation } from "$lib/types/donation-types";
  import { donationService } from "$lib/services/donation-service";
    import { refreshDonationMap } from "$lib/services/donation-utils";

  subTitle.text = "Make a Donation";

  let map: LeafletMap;

  function donationMade(donation:Donation) {
    map.addMarker(donation.lat, donation.lng, "");
    map.moveTo(donation.lat, donation.lng);
  }

  onMount(async () => {
    await refreshDonationMap(map);
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Donations to Date">
      <LeafletMap height={50} bind:this={map} />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonateForm donationEvent={donationMade}/>
    </Card>
  </div>
</div>
<div class="columns">
  <div class="column">
    <Card title="Donations to Date">
      <Chart data={curentDataSets.donationsByCandidate} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonationList />
    </Card>
  </div>
</div>
