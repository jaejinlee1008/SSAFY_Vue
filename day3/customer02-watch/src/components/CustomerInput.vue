<script setup>
import { ref, reactive, watchEffect } from "vue";

const num = ref("");
const name = ref("");
const address = ref("");

//부모에게서 받아올 값 정의
const props = defineProps(['c'])

watchEffect(() => { //오른쪽 값이 변경되면 왼쪽 값에 넣어준다
    num.value = props.c.num
    name.value = props.c.name
    address.value = props.c.address
    console.log("watch");
})


// 부모에게 이벤트 발생을 알리는 자식의 이벤트 이름들
const emit = defineEmits([
    'customerInsert',
    'customerDelete',
    'customerUpdate',
    'customerSearch',
    'customerAll'
])

function customerInsert() {
    emit('customerInsert', {
        num: num.value,
        name: name.value,
        address: address.value
    })//이벤트를 발생시킴
    init();
}

function customerDelete() {
    emit('customerDelete', num.value)//이벤트를 발생시킴
    init();
}

function customerUpdate() {
    emit('customerUpdate', {
        num: num.value,
        address: address.value
    })//이벤트를 발생시킴
    init();
}

function customerSearch() {
    emit('customerSearch', address.value)//이벤트를 발생시킴
    init();
}

function customerAll() {
    emit('customerAll')//이벤트를 발생시킴
    init();
}

function init() {
    num.value = "";
    name.value = "";
    address.value = "";
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
                    <input type="button" class="btn btn-primary" value="수정" id="btnUpdate" @click="customerUpdate" />
                    <input type="button" class="btn btn-primary" value="삭제" id="btnDelete" @click="customerDelete" />
                    <input type="button" class="btn btn-primary" value="검색" id="btnUpdate" @click="customerSearch" />
                    <input type="button" class="btn btn-primary" value="전체" id="btnUpdate" @click="customerAll" />
                    <input type="button" class="btn btn-primary" value="초기화" id="btnInit" @click="init" />
                </div>
            </form>
        </div>
        <hr />
    </div>
</template>

<style scoped></style>