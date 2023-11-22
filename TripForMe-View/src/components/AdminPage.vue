<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import AITheme from "./AITheme.vue";
const userStore = useUserStore();

const { users } = storeToRefs(userStore);
const { getAllUser, userDelete } = userStore;

onMounted(() => {
    getAllUser();

});

console.log(users.value, '유저 리스트');

const selected = ref([]);
const headers = ref([
    {
        title: '사용자ID',
        align: 'start',
        key: 'userId',
    },
    { title: '사용자이름', align: 'end', key: 'userName' },
    { title: '이메일아이디', align: 'end', key: 'emailId' },
    { title: '이메일도메인', align: 'end', key: 'emailDomain' },
    { title: '가입날짜', align: 'end', key: 'joinDate' },
    { title: '탈퇴여부', align: 'end', key: 'isout' },
])

const deleteUser = () => {
    selected.value.forEach(item => {
        userDelete(item.userId);
    });

}

</script>

<template>
    <div style="text-align: right;">
        <v-btn variant="text" class="sign" @click="deleteUser">
            회원삭제
        </v-btn>
    </div>
    <v-data-table v-model="selected" :headers="headers" :items="users" items-per-page="5" item-value="userId" return-object
        show-select></v-data-table>
    <hr>
    <AITheme></AITheme>
</template>

<style scoped>
.sign {
    font-family: "Maplestory-Bold";
    font-size: 20px;
}
</style>