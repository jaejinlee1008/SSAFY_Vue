<script setup>

import Navigator from './Navigator.vue';
import Login from "./Login.vue";
import SignIn from "./SignIn.vue";

import { useUserStore } from '../stores/user'
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useUserStore();
const { isLogin, userInfo, loginDialog, tab } = storeToRefs(store);
const { userLogout, getAllUser } = store;

function goMain() {
    tab.value = 0;
    router.push('/')
}

const goManagePage = async () => {
    await getAllUser();
    tab.value = 3;
    router.push('/manage')
}

const logout = async () => {
    await userLogout(userInfo.value.userId);
    if (!isLogin) {
        console.log("로그아웃 성공");
    }
    console.log(loginDialog.value);
    router.push("/")
}
</script>

<template>
    <v-app-bar extended class="px-8">

        <v-app-bar-nav-icon class="rounded-xl" width="70" height="70" @click="goMain">
            <img src="/assets/images/logo.png" width="70" height="70">
        </v-app-bar-nav-icon>

        <v-app-bar-title class="font-weight-bold title">
            <v-btn variant="text" @click="goMain">Trip For Me!!</v-btn>
        </v-app-bar-title>

        <v-spacer></v-spacer>
        <div v-if="!isLogin">
            <Login></Login>

            <SignIn></SignIn>
        </div>
        <div v-if="isLogin">
            <span class="text">{{ userInfo?.userName }}님 환영합니다.</span>
            <v-btn variant="text" class="sign" @click="logout">
                로그아웃
            </v-btn>
            <v-btn variant="text" class="sign" v-if="userInfo?.userId == 'admin'" @click="goManagePage">
                관리자페이지
            </v-btn>
            <v-btn variant="text" class="sign" @click="goManagePage" v-else>
                마이페이지
            </v-btn>
        </div>
        <template v-slot:extension>
            <Navigator></Navigator>
        </template>

    </v-app-bar>
</template>

<style scoped>
.title {
    font-family: "PyeongChangPeace-Bold";
}

.text {
    font-family: "Maplestory-Bold";
    font-size: 16px;
}

.sign {
    font-family: "Maplestory-Bold";
    font-size: 20px;
}
</style>