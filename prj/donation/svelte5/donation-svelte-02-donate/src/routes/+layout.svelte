<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";
  console.log(loggedInUser.email);
</script>

<div class="container">
  {#if loggedInUser.email}
    <Menu />
    <Heading />
  {/if}
  <slot />
</div>
