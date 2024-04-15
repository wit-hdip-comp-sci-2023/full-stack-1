<script lang="ts">
  export let donations = [
    {
      amount: 40,
      method: "paypal",
      donor: "bart@simpson.com",
      candidate: { lastName: "Simpson", firstName: "Lisa" },
      lat: "52.161290",
      lng: "-7.51540"
    },
    {
      amount: 90,
      method: "direct",
      donor: "marge@simpson.com",
      candidate: { lastName: "Simpson", firstName: "maggie" },
      lat: "52.261290",
      lng: "-7.231540"
    },
    {
      amount: 430,
      method: "paypal",
      donor: "homer@simpson.com",
      candidate: { lastName: "Flanders", firstName: "Ned" },
      lat: "52.361290",
      lng: "-7.241540"
    }
  ];
</script>

<table class="table is-fullwidth">
  <thead>
    <th>Amount</th>
    <th>Method</th>
    <th>Candidate</th>
    <th>Donor</th>
  </thead>
  <tbody>
    {#each donations as donation}
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
          {donation.donor}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
