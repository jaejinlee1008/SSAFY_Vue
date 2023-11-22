import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listSido(success, fail) {
  local.get(`/sido`).then(success).catch(fail);
}

// param => sido : 시도 코드
function listGugun(param, success, fail) {
  local.get(`/gugun`, { params: param }).then(success).catch(fail);
}

export { listSido, listGugun };
