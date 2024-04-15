<script lang="ts">
  export let firstName = "";
  export let lastName = "";
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="label">Name</label>
<div class="field is-horizontal">
  <div class="field-body">
    <div class="field">
      <div class="control has-icons-left">
        <input bind:value={firstName} class="input" type="text" placeholder="First Name" name="firstName" />
        <span class="icon is-small is-left">
          <i class="fa fa-id-card"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <div class="control has-icons-left">
        <input bind:value={lastName} class="input" type="text" placeholder="Last Name" name="lastName" />
        <span class="icon is-small is-left">
          <i class="fa fa-id-card"></i>
        </span>
      </div>
    </div>
  </div>
</div>
