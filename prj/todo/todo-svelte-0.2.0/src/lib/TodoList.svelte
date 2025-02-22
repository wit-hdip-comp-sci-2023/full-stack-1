<script>
  let { todoItems = [], deleteTodo = null } = $props();
</script>

<div class="section box">
  <div class="title is-6">Things yet do</div>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Task</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {#each todoItems as todo}
        <tr>
          <td>{todo.text}</td>
          <td>{todo.date}</td>
          {#if deleteTodo}
            <td><button onclick={() => deleteTodo(todo.id)} class="button">delete</button></td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
