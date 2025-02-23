<script lang="ts">
  import { goto } from "$app/navigation";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function login() {
    const success = false;
    if (success) {
      goto("/donate");
    } else {
      message = "Error Trying to sign up";
    }
  }
</script>

<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-black has-text-centered">Login to DONATION</h3>
        <div class="box">
          {#if message}
            <Message {message} />
          {/if}
          <UserCredentials bind:email bind:password />
          <button onclick={() => login()} class="button">Log In</button>
        </div>
      </div>
    </div>
  </div>
</section>
