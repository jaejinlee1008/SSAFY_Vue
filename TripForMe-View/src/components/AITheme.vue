<script setup>
import { computed } from "vue";
import { connect, getimg } from "@/api/openai";
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/stores/theme";


const themeStore = useThemeStore();

const { GPTDialog, gptreply, gptTheme, course } = storeToRefs(themeStore);


const callgpt = async () => {
    GPTDialog.value = true;
    let msg = '';
    course.value.forEach(item => {
        msg += item.title + ',';
    })
    console.log(course.value[0].addr1.split(" ")[0]);
    await connect(`${course.value[0].addr1.split(" ")[0]}의 ${msg}을 여행하는 여행 테마를 정해줘`);
}
// const callgpt2 = async () => {
//     GPTDialog.value = true;
//     console.log(gptTheme.value["테마설명"]);
//     await getimg('제주도에서' + gptTheme.value["테마설명"] + '테마');
// }
</script>

<template>
    <v-btn variant="text" @click="callgpt" class="sign">
        AI에게 테마 물어보기
    </v-btn>
    <!-- <br>
                            {{ gptreply }}
                            <hr>
                            {{ gptTheme["테마제목"] }}<br>
                            {{ gptTheme["테마설명"] }}<br>
                            {{ gptTheme["추천 여행 동반자"] }}<br>
                            {{ gptTheme["예상 여행 기간"] }} -->
    <v-dialog v-model="GPTDialog" persistent width="768">
        <v-card>
            <v-card-text>
                <v-container>
                    <div class="d-flex justify-center"><img src="/assets/images/Searching.gif" /></div>
                    <div class="d-flex justify-center">AI의 답변을 기다리는 중....</div>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="GPTDialog = false">
                    답변기다리며둘러보기
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