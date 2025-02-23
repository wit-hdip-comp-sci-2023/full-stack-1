<script lang="ts">
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";

  loggedInUser.email = "";
  goto("/");
</script>
