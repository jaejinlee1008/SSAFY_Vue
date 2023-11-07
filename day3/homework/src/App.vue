<script setup>
import BoardList from "./components/BoardList.vue";
import BoardModify from "./components/BoardModify.vue";
import BoardView from "./components/BoardView.vue";
import BoardWrite from "./components/BoardWrite.vue";
</script>

<template>
  <BoardList></BoardList>
  <BoardModify></BoardModify>
  <BoardView></BoardView>
  <BoardWrite></BoardWrite>
</template>

<style scoped>
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
