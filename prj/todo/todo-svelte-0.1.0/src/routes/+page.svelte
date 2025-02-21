<script>
  import { v4 as uuidv4 } from "uuid";
  let todoText = $state("");
  let todoItems = $state([]);
  let doneItems = $state([]);

  function addTodo() {
    const todo = {
      text: todoText,
      date: new Date().toLocaleString("en-IE"),
      id: uuidv4()
    };
    todoItems.push(todo);
    todoText = "";
  }

  function deleteTodo(id) {
    doneItems.push(todoItems.find((todo) => todo.id === id));
    todoItems = todoItems.filter((todo) => todo.id !== id);
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
          <td><button onclick={() => deleteTodo(todo.id)} class="button">delete</button></td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<div class="section box">
  <div class="title is-6">Things done</div>
  <table id="done-table" class="table is-fullwidth">
    <thead>
      <tr>
        <th>Task</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {#each doneItems as todo}
        <tr>
          <td> {todo.text} </td>
          <td> {todo.date}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
