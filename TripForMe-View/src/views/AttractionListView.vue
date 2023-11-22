<script setup>

    import { ref } from "vue";
    import TopTheme from "../components/TopTheme.vue";
    import ThemeList from "../components/ThemeList.vue"

    const tab = ref(null);

</script>

<template>
    <v-main>
      <TopTheme></TopTheme>
      <ThemeList></ThemeList>
    </v-main>
  </template>

<style scoped>

</style>