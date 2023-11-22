<script setup>
import AdminPage from "../components/AdminPage.vue";
import UserPage from "../components/UserPage.vue";
import { useUserStore } from '../stores/user'
import { storeToRefs } from "pinia";


const store = useUserStore();
const { userInfo } = storeToRefs(store);
</script>

<template>
    <v-main>
        <AdminPage v-if="userInfo?.userId == 'admin'"></AdminPage>
        <UserPage v-else></UserPage>
    </v-main>
</template>

<style scoped></style>