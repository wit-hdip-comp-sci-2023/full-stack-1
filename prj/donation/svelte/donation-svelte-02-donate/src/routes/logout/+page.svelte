<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentSession } from "$lib/stores";

  currentSession.set("");

  goto("/");
</script>
