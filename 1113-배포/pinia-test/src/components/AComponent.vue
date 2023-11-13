<script setup>
import { useCounterStore } from "../stores/counter";

const store = useCounterStore();
</script>

<template>
    <div>
        <h1>AComponent 입니다.</h1>
        <div>AComponent Count : {{ store.count }}</div>
        <button @click="store.increment">AComponent에서 증가</button>
    </div>
</template>

<style scoped></style>
