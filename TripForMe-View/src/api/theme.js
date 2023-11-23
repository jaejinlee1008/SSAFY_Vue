import { localAxios } from "@/util/http-commons";

const local = localAxios();

function insertTheme(body, success, fail) {
  local.post(`/theme`, body).then(success).catch(fail);
}
async function getThemeById(userid, success, fail) {
  await local.get(`/themes/${userid}`).then(success).catch(fail);
}
async function delThemeById(id, success, fail) {
  await local.delete(`/theme/${id}`).then(success).catch(fail);
}
async function top10Themes(id, success, fail) {
  await local.get(`/themes/likecnt`).then(success).catch(fail);
}
async function AllThemes(id, success, fail) {
  await local.get(`/themes`).then(success).catch(fail);
}
async function themesFindByKeyword(keyword, success, fail) {
  await local.get(`/themes/search/${keyword}`).then(success).catch(fail);
}

async function getTheme(id, success, fail) {
  await local.get(`/theme/${id}`).then(success).catch(fail);
}

async function getAttractions(id, success, fail) {
  await local.get(`/theme/${id}/attractions`).then(success).catch(fail);
}

async function getLikeCnt(id, success, fail) {
  await local.get(`/theme/${id}/like`).then(success).catch(fail);
}

async function updateLike(body, success, fail) {
  await local.post(`/theme/like`, body).then(success).catch(fail);
}

async function updateTheme(body, success, fail) {
  await local.put(`/theme`, body).then(success).catch(fail);
}


export { 
  insertTheme, 
  getThemeById, 
  delThemeById, 
  top10Themes, 
  AllThemes, 
  themesFindByKeyword, 
  getTheme, 
  getAttractions,
  getLikeCnt,
  updateLike,
  updateTheme
};
