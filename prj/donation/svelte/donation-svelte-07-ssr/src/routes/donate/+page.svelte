<script lang="ts">
  import { subTitle } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";
  import DonateForm from "./DonateForm.svelte";

  export let data: any;

  subTitle.set("Donations to Date");
</script>

<div class="columns">
  <div class="column">
    <Card title="Donations">
      <DonationList donations={data.donations} />
    </Card>
  </div>
  <div class="column">
    <Card title="Donations">
      <DonateForm candidateList={data.candidates} />
    </Card>
  </div>
</div>
