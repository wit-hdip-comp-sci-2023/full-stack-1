<script lang="ts">
  import { currentDonations, subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { ControlLayers, Map, Marker } from "sveaflet";
  import MapLayers from "./MapLayers.svelte";

  subTitle.text = "Donations Geo Data";
</script>

<Card title="Donations Locations">
  <div class="box" style="height: 60vh">
    <Map
      options={{
        center: [
          currentDonations?.lastDonation?.lat || 53.2734,
          currentDonations?.lastDonation?.lng || -7.7783203
        ],
        zoom: 7
      }}
    >
      <ControlLayers>
        <MapLayers />
        {#each currentDonations.donations as donation}
          <Marker latLng={[donation.lat, donation.lng]} />
        {/each}
      </ControlLayers>
    </Map>
  </div>
</Card>
