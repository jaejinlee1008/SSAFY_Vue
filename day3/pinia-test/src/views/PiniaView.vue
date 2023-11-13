<script setup>
import { useMyStore } from '../stores/counter';
import { storeToRefs } from 'pinia'
const store = useMyStore();
const { mileage, getMileage } = storeToRefs(store)
//반응성을 유지하면서 스토어 안의 값(state)과 getter를 사용하려면 storeToRefs()를 사용해야 함
//반응성을 유지하면서 스토어 안의 함수(action)을 사용하려면 storeToRefs()를 사용하지 않아도 됨
// const mil = store.mileage;
// const getMileage = store.getMileage
// const getMileageFunc = store.getMileageFunc
const { getMileageFunc } = store
</script>

<template>
  <div class="about">
    <h1>This is a pinia page</h1>
    mileage : {{ mileage }}
    mileage(state) : {{ store.mileage }}
    <hr>
    mileage(getter) : {{ getMileage }}
    <hr>
    mileage(action) : {{ getMileageFunc }}
    <hr>
    up mileage(action) : {{ store.upMileageFunc(3) }}
    <hr>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
