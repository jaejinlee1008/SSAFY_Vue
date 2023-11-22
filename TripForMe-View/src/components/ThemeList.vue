<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/stores/theme";


const themeStore = useThemeStore();

const { Themes, searchedThemes } = storeToRefs(themeStore);
const { getAllThemes, searchThemes } = themeStore;

onMounted(async () => {
    await getAllThemes();
    console.log(Themes.value);
})
const keyword = ref('');
const themeSearch = async () => {
    console.log(keyword.value);
    await searchThemes(keyword.value);
    console.log(searchedThemes.value);
}

</script>

<template>
    <v-container class="w-50">

        <v-text-field :loading="loading" density="compact" variant="outlined" label="검색하기..."
            append-inner-icon="mdi-magnify" v-model="keyword" single-line hide-details
            @click:append-inner="themeSearch"></v-text-field>
    </v-container>

    <v-container class="w-75">
        <v-row>
            <v-col v-for="n in 10" :key="n" cols="3">
                <v-card height="200" image="/assets/images/wallpaper.png"></v-card>
            </v-col>
        </v-row>

        <div class="text-center">
            <v-container>
                <v-row justify="center">
                    <v-col cols="8">
                        <v-container class="max-width">
                            <v-pagination v-model="page" class="my-4" :length="15"></v-pagination>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </v-container>
</template>

<style scoped></style>