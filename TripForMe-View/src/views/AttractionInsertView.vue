<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import MapContainer from '../components/MapContainer.vue'
import ThemeInputForm from '../components/ThemeInputForm.vue'

import { insertTheme } from '../api/theme'
import { useUserStore } from '../stores/user'
import { useThemeStore } from '../stores/theme'
import { storeToRefs } from "pinia";

const store = useUserStore();
const themeStore = useThemeStore();
const { userInfo, tab } = storeToRefs(store);
const { course, courseinfo, title, description, companion, period, budget } = storeToRefs(themeStore);

// const course = ref([]);
const router = useRouter();

const updateCourse = (data) => {
    course.value = data.map((value) => value.contentId);
}

const submit = (form) => {

    const data = {
        "theme": {
            userId: userInfo.value.userId,
            ...form
        },
        "course": course.value.map((value) => value.contentId)
    };

    console.log(data);

    insertTheme(
        data,
        () => {
            tab.value = 1;
            title.value = "";
            description.value = "";
            companion.value = "";
            period.value = "";
            budget.value = "";
            course.value = [];
            courseinfo.value = [];
            router.push("/list");
        },
        (err) => { console.log(err) }
    )

}

</script>

<template>
    <v-main>

        <MapContainer @update-course="updateCourse">
        </MapContainer>

        <ThemeInputForm @submit="submit"></ThemeInputForm>

    </v-main>
</template>

<style scoped></style>