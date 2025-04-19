<script lang="ts">
  import { TileLayer } from "sveaflet";

  type Props = {
    defautLayer?: string;
  };

  let { defautLayer = "OpenStreetMap" }: Props = $props();

  const tileLayers = [
    {
      name: "OpenStreetMap",
      url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      options: { maxZoom: 19, attribution: "© OpenStreetMap" },
      checked: false,
      layerType: "base"
    },
    {
      name: "OpenTopoMap",
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      options: { maxZoom: 19, attribution: "© OpenStreetMap" },
      checked: false,
      layerType: "base"
    },
    {
      name: "Satellite",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      options: { maxZoom: 19, attribution: "© OpenStreetMap" },
      checked: false,
      layerType: "base"
    }
  ];
  tileLayers.forEach((tile) => {
    if (tile.name === defautLayer) {
      tile.checked = true;
    }
  });
</script>

{#each tileLayers as tile}
  <TileLayer
    name={tile.name}
    url={tile.url}
    options={tile.options}
    checked={tile.checked}
    layerType={tile.layerType}
  />
{/each}
