<script lang="ts">
  let { lat = $bindable(0.0), lng = $bindable(0.0) } = $props();
</script>

<div class="box field is-horizontal">
  <div class="field-label is-normal">
    <label for="lat" class="label">Lat</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control is-expanded">
        <input id="lat" class="input" name="lat" type="float" bind:value={lat} />
      </p>
    </div>
    <div class="field-label is-normal">
      <label for="lng" class="label">Lng</label>
    </div>
    <div class="field">
      <p class="control is-expanded">
        <input id="lng" class="input" name="lng" type="float" bind:value={lng} />
      </p>
    </div>
  </div>
</div>
