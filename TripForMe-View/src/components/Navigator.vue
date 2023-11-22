<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const { tab } = storeToRefs(userStore);
// const tab = ref(null)
const items = [
    {
        idx: 0,
        content: '홈',
        router: "/"
    },
    {
        idx: 1,
        content: '여행 테마 찾아보기',
        router: "/list"
    },
    {
        idx: 2,
        content: '여행 테마 등록하기',
        router: "/insert"
    },
    {
        idx: 3,
        content: '회원 관리 페이지',
        router: "/manage"
    },
]

const router = useRouter();

function routerMove(item) {
    console.log(tab);
    router.push(item.router);
}

</script>

<template>
    <v-spacer></v-spacer>
    <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item.idx" :value="item.idx" class="tab" @click="routerMove(item)">
            {{ item.content }}
        </v-tab>
    </v-tabs>
    <v-spacer></v-spacer>
</template>

<style scoped>
.tab {
    font-family: "Maplestory-Light";
    font-size: 20px;
}

a {
    text-decoration: none;
    color: black;
}
</style>