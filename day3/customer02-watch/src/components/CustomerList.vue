<script setup>
import { ref, watch } from "vue";
import CustomerInput from "./CustomerInput.vue";
//v-model과 연결한 반응형 변수 선언
const num = ref("");
const name = ref("");
const address = ref("");
const one = ref({});
const customers = ref([
    { num: 1, name: "tommy", address: "la" },
    { num: 2, name: "harry", address: "seoul" },
    { num: 3, name: "jane", address: "seoul" },
]);
const customers2 = ref([]);
customers2.value = customers.value;

//1.초기화면에 보여줄 데이터 준비
function customerAll() {
    customers.value = customers2.value;
}

//2.add
function customerInsert(newCustomer) {

    customers.value.push(newCustomer); //화면 업뎃

    //다시 저장
    //localStorage.setItem("customerlist", JSON.stringify(customers.value)); //localstorage
    //alert("등록되었습니다");
}

function customerSelectOne(key) {
    let sel = customers.value.find((item) => {
        return item.num == key;
    });
    one.value = {
        num: sel.num,
        name: sel.name,
        address: sel.address
    }
    console.log(one.value);
}

//delete ok
function customerDelete(number) {
    const key = number; //삭제할 번호

    if (customers.value) {
        customers.value = customers.value.filter((c) => {
            return c.num != key;
        });
    } else {
        customers.value = [];
    }

    //다시 저장
    //localStorage.setItem("customerlist", JSON.stringify(customers.value)); //localstorage
    //alert("삭제가 완료되었습니다.");
}


function customerUpdate(newCustomer) {
    let key = newCustomer.num; //수정할 번호
    let kaddress = newCustomer.address; //수정할 주소

    if (customers.value) {
        customers.value.find((c) => {
            if (c.num == key) {
                c.address = kaddress;
                return;
            }
        });
    }
    console.log(customers.value);
    //localStorage.setItem("customerlist", JSON.stringify(customers.value)); //localstorage
}

function customerSearch(newaddress) {
    let param = newaddress;
    customers2.value = customers.value;//검색 전의 전체데이터를 복사
    console.log(customers2.value);
    if (customers.value) {
        customers.value = customers.value.filter((c) => {
            return c.address == param;
        });
    }
}
watch(() => customers.value,
    updateTemplate,
    { deep: true }
)
function updateTemplate(result) {
    localStorage.setItem("customerlist", JSON.stringify(result));
}
</script>

<template>
    <div>
        <CustomerInput :c="one" @customerInsert="customerInsert" @customerDelete="customerDelete"
            @customerUpdate="customerUpdate" @customerSearch="customerSearch" @customerAll="customerAll">
            <template #title>
                <h4>Vue Customer Management-1</h4>
            </template>
        </CustomerInput>
        <div class="container">
            <slot></slot>
            <table class="table text-center">
                <thead>
                    <tr>
                        <th class="text-center">번호</th>
                        <th class="text-center">이름</th>
                        <th class="text-center">주소</th>
                    </tr>
                </thead>
                <tbody id="tb">
                    <tr v-for="customer in customers" :key="customer.num" @click="customerSelectOne(customer.num)">
                        <td>{{ customer.num }}</td>
                        <td>{{ customer.name }}</td>
                        <td v-text="customer.address"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
h4 {
    color: red;
}
</style>
