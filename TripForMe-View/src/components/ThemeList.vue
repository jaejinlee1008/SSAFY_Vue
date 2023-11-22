<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/stores/theme";
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router';

const themeStore = useThemeStore();
const userStore = useUserStore();
const router = useRouter();
const { Themes, searchedThemes } = storeToRefs(themeStore);
const { tab } = storeToRefs(userStore);
const { getAllThemes, searchThemes } = themeStore;

onMounted(async () => {
    await getAllThemes();
    console.log(Themes.value);
})
// const keyword = ref('');
const search = ref('');
// const themeSearch = async () => {
//     console.log(keyword.value);
//     await searchThemes(keyword.value);
//     console.log(searchedThemes.value);
// }

const move = (id) => {
    tab.value = -1;
    router.push(`/detail/${id}`);
}

</script>

<template>
    <v-card>
        <v-data-iterator :items="Themes" :items-per-page="6" :search="search">
            <template v-slot:header>
                <v-toolbar class="px-2">
                    <v-text-field v-model="search" clearable density="comfortable" hide-details
                        placeholder="테마 제목이나 내용으로 검색" prepend-inner-icon="mdi-magnify" variant="solo"></v-text-field>
                </v-toolbar>
            </template>

            <template v-slot:default="{ items }">
                <v-container class="pa-2" fluid>
                    <v-row dense>
                        <v-col v-for="item in items" :key="item.id" cols="auto" md="4">
                            <v-hover v-slot="{ isHovering, props }">
                                <v-card class="pb-3" border flat min-width="200" @click="move(item.raw.id)"
                                    :elevation="isHovering ? 24 : 6" v-bind="props">
                                    <v-img v-if="item.raw.representImg" :src="item.raw.representImg" height="200px"
                                        cover></v-img>
                                    <v-img v-else src="/assets/images/seoul.jpg" height="200px" cover></v-img>
                                    <v-list-item class="mb-2">
                                        <template v-slot:title>
                                            <strong class="text-h6 mb-2">{{ item.raw.title }}</strong>
                                        </template>
                                    </v-list-item>
                                    <v-overlay :model-value="isHovering" contained scrim="#080808"
                                        class="align-center justify-center">
                                        <div class="d-flex justify-center like">{{ item.raw.description }}</div><br>
                                        <div class="d-flex justify-center align-end like2">추천수 : {{ item.raw.likeCnt }}
                                        </div>
                                        <!-- <v-btn variant="flat">See more info</v-btn> -->
                                    </v-overlay>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-container>
            </template>

            <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                <div class="d-flex align-center justify-center pa-4">
                    <v-btn :disabled="page === 1" icon="mdi-arrow-left" density="comfortable" variant="tonal" rounded
                        @click="prevPage"></v-btn>

                    <div class="mx-2 text-caption">
                        Page {{ page }} of {{ pageCount }}
                    </div>

                    <v-btn :disabled="page >= pageCount" icon="mdi-arrow-right" density="comfortable" variant="tonal"
                        rounded @click="nextPage"></v-btn>
                </div>
            </template>
        </v-data-iterator>
    </v-card>
</template>

<style scoped>
.like {
    color: white;
    font-family: "Maplestory-Bold";
    font-size: 25px;
}

.like2 {
    color: white;
    font-family: "Maplestory-Bold";
    font-size: 15px;
}
</style>