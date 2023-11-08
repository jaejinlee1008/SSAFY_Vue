import myaxios from "../utils/axios-common";
//서버로 비동기 요청하는 함수들

function selectAll(success, fail) {
  myaxios.get(`/customers`).then(success).catch(fail);
}

function selectOne(num, success, fail) {
  myaxios.get(`/customers/${num}`).then(success).catch(fail);
}

function insert(customer, success, fail) {
  myaxios.post('/customers', JSON.stringify(customer)).then(success).catch(fail);
}

function update(customer, success, fail) {
  myaxios.put('/customers', JSON.stringify(customer)).then(success).catch(fail);
}

function deleteCustomer(num, success, fail) {
  myaxios.delete(`/customers/${num}`).then(success).catch(fail);
}

export {
  selectAll,
  selectOne,
  insert,
  update,
  deleteCustomer
};
