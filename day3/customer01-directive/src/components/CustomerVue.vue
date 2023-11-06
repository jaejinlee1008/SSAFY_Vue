<script setup>
    import {ref} from 'vue'
    const customers = ref([])//모든 고객 정보 저장하고 있는 배열
    const num = ref("")
    const name = ref("")
    const address = ref("")
    //1.초기화면에서 보여줄 데이터 준비
    let customerTmp = localStorage.getItem("customerlist")
    if(customerTmp){
        customers.value = JSON.parse(customerTmp)
    }

    function customerInsert(){
        //1.사용자가 입력한 값 받아오기
        const new_customer = {
            num : num.value,
            name : name.value,
            address : address.value
        }
        //2.화면 업데이트
        customers.value.push(new_customer);

        //3.로컬스토리지에 반영
        let tmpList = [];
        const customerTmp = localStorage.getItem('customerlist')
        if(customerTmp){
            tmpList = JSON.parse(customerTmp)
        }
        tmpList.push(new_customer)
        localStorage.setItem("customerlist",JSON.stringify(tmpList))
        alert('등록')
        clearText();
    }

    function clearText(){
        num.value='';
        name.value='';
        address.value='';
    }

    function customerSelect(number) {
        let cc = {};
        cc = customers.value.find((item)=>{
            return item.num == number;
        })
        console.log(cc.num);
        num.value = cc.num;
        name.value = cc.name;
        address.value = cc.address;
    }

    function customerDelete(){
        customers.value = customers.value.filter((item)=>item.num!=num.value);
        localStorage.setItem("customerlist",customers);
        clearText();
    }
</script>

<template>
    <div>
        <h1>Vue Customer Management</h1>
        <div class="container">
            <form id="form1" class="form-horizontal">
                <h2>SpringBoot REST Customer Management</h2>
                <div class="form-group">
                    <label>번호:</label> <input type="text" class="form-control" id="num" v-model="num">
                </div>
                <div class="form-group">
                    <label>이름:</label> <input type="text" class="form-control" id="name" v-model="name">
                </div>

                <div class="form-group">
                    <label>주소:</label> <input type="text" class="form-control"
                        id="address" v-model="address">
                </div>

                <div class="btn-group">
                    <input type="button" class="btn btn-primary" value="등록" id="btnInsert" @click="customerInsert()"/> 
                    <input type="button" class="btn btn-primary" value="수정" id="btnUpdate" @click="customerUpdate()"/> 
                    <input type="button" class="btn btn-primary" value="삭제" id="btnDelete" @click="customerDelete()"/>
                    <input type="button" class="btn btn-primary" value="검색" id="btnSearch" @click="customerSearch()"/>
                    <input type="button" class="btn btn-primary" value="전체" id="btnAll" @click="selectAll()"/> 			
                    <input type="reset" class="btn btn-primary" value="초기화" id="btnInit"/>
                </div>
            </form>
        </div>
        <hr />
        <div class="container">
            <h2>사용자 목록</h2>
            <div v-if="customers.length>0">
            <table class="table text-center">
                <thead>
                    <tr>
                        <th class="text-center">번호</th>
                        <th class="text-center">이름</th>
                        <th class="text-center">주소</th>
                    </tr>
                </thead>
                <tbody id="tb">
                    <tr v-for="c in customers" :key="c.num" @click="customerSelect(c.num)">
                        <td>{{ c.num }}</td>
                        <td>{{ c.name }}</td>
                        <td v-text="c.address"></td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div v-else>
                데이터가 없습니다.
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>