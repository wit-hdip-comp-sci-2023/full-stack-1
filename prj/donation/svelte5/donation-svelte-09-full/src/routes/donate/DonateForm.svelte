<script lang="ts">
  import { enhance } from "$app/forms";
  import Coordinates from "$lib/ui/Coordinates.svelte";

  let { candidateList = [], enhanceFn, message = $bindable("") } = $props();

  let lat = 52.160858;
  let lng = -7.15242;
  let paymentMethods = ["paypal", "direct"];
</script>

<form method="POST" action="?/donate" use:enhance={enhanceFn}>
  <div class="field">
    <label class="label" for="amount">Enter Amount:</label>
    <input class="input" id="amount" name="amount" type="number" />
  </div>
  <div class="field">
    <div class="control">
      <label class="label" for="amount">Select Payment Method:</label>
      {#each paymentMethods as method}
        <input class="radio" type="radio" value={method} name="method" /> {method}
      {/each}
    </div>
  </div>
  <div class="field">
    <label class="label" for="amount">Select Candidate:</label>
    <div class="select">
      <select name="candidate">
        {#each candidateList as candidate}
          <option value={candidate._id}>{candidate.lastName},{candidate.firstName} </option>
        {/each}
      </select>
    </div>
  </div>
  <Coordinates bind:lat bind:lng />
  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth">Donate</button>
    </div>
  </div>
</form>
<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>
