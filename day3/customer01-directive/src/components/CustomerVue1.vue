<script setup>
import { ref, reactive } from "vue";
//v-model과 연결한 반응형 변수 선언
const num = ref("");
const name = ref("");
const address = ref("");
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
function customerInsert() {
	//사용자 입력 값을 체크하기
	const new_customer = {
		num: num.value,
		name: name.value,
		address: address.value,
	};
	customers.value.push(new_customer); //화면 업뎃

	//다시 저장
	localStorage.setItem("customerlist", JSON.stringify(customers.value)); //localstorage
	//alert("등록되었습니다");
	init();
}

function customerSelectOne(key) {
	let c = customers.value.find((item) => {
		return item.num == key;
	});

	num.value = c.num;
	name.value = c.name;
	address.value = c.address;
}

//delete ok
function customerDelete() {
	const key = num.value; //삭제할 번호

	if (customers.value) {
		customers.value = customers.value.filter((c) => {
			return c.num != key;
		});
	} else {
		customers.value = [];
	}

	//다시 저장
	localStorage.setItem("customerlist", JSON.stringify(customers.value)); //localstorage
	//alert("삭제가 완료되었습니다.");
	init();
}
function init() {
	num.value = "";
	name.value = "";
	address.value = "";
}

function customerUpdate() {
	let key = num.value; //수정할 번호
	let kaddress = address.value; //수정할 주소

	if (customers.value) {
		customers.value.find((c) => {
			if (c.num == key) {
				c.address = kaddress;
				return;
			}
		});
	}
	console.log(customers.value);
	init();
	localStorage.setItem("customerlist", JSON.stringify(customers.value)); //localstorage
}

function customerSearch() {
	let param = address.value;
	customers2.value = customers.value;//검색 전의 전체데이터를 복사
	console.log(customers2.value);
	if (customers.value) {
		customers.value = customers.value.filter((c) => {
			return c.address == param;
		});
	}
	init();
}
</script>

<template>
	<div>
		<div class="container">
			<form id="form1" class="form-horizontal">
				<h2>Vue Customer Management-1(directive)</h2>
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
					<input type="button" class="btn btn-primary" value="등록" id="btnInsert" @click="customerInsert()" />
					<input type="button" class="btn btn-primary" value="수정" id="btnUpdate" @click="customerUpdate()" />
					<input type="button" class="btn btn-primary" value="삭제" id="btnDelete" @click="customerDelete()" />
					<input type="button" class="btn btn-primary" value="검색" id="btnUpdate" @click="customerSearch()" />
					<input type="button" class="btn btn-primary" value="전체" id="btnUpdate" @click="customerAll()" />
					<input type="button" class="btn btn-primary" value="초기화" id="btnInit" @click="init()" />
				</div>
			</form>
		</div>
		<hr />
		<div class="container">
			<h2>사용자 목록</h2>
			<table class="table text-center">
				<thead>
					<tr>
						<th class="text-center">번호</th>
						<th class="text-center">이름</th>
						<th class="text-center">주소</th>
					</tr>
				</thead>
				<tbody id="tb">
					<tr v-for="c in customers" :key="c.num" @click="customerSelectOne(c.num)">
						<td>{{ c.num }}</td>
						<td>{{ c.name }}</td>
						<td v-text="c.address"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style scoped></style>
