<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
  <div class="wrapper">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/list">Customer List</RouterLink>
      <RouterLink to="/insert">Customer Insert</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
nav>* {
  margin-right: 5px;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
