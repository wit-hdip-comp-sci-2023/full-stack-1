<script lang="ts">
  import { goto } from "$app/navigation";
  import { donationService } from "$lib/services/donation-service";

  donationService.clearSession();
  goto("/");
</script>
