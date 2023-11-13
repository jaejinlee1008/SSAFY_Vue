<script setup>
import { useCounterStore } from "./stores/counter";

import AComponent from "./components/AComponent.vue";
import BComponent from "./components/BComponent.vue";

const store = useCounterStore();
console.log(store.count);
</script>

<template>
  <div>
    <div>App count : {{ store.count }}</div>
    <div>App doublecount : {{ store.doubleCount }}</div>
    <button @click="store.increment">App에서 증가</button>
    <AComponent></AComponent>
    <BComponent></BComponent>
  </div>
</template>

<style scoped></style>