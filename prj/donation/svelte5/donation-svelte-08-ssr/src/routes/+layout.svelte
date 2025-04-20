<script lang="ts">
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";
  import { loggedInUser } from "$lib/runes.svelte";

  export let data: any;
  if (data.session) {
    loggedInUser.email = data.session.email;
    loggedInUser.name = data.session.name;
    loggedInUser.token = data.session.token;
    loggedInUser._id = data.session._id;
  } else {
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
  }
</script>

<div class="container">
  {#if loggedInUser.token}
    <Menu />
    <Heading />
  {/if}
  <slot />
</div>
