<script>
  export let caption;
  export let items = [];
  export let deleteHandler = null;
</script>

<div class="section box">
  <div class="title is-6">{caption}</div>
  <table class="table is-fullwidth">
    <thead>
      <th>Task</th>
      <th>Date</th>
      <th></th>
    </thead>
    <tbody>
      {#each items as todo}
        <tr>
          <td> {todo.text} </td>
          <td> {todo.date}</td>
          {#if deleteHandler}
            <button on:click={deleteHandler(todo.id)} class="button">Delete</button>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
