<script lang="ts">
  import Coordinates from "$lib/ui/Coordinates.svelte";

  const candidateList = [
    {
      firstName: "Lisa",
      lastName: "Simpson",
      office: "President"
    },
    {
      firstName: "Maggie",
      lastName: "Simpson",
      office: "President"
    },
    {
      firstName: "Ned",
      lastName: "Flanders",
      office: "President"
    }
  ];

  let amount = $state(0);
  let lat = $state(52.160858);
  let lng = $state(-7.15242);
  let selectedCandidate = $state("Simpson, Lisa");
  let paymentMethods = ["paypal", "direct"];
  let selectedMethod = $state("paypal");

  async function donate() {
    console.log(`Just donated: ${amount} to ${selectedCandidate} via ${selectedMethod} payment`);
    console.log(`lat: ${lat}, lng: ${lng}`);
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
        {#each candidateList as candidate}
          <option>{candidate.lastName},{candidate.firstName}</option>
        {/each}
      </select>
    </div>
  </div>
  <div class="field">
    <div class="control">
      <button onclick={() => donate()} class="button">Donate</button>
    </div>
  </div>
</div>
<Coordinates bind:lat bind:lng />
