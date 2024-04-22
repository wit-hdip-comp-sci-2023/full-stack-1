<script lang="ts">
  import { donationService } from "$lib/services/donation-service";
  import type { Candidate, Donation } from "$lib/types/donation-types";
  import { currentSession, latestDonation } from "$lib/stores";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import { get } from "svelte/store";

  export let candidateList: Candidate[] = [];

  let amount = 0;
  let lat = 52.160858;
  let lng = -7.15242;
  let selectedCandidate = "";
  let paymentMethods = ["paypal", "direct"];
  let selectedMethod = "";
  let message = "Please donate";

  async function donate() {
    if (selectedCandidate && amount && selectedMethod) {
      const candidate = candidateList.find((candidate) => candidate._id === selectedCandidate);
      if (candidate) {
        const donation: Donation = {
          amount: amount,
          method: selectedMethod,
          candidate: selectedCandidate,
          lat: lat,
          lng: lng,
          donor: $currentSession._id
        };
        const success = await donationService.donate(donation, get(currentSession));
        if (!success) {
          message = "Donation not completed - some error occurred";
          return;
        }
        donation.candidate = candidate;
        donation.donor = $currentSession.name;
        latestDonation.set(donation);
        message = `Thanks! You donated ${amount} to ${candidate.firstName} ${candidate.lastName}`;
      }
    } else {
      message = "Please select amount, method and candidate";
    }
  }
</script>

<form on:submit|preventDefault={donate}>
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
        {#each candidateList as candidate}
          <option value={candidate._id}>{candidate.lastName},{candidate.firstName}</option>
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
