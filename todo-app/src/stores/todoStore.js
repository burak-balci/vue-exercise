import { defineStore } from "pinia";

export const useTodoStore = defineStore("todoList", {
  state: () => ({
    id: 4,
    todoList: [
      { id: 1, text: "Learn Vue", done: false },
      { id: 2, text: "Learn Pinia", done: true },
      { id: 3, text: "Learn Nuxt", done: false },
    ],
  }),
  actions: {
    addTodo(item) {
      this.todoList.push({ id: this.id++, text: item, done: false });
    },
    toggleTodo(itemId) {
      const todo = this.todoList.find((item) => item.id === itemId);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    deleteTodo(itemId) {
      this.todoList = this.todoList.filter((item) => item.id !== itemId);
    },
  },
});
