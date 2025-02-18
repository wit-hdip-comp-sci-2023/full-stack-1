<script>
  let todoText = "";
  let todoItems = $state([]);

  function addTodo() {
    console.log(todoText);
    todoItems.push(todoText);
  }
</script>

<div class="container">
  <div class="box has-text-centered">
    <div class="title">Simple Todo List</div>
    <div class="subtitle">Fun things to do</div>
  </div>
</div>

<div class="section box">
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label for="todo" class="label">What should I do?</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            bind:value={todoText}
            id="todo"
            class="input"
            type="text"
            placeholder="Type something..."
          />
        </p>
      </div>
      <button onclick={addTodo} class="button">Add Todo</button>
    </div>
  </div>
</div>

<div class="section box">
  <div class="title is-6">Things yet do</div>
  <table class="table is-fullwidth">
    {#each todoItems as todo}
      <tr>
        <td> {todo} </td>
      </tr>
    {/each}
  </table>
</div>
