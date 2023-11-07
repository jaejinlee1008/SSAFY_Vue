<script setup>
const props = defineProps(['c'])
</script>

<template>
    <div style="border: 1px solid; padding: 10px;">
        <div v-for="children in props.c" :key="children.name" style="border: 1px solid; padding:10px">
            <h3>자식 페이지입니다.</h3><br>
            <div>이름 : {{ children.name }}</div><br>
            <div>나이 : {{ children.age }}</div><br>
        </div>
    </div>
</template>

<style scoped></style>