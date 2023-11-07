<script setup>
import CustomerTop from './components/CustomerTop.vue'
import CustomerList from './components/CustomerList.vue'
</script>

<template>
  <header>
    <CustomerTop></CustomerTop>
    <CustomerList>
      <h4>Customer List</h4>
    </CustomerList>
  </header>
</template>

<style scoped>
h4 {
  color: red;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
