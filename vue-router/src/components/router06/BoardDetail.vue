<script setup>
import { useRouter, useRoute } from "vue-router";
// import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const route = useRoute();

const props = defineProps({ no: String });

let articleNo = ref(0);

onMounted(() => {
  //   articleNo.value = route.params.no;
  console.log("route.params.no :: " + route.params.no);
  articleNo.value = props.no;
});
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">{{ articleNo }}번글 제목</h4>
      <p class="card-text">글 내용이 나와요</p>
      <button
        type="button"
        @click="router.push({ name: 'board6' })"
        class="btn btn-outline-success btn-sm"
      >
        글목록
      </button>
      <button
        type="button"
        @click="router.push({ name: 'boardmodify6', params: { no: articleNo } })"
        class="btn btn-outline-dark btn-sm ms-2"
      >
        글수정
      </button>
    </div>
  </div>
</template>

<style scoped>
a:hover {
  cursor: pointer;
}
</style>
