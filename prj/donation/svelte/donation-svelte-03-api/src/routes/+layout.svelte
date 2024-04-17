<script lang="ts">
  import { currentSession } from "$lib/stores";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";
</script>

<div class="container">
  {#if $currentSession?.token}
    <Menu />
    <Heading />
  {/if}
  <slot />
</div>
