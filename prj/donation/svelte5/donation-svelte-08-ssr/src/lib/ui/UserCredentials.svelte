<script lang="ts">
  let { email = $bindable(""), password = $bindable("") } = $props();
</script>

<div class="field">
  <label class="label" for="email">Email</label>
  <div class="control has-icons-left">
    <input
      id="email"
      bind:value={email}
      class="input"
      type="text"
      placeholder="Email"
      name="email"
    />
    <span class="icon is-small is-left">
      <i class="fa fa-envelope"></i>
    </span>
  </div>
</div>
<div class="field">
  <label class="label" for="password">Password</label>
  <div class="control has-icons-left">
    <input
      id="password"
      bind:value={password}
      class="input"
      type="password"
      placeholder="Password"
      name="password"
    />
    <span class="icon is-small is-left">
      <i class="fa fa-key"></i>
    </span>
  </div>
</div>
