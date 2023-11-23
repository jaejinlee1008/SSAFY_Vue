<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';
import { useUserStore } from "@/stores/user";

const router = useRouter();

const userStore = useUserStore();

const { loginDialog, isLogin } = storeToRefs(userStore);
const { userLogin, getUserInfo } = userStore;


// const dialog = ref(false)
const loginUser = ref({
    userId: "",
    userPwd: "",
});

const login = async () => {
    console.log("login ing!!!! !!!");
    await userLogin(loginUser.value);
    let token = sessionStorage.getItem("accessToken");
    console.log("111. ", token);
    console.log("isLogin: ", isLogin);
    if (isLogin.value) {
        console.log("로그인 성공아닌가???");
        getUserInfo(token);
    } else {
        alert('일치하는 회원이 없습니다.');
    }
    router.push("/");
};

</script>

<template>
    <v-dialog v-model="loginDialog" persistent width="768">
        <template v-slot:activator="{ props }">
            <v-btn variant="text" v-bind="props" class="sign">
                로그인
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">로그인</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>

                        <v-col cols="12">
                            <v-text-field label="ID" hint="id를 입력해주세요" v-model="loginUser.userId"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Password*" type="password" required v-model="loginUser.userPwd"
                                @keyup.enter="login"></v-text-field>
                        </v-col>

                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="login">
                    로그인
                </v-btn>
                <v-btn color="error" variant="text" @click="loginDialog = false">
                    취소
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.sign {
    font-family: "Maplestory-Bold";
    font-size: 20px;
}
</style>