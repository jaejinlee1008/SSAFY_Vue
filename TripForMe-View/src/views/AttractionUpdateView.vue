<script setup>

import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import MapContainer from '../components/MapContainer.vue'
import ThemeInputForm from '../components/ThemeInputForm.vue'

import { updateTheme, getTheme, getAttractions } from '../api/theme'
import { useUserStore } from '../stores/user'
import { useThemeStore } from '../stores/theme'
import { storeToRefs } from "pinia";

const store = useUserStore();
const themeStore = useThemeStore();
const { userInfo, tab } = storeToRefs(store);
const { course, courseinfo, title, description, companion, period, budget } = storeToRefs(themeStore);

const router = useRouter();
const route = useRoute();
const themeId = route.params.id;

const originCourse = ref([]);

const init = () => {
    getTheme(themeId,
        ({ data }) => {
            title.value = data.title;
            description.value = data.description;
            companion.value = data.recomandCompanion;
            period.value = data.expectedPeriod;
            budget.value = data.budget;

        },
        (err) => {
            console.log(err);
        }
    );

    getAttractions(themeId,
        ({ data }) => {
            originCourse.value = data.map((element) => element.contentId);
            course.value = data;
        },
        (err) => {
            console.log(err);
        }
    );
}

onMounted(() => {
    init();
})

const updateCourse = (data) => {
    course.value = data.map((value) => value.contentId);
}

const difference = (arr1, arr2) => {
    return arr1.filter((element) => !arr2.includes(element));
}

const submit = (form) => {

    const updateCourse = course.value.map((value) => value.contentId);

    console.log(form)

    const data = {
        "theme": {
            id: themeId,
            userId: userInfo.value.userId,
            ...form
        },
        "insertCourse": difference(updateCourse, originCourse.value),
        "deleteCourse": difference(originCourse.value, updateCourse)
    };

    console.log(data);

    updateTheme(
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