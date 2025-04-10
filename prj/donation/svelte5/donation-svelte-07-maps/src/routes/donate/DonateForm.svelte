<script lang="ts">
  import { currentCandidates, loggedInUser } from "$lib/runes.svelte";
  import { donationService } from "$lib/services/donation-service";
  import type { Donation } from "$lib/types/donation-types";
  import Coordinates from "$lib/ui/Coordinates.svelte";

  let { donationEvent = null } = $props();

  let amount = $state(0);
  let lat = $state(52.160858);
  let lng = $state(-7.15242);
  let selectedCandidate = $state("Simpson, Lisa");
  let paymentMethods = ["paypal", "direct"];
  let selectedMethod = $state("paypal");
  let message = $state("Please Donate");

  async function donate() {
    if (selectedCandidate && amount && selectedMethod) {
      const candidate = currentCandidates.candidates.find(
        (candidate) => candidate._id === selectedCandidate
      );
      if (candidate) {
        const donation: Donation = {
          amount: amount,
          method: selectedMethod,
          candidate: selectedCandidate,
          lat: lat,
          lng: lng,
          donor: loggedInUser._id
        };
        const success = await donationService.donate(donation, loggedInUser.token);
        if (!success) {
          message = "Donation not completed - some error occurred";
          return;
        }
        if (donationEvent) donationEvent(donation);
        message = `Thanks! You donated ${amount} to ${candidate.firstName} ${candidate.lastName}`;
      }
    } else {
      message = "Please select amount, method and candidate";
    }
  }
</script>

<div>
  <div class="field">
    <label class="label" for="amount">Enter Amount:</label>
    <input bind:value={amount} class="input" id="amount" name="amount" type="number" />
  </div>
  <div class="field">
    <div class="control">
      <label class="label" for="amount">Select Payment Method:</label>
      {#each paymentMethods as method}
        <input bind:group={selectedMethod} class="radio" type="radio" value={method} /> {method}
      {/each}
    </div>
  </div>
  <div class="field">
    <label class="label" for="amount">Select Candidate:</label>
    <div class="select">
      <select bind:value={selectedCandidate}>
        {#each currentCandidates.candidates as candidate}
          <option value={candidate._id}>{candidate.lastName},{candidate.firstName}</option>
        {/each}
      </select>
    </div>
  </div>
</div>
<Coordinates bind:lat bind:lng />
<div class="field">
  <div class="control">
    <button onclick={() => donate()} class="button is-success is-fullwidth">Donate</button>
  </div>
</div>
<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>
