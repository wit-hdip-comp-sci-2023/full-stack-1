<script lang="ts">
  import { latestDonations } from "$lib/runes.svelte";

  // let { donations } = $props();
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Amount</th>
      <th>Method</th>
      <th>Candidate</th>
      <th>Donor</th>
    </tr>
  </thead>
  <tbody>
    {#each latestDonations.donations as donation}
      <tr>
        <td>
          {donation.amount}
        </td>
        <td>
          {donation.method}
        </td><td>
          {donation.candidate.lastName}, {donation.candidate.firstName}
        </td>
        <td>
          {donation.donor.lastName}, {donation.donor.firstName}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
