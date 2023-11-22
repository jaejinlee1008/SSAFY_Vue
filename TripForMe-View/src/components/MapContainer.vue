<script setup>

import VKakaoMap from './common/VKakaoMap.vue';
import AttractionInfoSheet from './AttractionInfoSheet.vue';

import { ref, onMounted } from 'vue';
import { listSido, listGugun } from '../api/map'
import { searchAttractions } from '../api/attraction'
import { useThemeStore } from "../stores/theme";
import { storeToRefs } from "pinia";
const themeStore = useThemeStore();

const { sido, gugun, course } = storeToRefs(themeStore);

const emits = defineEmits(["updateCourse"]);

const attractions = ref([]);
const selectAttraction = ref({});
// const course = ref([]);

const sidoList = ref([]);
const gugunList = ref([]);
const contentList = ref([
    {
        "value": 12,
        "text": "관광지"
    },
    {
        "value": 14,
        "text": "문화시설"
    },
    {
        "value": 15,
        "text": "축제/공연행사"
    },
    {
        "value": 25,
        "text": "여행코스"
    },
    {
        "value": 28,
        "text": "레포츠"
    },
    {
        "value": 32,
        "text": "숙박"
    },
    {
        "value": 38,
        "text": "쇼핑"
    },
    {
        "value": 39,
        "text": "음식점"
    }
]);

// const sido = ref({
//     "value": 0,
//     "text": "시/도 선택"
// });
// const gugun = ref({
//     "value": 0,
//     "text": "구/군 선택"
// });
const contentType = ref(contentList.value[0].value);
const keyword = ref("");

const isSheetShow = ref(false);

onMounted(() => {
    getSidoList();
    onChangeSido(1);
});

const getSidoList = () => {
    listSido(
        ({ data }) => {
            let options = [];
            data.forEach((sido) => {
                options.push({ text: sido.sidoName, value: sido.sidoCode });
            });

            sidoList.value = options;
            sido.value = sidoList.value[0].value;
        },
        (err) => {
            console.log(err);
        }
    );
};

const onChangeSido = (val) => {
    listGugun(
        { sido: val },
        ({ data }) => {
            let options = [];
            data.forEach((gugun) => {
                options.push({ text: gugun.gugunName, value: gugun.gugunCode });
            });

            // gugun.value = {text: "구/군 선택", value: ""};
            gugunList.value = options;
            gugun.value = gugunList.value[0].value;
            search();
        },
        (err) => {
            console.log(err);
        }
    );
};

const onChangeGugun = () => {
    search();
};

const onChangeType = () => {
    search();
};

const search = () => {

    searchAttractions(
        {
            sido: sido.value > 0 ? sido.value : null,
            gugun: gugun.value > 0 ? gugun.value : null,
            content: contentType.value,
            keyword: keyword.value ? keyword.value : null
        },
        ({ data }) => {
            attractions.value = data;
        },
        (err) => {
            console.log(err);
        }
    )
}

const setAttraction = (attraction) => {
    selectAttraction.value = attraction;
    isSheetShow.value = true;
}

const addCourse = () => {
    if (!course.value.find((element) =>
        element.contentId === selectAttraction.value.contentId)) {
        course.value.push(selectAttraction.value);
        // emits("updateCourse", course.value);
    }
    close();
}

const close = () => {
    isSheetShow.value = false;
    selectAttraction.value = { ...selectAttraction.value }
}

const removeAttraction = (index) => {
    course.value.splice(index, 1);
    // emits("updateCourse", course.value);
}

</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <v-card height="800">

                    <v-container>
                        <v-container class="d-flex pa-0">
                            <v-col>
                                <v-select :items="sidoList" item-title="text" item-value="value" density="comfortable"
                                    variant="outlined" label="시/도" class="px-2" :width="200" v-model="sido"
                                    @update:modelValue="onChangeSido"></v-select>
                            </v-col>

                            <v-col>
                                <v-select :items="gugunList" item-title="text" item-value="value" density="comfortable"
                                    variant="outlined" label="구/군" class="px-2" :width="200" v-model="gugun"
                                    @update:modelValue="onChangeGugun"></v-select>
                            </v-col>

                            <v-col>
                                <v-select :items="contentList" item-title="text" item-value="value" density="comfortable"
                                    variant="outlined" label="카테고리" class="px-2" :width="200" v-model="contentType"
                                    @update:modelValue="onChangeType"></v-select>
                            </v-col>

                        </v-container>

                        <v-text-field density="compact" variant="outlined" label="검색하기..." append-inner-icon="mdi-magnify"
                            single-line hide-details v-model="keyword" @click:append-inner="search"
                            v-on:keyup.enter="search"></v-text-field>
                    </v-container>

                    <VKakaoMap class="rounded-lg" :attractions="attractions" :selectAttraction="selectAttraction"
                        @set-attraction="setAttraction">

                        <AttractionInfoSheet :isShow="isSheetShow" :selectAttraction="selectAttraction"
                            @add-course="addCourse" @close="close"></AttractionInfoSheet>

                    </VKakaoMap>

                </v-card>
            </v-col>
            <v-col>
                <v-card height="800">
                    <v-container>
                        <v-text class="course">나만의 코스</v-text>

                        <v-virtual-scroll :items="course" height="750">
                            <template v-slot:default="{ item, index }">
                                <v-card height="80" class="mb-5 my-3 elevation-4">
                                    <v-row class="py-4">
                                        <v-col @click="setAttraction(item)">
                                            <h3 class="pa-3">{{ item.title }}</h3>
                                        </v-col>

                                        <v-col cols="2">
                                            <v-btn icon="mdi-delete" color="error" @click="removeAttraction(index)">
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </template>
                        </v-virtual-scroll>

                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.course {
    font-family: "Maplestory-Bold";
    font-size: 25px;
}
</style>