<script>
import { useTaskStore } from "./stores/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import { storeToRefs } from "pinia";

export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore();

    const { tasks, loading, favs, totalCount, favCount } =
      storeToRefs(taskStore);

    taskStore.getTasks();

    const filter = ref("all");

    return { taskStore, filter, tasks, loading, favs, totalCount, favCount };
  },
};
</script>

<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </nav>

    <div class="loading" v-if="loading">Loading Tasks...</div>

    <div class="task-list" v-if="filter === 'all'">
      <p>Your have {{ totalCount }} tasks left to do</p>
      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>Your have {{ favCount }} favs left to do</p>
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">Reset state</button>
  </main>
</template>
