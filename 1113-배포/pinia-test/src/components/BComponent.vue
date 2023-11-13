<script setup>
import BChildComponent from "./BChildComponent.vue";
import { useCounterStore } from "../stores/counter";

const store = useCounterStore();
</script>

<template>
    <div>
        <h1>BComponent 입니다.</h1>
        <div>BComponent Count : {{ store.count }}</div>
        <BChildComponent @click="store.increment"></BChildComponent>
    </div>
</template>

<style scoped></style>
