<script setup>
import { getimg } from "@/api/openai";
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/stores/theme";
import { ref } from 'vue';
import AITheme from "./AITheme.vue";

const themeStore = useThemeStore();

const { GPTDialog, gptTheme, sido, aiImg, title, description, companion, period, budget, course } = storeToRefs(themeStore);

const emits = defineEmits(["submit"]);

// const title = ref("");
// const description = ref("");
// const companion = ref("");
// const period = ref("");
// const budget = ref("");
// const GPTDialog2 = ref(false);
const submit = async () => {
    // GPTDialog2.value = true;
    // console.log(gptTheme.value["테마설명"]);
    // await getimg(course.value[0].addr1.split(" ")[0] + '에서' + gptTheme.value["테마설명"] + '테마');
    emits("submit", {
        title: title.value,
        description: description.value,
        recomandCompanion: companion.value,
        expectedPeriod: period.value,
        budget: budget.value,
        // representImg: aiImg.value
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
        <!-- <v-dialog v-model="GPTDialog2" persistent width="768">
                <v-card>
                    <v-card-text>
                        <v-container>
                            <img src="/assets/images/Searching.gif" />
                            <div>테마를 분석해 대표 테마 이미지를 생성중입니다...</div>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" variant="text" @click="GPTDialog2 = false">
                            답변기다리며둘러보기
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog> -->
    </v-container>
</template>

<style scoped>
.sign {
    font-family: "Maplestory-Bold";
    font-size: 20px;
}
</style>