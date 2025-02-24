<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import DonateForm from "./DonateForm.svelte";

  subTitle.text = "Make a Donation";
</script>

<Card title="Please Donate">
  <DonateForm />
</Card>
