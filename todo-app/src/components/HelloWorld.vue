<script>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useTodoStore } from "../stores/todoStore";

export default {
  setup() {
    const todo = ref("");
    const store = useTodoStore();
    const { todoList } = storeToRefs(store);
    const { toggleTodo, deleteTodo } = store;

    function newTodo(item) {
      if (!item) {
        return;
      }
      store.addTodo(item);
      todo.value = "";
    }

    return { todo, todoList, newTodo, toggleTodo, deleteTodo };
  },
};
</script>

<template>
  <h1>Hello Vue & Pinia</h1>
  <form @submit.prevent="newTodo(todo)">
    <input type="text" v-model="todo" />
    <button>Add Todo</button>
  </form>
  <ul v-for="todo in todoList" :key="todo.id">
    <li>
      <input type="checkbox" v-model="todo.done" @click="toggleTodo(todo.id)" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="deleteTodo(todo.id)">X</button>
    </li>
  </ul>
</template>

<style>
.done {
  text-decoration: line-through;
  color: red;
}
</style>
