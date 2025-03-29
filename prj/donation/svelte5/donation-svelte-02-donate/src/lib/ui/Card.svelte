<script lang="ts">
  let {title = "", children} = $props();
</script>

<div class="card mb-5">
  <header class="card-header">
    <p class="card-header-title">
      <span class="icon"><i class="fas fa-coins"></i></span><span>{title}</span>
    </p>
  </header>
  <div class="card-content">
    <div class="content">
      {@render children()}
    </div>
  </div>
</div>
