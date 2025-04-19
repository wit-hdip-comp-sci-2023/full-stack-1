<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { donationService } from "$lib/services/donation-service";

  donationService.clearSession();
  if (browser) goto("/");
</script>
