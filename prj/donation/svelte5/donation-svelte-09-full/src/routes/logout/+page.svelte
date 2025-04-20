<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { clearDonationState } from "$lib/services/donation-utils";

  clearDonationState();
  if (browser) goto("/");
</script>
