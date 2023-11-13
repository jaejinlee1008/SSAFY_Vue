import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMyStore = defineStore('mystore', () => {

  //1.state(data)
  const mileage = ref(100)

  //2.getters(computed 형식)
  const getMileage = computed(() => { return mileage.value })

  //3.actions(function)
  function getMileageFunc() {
    return mileage.value
  }

  function upMileageFunc(m) {
    return mileage.value + parseInt(m)
  }

  return {
    mileage, getMileage, getMileageFunc, upMileageFunc
  }
})
//export default useMyStore;





// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })
