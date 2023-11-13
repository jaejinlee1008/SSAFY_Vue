<script setup>
//import { selectOne, update, deleteCustomer } from '../api/customer'
import { useRouter, useRoute } from 'vue-router'
import { useCustomerStore } from "../stores/customerStore";
import { storeToRefs } from 'pinia';

const store = useCustomerStore()
const { oneCustomer, updateCustomer, delCustomer } = store;
const { one: c } = storeToRefs(store);
const route = useRoute(); //현재 컴포넌트가 화면에 보여질 때 사용된 route(경로)가 알아내짐
//http:~   /detail/23

const router = useRouter();

oneCustomer(route.params.num);


function customerAll() {
    router.push({ name: 'list' }) //라우터 링크 누른 효과
}

function customerUpdate() {
    updateCustomer(c.value);
    router.push({ name: 'list' })
}
function customerDelete() {
    delCustomer(c.value.num);
    router.push({ name: 'list' })
}
</script>

<template>
    <div>
        <div class="container">
            <form id="form1" class="form-horizontal">
                <slot></slot>
                <div class="form-group">
                    <label>번호:</label> <input type="text" class="form-control" id="num" v-model="c.num" disabled />
                </div>
                <div class="form-group">
                    <label>이름:</label> <input type="text" class="form-control" id="name" v-model="c.name" />
                </div>

                <div class="form-group">
                    <label>주소:</label> <input type="text" class="form-control" id="address" v-model="c.address" />
                </div>

                <div class="btn-group">
                    <input type="button" class="btn btn-primary" value="수정" id="btnUpdate" @click="customerUpdate" />
                    <input type="button" class="btn btn-primary" value="삭제" id="btnDelete" @click="customerDelete" />
                    <input type="button" class="btn btn-primary" value="전체" id="btnUpdate" @click="customerAll" />
                </div>
            </form>
        </div>
        <hr />
    </div>
</template>

<style scoped></style>