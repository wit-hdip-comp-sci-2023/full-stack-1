<script lang="ts">
  export let email = "";
  export let password = "";
</script>

<div class="field">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">Email</label>
  <div class="control has-icons-left">
    <input bind:value={email} class="input" type="text" placeholder="Email" name="email" />
    <span class="icon is-small is-left">
      <i class="fa fa-envelope"></i>
    </span>
  </div>
</div>
<div class="field">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">Password</label>
  <div class="control has-icons-left">
    <input bind:value={password} class="input" type="password" placeholder="Password" name="password" />
    <span class="icon is-small is-left">
      <i class="fa fa-key"></i>
    </span>
  </div>
</div>
