<script lang="ts">
  import { goto } from "$app/navigation";
  import { donationService } from "$lib/services/donation-service";
  import { currentSession } from "$lib/stores";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = "";
  let password = "";
  let message = "";

  async function login() {
    console.log(`attempting to log in email: ${email} with password: ${password}`);
    let session = await donationService.login(email, password);
    if (session) {
      currentSession.set(session);
      goto("/donate");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }
</script>

{#if message}
  <Message {message} />
{/if}
<form on:submit|preventDefault={login}>
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth">Log In</button>
</form>
