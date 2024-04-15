<script lang="ts">
  import { subTitle } from "$lib/stores";
  import DonateForm from "./DonateForm.svelte";
  import Card from "$lib/ui/Card.svelte";

  subTitle.set("Make a Donation");
</script>

<Card title="Please Donate">
  <DonateForm />
</Card>
