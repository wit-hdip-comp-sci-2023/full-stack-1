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

  let amount = 0;
  let selectedCandidate = "Simpson, Lisa";
  let paymentMethods = ["paypal", "direct"];
  let selectedMethod = "paypal";
  let lat = 52.160858;
  let lng = -7.15242;

  async function donate() {
    console.log(`Just donated: ${amount} to ${selectedCandidate} via ${selectedMethod} payment`);
    console.log(`lat: ${lat}, lng: ${lng}`);
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
          <option>{candidate.lastName},{candidate.firstName}</option>
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
