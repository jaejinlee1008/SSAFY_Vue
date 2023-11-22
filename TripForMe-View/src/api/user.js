import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function userConfirm(param, success, fail) {
    console.log("param", param);
    await local.post(`/user/login`, param).then(success).catch(fail);
    console.log("userConfirm ok");
}

async function findById(userid, success, fail) {
    local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
    await local.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
    local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
    await local.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
    await local.get(`/user/logout/${userid}`).then(success).catch(fail);
}

async function idDupCheck(userid, success, fail) {
    await local.get(`/user/dupcheck/${userid}`).then(success).catch(fail);
}

async function signUp(user, success, fail) {
    await local.post(`/user/signup`, user).then(success).catch(fail);
}

async function updatePwd(user, success, fail) {
    await local.put(`/user/updatepwd`, user).then(success).catch(fail);
}

async function updateUser(user, success, fail) {
    await local.put(`/user/update`, user).then(success).catch(fail);
}

async function deleteUser(userid, success, fail) {
    await local.put(`/user/delete/${userid}`).then(success).catch(fail);
}

async function AllUser(userid, success, fail) {
    await local.get(`/user/allusers/${userid}`).then(success).catch(fail);
}

async function deleteUsers(userId, success, fail) {
    await local.delete(`/user/delete/${userId}`).then(success).catch(fail);
}

export {
    userConfirm, findById, tokenRegeneration, logout,
    idDupCheck, signUp, updatePwd, updateUser, deleteUser, AllUser,
    deleteUsers,
};
