<script setup>
import ChildrenPage from "./ChildrenPage.vue";
import { ref } from 'vue';
const children = ref([
    { name: '김하나', age: 30 },
    { name: '김두리', age: 20 },
    { name: '김서이', age: 10 }
])
</script>

<template>
    <div style="border: 1px solid; padding: 10px;">
        <h1>부모페이지입니다.</h1>
        <br>
        <ChildrenPage :c="children"></ChildrenPage>
    </div>
</template>

<style scoped></style>