import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

//axios호출을 위한 함수 가져오기
import { selectAll, selectOne, insert, update, deleteCustomer } from '../api/customer'
const useCustomerStore = defineStore('customerStore', () => {
    //1.state
    const customers = ref([]) //all data
    const customer = ref({}) //one data
    //2.action
    const allCustomer = () => {
        selectAll(
            ({ data }) => {
                console.log(data);
                customers.value = data
            },
            (error) => {
                console.log(error);
            }
        );
    }
    const oneCustomer = (num) => {
        selectOne(
            num,
            ({ data }) => { customer.value = data },
            (error) => { console.log(error); }
        )
    }
    const insertCustomer = (param) => {
        insert(
            { num: param.num, name: param.name, address: param.address },
            (response) => {
                if (response.status == 200) {
                    //init(); //화면 지우기
                    //router.push({ name: 'list' })
                }
            },
            (error) => { console.log(error); }
        )
    }
    const updateCustomer = (param) => {
        update(
            { num: param.num, name: param.name, address: param.address },
            (response) => {
                if (response.status == 200) {
                    allCustomer();
                }
            },
            (error) => { console.log(error); }
        )
    }
    const delCustomer = (num) => {
        deleteCustomer(
            num,
            (response) => {
                if (response.status == 200) {
                    console.log('삭제성공');
                    allCustomer();
                }
            },
            (error) => { console.log(error); }
        )
    }



    //3.getter
    const all = computed(() => customers.value)
    const one = computed(() => customer.value)

    return {
        all, one, allCustomer, insertCustomer, updateCustomer, oneCustomer, delCustomer
    }
})

export { useCustomerStore }