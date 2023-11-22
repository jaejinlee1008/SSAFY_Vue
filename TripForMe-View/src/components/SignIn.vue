<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useUserStore();
const { canUseId, signUpDialog } = storeToRefs(store);
const { check, userSignUp } = store;


const signUpInfo = ref({
    userId: "",
    userName: "",
    userPwd: "",
    emailId: "",
    emailDomain: ""
})

const dupcheck = async () => {
    console.log(signUpInfo.value.userId);
    if (signUpInfo.value.userId.length > 0) {
        await check(signUpInfo.value.userId);

    }

}

const signup = async () => {
    // 가입 전송
    await userSignUp(signUpInfo.value);
    router.push('/');
}

</script>

<template>
    <v-dialog v-model="signUpDialog" persistent width="1024">
        <template v-slot:activator="{ props }">
            <v-btn variant="text" v-bind="props" class="sign">
                회원가입
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">User Profile</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>

                        <v-col cols="12">
                            <v-text-field label="ID*" required @keyup="dupcheck" v-model="signUpInfo.userId"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <div v-show="signUpInfo.userId.length > 0">{{ canUseId ? '사용가능한 아이디입니다.' : '중복된 아이디입니다.' }}
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="이름*" hint="이름을 입력해주세요" v-model="signUpInfo.userName"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="5">
                            <v-text-field label="EmailId*" v-model="signUpInfo.emailId" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="1" class="centered-at">
                            <div>@</div>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field label="EmailDomain*" v-model="signUpInfo.emailDomain" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Password*" type="password" v-model="signUpInfo.userPwd"
                                required></v-text-field>
                        </v-col>

                    </v-row>
                </v-container>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="signup">
                    가입하기
                </v-btn>
                <v-btn color="error" variant="text" @click="signUpDialog = false">
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

.centered-at {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    /* 원하는 크기로 조절하세요 */
}
</style>