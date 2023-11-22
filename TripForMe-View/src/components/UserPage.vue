<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { useThemeStore } from "@/stores/theme";

const userStore = useUserStore();
const themeStore = useThemeStore();

const { userInfo } = storeToRefs(userStore);
const { myThemes } = storeToRefs(themeStore);
const { userUpdatePwd, userUpdate, userSignOut, } = userStore;
const { getUserTheme, themeDelete } = themeStore;

onMounted(() => {
    getUserTheme(userInfo.value.userId);
})

const updatedUser = ref({
    userId: "",
    userName: "",
    emailId: "",
    emailDomain: "",
})
const oldPwd = ref('');
const newPwd = ref('');
const newPwdCheck = ref('');

const dialog = ref(false);
console.log(userInfo.value);
updatedUser.value.userId = userInfo?.value.userId;
updatedUser.value.userName = userInfo?.value.userName;
updatedUser.value.emailId = userInfo?.value.emailId;
updatedUser.value.emailDomain = userInfo?.value.emailDomain;

const step = ref(1)
const pwflag = ref(false)
const newPwflag = ref(false)

function pwcheck() {
    console.log(oldPwd.value);
    console.log(userInfo.value);
    console.log(userInfo.value.userPwd, '기존값');
    if (userInfo.value.userPwd == oldPwd.value) {
        pwflag.value = true;
    } else {
        pwflag.value = false;
    }
}

function newPwCheck() {
    console.log(newPwd.value);
    console.log(newPwdCheck.value);
    if (newPwd.value == newPwdCheck.value) {
        newPwflag.value = true;
    } else {
        newPwflag.value = false;
    }
}

function reset() {
    updatedUser.value = userInfo.value;
}

const changePwd = async () => {
    await userUpdatePwd(newPwd.value);
    dialog.value = false;
}

const updateUser = async () => {
    await userUpdate(updatedUser.value);
}

const signOut = async () => {
    await userSignOut(userInfo.value.userId);
}

const selected = ref([]);
const headers = ref([
    {
        title: '테마ID',
        align: 'start',
        key: 'id',
    },
    { title: '작성자', align: 'end', key: 'userId' },
    { title: '테마제목', align: 'end', key: 'title' },
    { title: '테마설명', align: 'end', key: 'description' },
    { title: '추천여행자', align: 'end', key: 'recomandCompanion' },
    { title: '여행기간', align: 'end', key: 'expectedPeriod' },
    { title: '여행예산', align: 'end', key: 'budget' },
    { title: '추천수', align: 'end', key: 'likeCnt' },
])

const deleteTheme = async () => {
    await selected.value.forEach(item => {
        themeDelete(item.id);
    });
}

</script>

<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">마이페이지</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>

                    <v-col cols="12">
                        <v-text-field label="ID" v-model="updatedUser.userId" readonly></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field label="이름*" hint="이름을 입력해주세요" v-model="updatedUser.userName" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                        <v-text-field label="EmailId*" v-model="updatedUser.emailId" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="1" class="centered-at">
                        <div>@</div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field label="EmailDomain*" v-model="updatedUser.emailDomain" required></v-text-field>
                    </v-col>
                    <v-dialog v-model="dialog" persistent width="1024">
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" v-bind="props">
                                비밀번호 변경
                            </v-btn>
                        </template>

                        <v-card class="mx-auto" max-width="1000">
                            <v-card-title class="text-h6 font-weight-regular justify-space-between">
                                <span>{{ step == 1 ? '비밀번호 확인' : '새로운 비밀번호 입력' }}</span>
                                <v-avatar color="primary" size="24" v-text="step"></v-avatar>
                            </v-card-title>

                            <v-window v-model="step">
                                <v-window-item :value="1">
                                    <v-card-text>
                                        <v-text-field label="Password" type="password" v-model="oldPwd"
                                            @keyup="pwcheck"></v-text-field>
                                        <span class="text-caption text-grey-darken-1">
                                            현재 사용중인 비밀번호를 입력해주세요.
                                        </span>
                                    </v-card-text>
                                </v-window-item>

                                <v-window-item :value="2">
                                    <v-card-text>
                                        <v-text-field label="Password" type="password" v-model="newPwd"></v-text-field>
                                        <v-text-field label="Confirm Password" type="password" v-model="newPwdCheck"
                                            @keyup="newPwCheck"></v-text-field>
                                        <span class="text-caption text-grey-darken-1">
                                            새로운 비밀번호를 입력해주세요.
                                        </span>
                                    </v-card-text>
                                </v-window-item>

                            </v-window>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn v-if="step == 1 && pwflag" color="primary" variant="flat" @click="step++">
                                    Next
                                </v-btn>
                                <v-btn v-if="step == 2 && newPwflag" color="primary" variant="flat" @click="changePwd">
                                    수정
                                </v-btn>
                                <v-btn v-if="step == 2" color="primary" variant="flat" @click="dialog = false">
                                    취소
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                </v-row>
            </v-container>

        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" @click="updateUser">
                수정
            </v-btn>
            <v-btn color="error" variant="text" @click="reset">
                취소
            </v-btn>
            <v-btn color="cyan" variant="text" @click="signOut">
                회원탈퇴
            </v-btn>
        </v-card-actions>
    </v-card>
    <hr>
    <div style="text-align: right;">
        <v-btn variant="text" class="sign" @click="deleteTheme">
            테마삭제
        </v-btn>
    </div>
    <v-data-table v-model="selected" :headers="headers" :items="myThemes" items-per-page="5" item-value="id" return-object
        show-select></v-data-table>
</template>

<style scoped>
.sign {
    font-family: "Maplestory-Bold";
    font-size: 20px;
}
</style>