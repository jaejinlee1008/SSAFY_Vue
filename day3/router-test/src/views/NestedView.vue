<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h2>Nested View(Parent)</h2>
  <div>
    <RouterLink to="east">Go East</RouterLink>
    <RouterLink to="west">Go West</RouterLink>
  </div>
  <div>
    <RouterView></RouterView>
  </div>
</template>
