<script setup>
import TodoList from "../components/TodoList.vue";
</script>

<template>
  <div class="about">
    <TodoList></TodoList>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
