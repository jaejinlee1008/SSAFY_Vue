<script setup>
//서버로 비동기 요청을 해서 데이터를 받아온 후에 화면에 뿌려줌
import { selectAll } from "../api/customer.js";
import { onMounted, ref } from 'vue';
import CustomerListItem from './CustomerListItem.vue';
const customers = ref([])//결과 받을 배열

onMounted(() => {
    getAll()
})

function getAll() {
    customers.value = selectAll(
        ({ data }) => {
            console.log(data);
            customers.value = data
        },
        (error) => {
            console.log(error);
        }
    );
}

</script>

<template>
    <div class="container">
        <slot></slot>
        <table class="table text-center">
            <thead>
                <tr>
                    <th class="text-center">번호</th>
                    <th class="text-center">이름</th>
                </tr>
            </thead>
            <tbody id="tb">
                <CustomerListItem v-for="c in customers" :key="c.num" :customer="c"></CustomerListItem>
            </tbody>
        </table>
    </div>
</template>

<style scoped></style>