import { localAxios } from "@/util/http-commons";

const local = localAxios();

function searchAttractions(param, success, fail) {
  local.get(`/attractions`, { params: param }).then(success).catch(fail);
}

export { searchAttractions };
