<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentSession } from "$lib/stores";

  currentSession.set({ name: "", _id: "", token: "" });
  localStorage.removeItem("donation");
  goto("/");
</script>
