<script setup>
import { getimg } from "@/api/openai";
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/stores/theme";
import { ref } from 'vue';
import AITheme from "./AITheme.vue";

const themeStore = useThemeStore();

const { title, description, companion, period, budget, course, courseinfo } = storeToRefs(themeStore);

const emits = defineEmits(["submit"]);

const submit = async () => {
    let img = '';
    console.log('info : ', courseinfo.value);
    courseinfo.value.forEach(item => {
        if (item.firstImage != "") {
            img = item.firstImage;
            return false;
        }
    })
    emits("submit", {
        title: title.value,
        description: description.value,
        recomandCompanion: companion.value,
        expectedPeriod: period.value,
        budget: budget.value,
        representImg: img
    });
}

</script>

<template>
    <v-container>
        <v-card>
            <v-container>
                당신의 테마는 어떤 테마인가요?
            </v-container>

            <v-container>
                <v-form @submit.prevent="onSubmit">
                    <v-text-field v-model="title" :rules="[required]" class="mb-2" clearable label="테마 제목"></v-text-field>

                    <v-textarea label="테마 설명" v-model="description"></v-textarea>

                    <v-text-field v-model="companion" :rules="[required]" clearable label="누구랑 같이 가면 좋은가요?"></v-text-field>

                    <v-text-field v-model="period" :rules="[required]" clearable label="얼마나 걸릴 것 같나요?"></v-text-field>

                    <v-text-field v-model="budget" :rules="[required]" clearable label="예산은 어느 정도인가요?"></v-text-field>

                </v-form>

            </v-container>
        </v-card>

        <v-container>
            <v-row justify="center">
                <v-btn variant="text" @click="submit" class="sign">
                    등록하기
                </v-btn>
                <AITheme></AITheme>
            </v-row>
        </v-container>
    </v-container>
</template>

<style scoped>
.sign {
    font-family: "Maplestory-Bold";
    font-size: 20px;
}
</style>