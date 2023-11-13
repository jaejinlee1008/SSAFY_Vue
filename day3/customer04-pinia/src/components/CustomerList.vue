<script setup>
//서버로 비동기 요청을 해서 데이터를 받아온 후에 화면에 뿌려줌
import { onMounted, ref } from 'vue';
import CustomerListItem from './CustomerListItem.vue';
import { useCustomerStore } from "../stores/customerStore";
import { storeToRefs } from 'pinia'

const store = useCustomerStore();
const { allCustomer } = store
const { all: customers, one } = storeToRefs(store);

allCustomer();

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