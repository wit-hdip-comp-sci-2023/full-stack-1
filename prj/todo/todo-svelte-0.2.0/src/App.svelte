<script>
  import Title from "./Title.svelte"
  import AddTodoForm from "./AddTodoForm.svelte";
  import TodoList from "./TodoList.svelte";
  import { v4 as uuidv4 } from 'uuid';

  let todoText = "";
  let todoItems = [];
  let doneItems = [];

  function addTodo(todoText) {
    const todo = {
      text: todoText,
      date: new Date().toLocaleString("en-IE"),
      id: uuidv4()
    };
    todoItems.push(todo);
    todoItems = [...todoItems];
    todoText = "";
  }

  function deleteTodo(id) {
    const found = todoItems.findIndex((todo) => todo.id == id);
    const done = todoItems[found];
    todoItems.splice(found, 1);
    todoItems = [...todoItems];
    doneItems.push(done);
    doneItems = [...doneItems];
  }
</script>

<div class="container">
  <Title title="Simple Todo List" subTitle="Fun Things to do"/>
  <div class="section box">
    <AddTodoForm addTodo="{addTodo}" />
  </div>
  <TodoList caption="Items Todo" items="{todoItems}" deleteHandler="{deleteTodo}"/>
  <TodoList caption="Items Done" items="{doneItems}"/>
</div>
