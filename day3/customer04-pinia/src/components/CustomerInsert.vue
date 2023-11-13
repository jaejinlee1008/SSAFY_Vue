<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCustomerStore } from "../stores/customerStore";
//import { storeToRefs } from 'pinia';

const store = useCustomerStore();

const { insertCustomer } = store;

const router = useRouter();
const num = ref('');
const name = ref('');
const address = ref('');

function customerInsert() {
    //store의 함수 호출해서 insert
    insertCustomer({ num: num.value, name: name.value, address: address.value });
    init();
    router.push({ name: 'list' })
}
function customerAll() {
    router.push({ name: 'list' })
}
function init() {
    num.value = ''
    name.value = ''
    address.value = ''
}

</script>

<template>
    <div>
        <div class="container">
            <form id="form1" class="form-horizontal">
                <slot name="title"></slot>
                <div class="form-group">
                    <label>번호:</label> <input type="text" class="form-control" id="num" v-model="num" />
                </div>
                <div class="form-group">
                    <label>이름:</label> <input type="text" class="form-control" id="name" v-model="name" />
                </div>

                <div class="form-group">
                    <label>주소:</label> <input type="text" class="form-control" id="address" v-model="address" />
                </div>

                <div class="btn-group">
                    <input type="button" class="btn btn-primary" value="등록" id="btnInsert" @click="customerInsert" />
                    <input type="button" class="btn btn-primary" value="전체" id="btnUpdate" @click="customerAll" />
                    <input type="button" class="btn btn-primary" value="초기화" id="btnInit" @click="init" />
                </div>
            </form>
        </div>
        <hr />
    </div>
</template>

<style scoped></style>