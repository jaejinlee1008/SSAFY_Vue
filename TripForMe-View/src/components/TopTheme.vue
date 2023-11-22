<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/stores/theme";


const themeStore = useThemeStore();

const { topThemes } = storeToRefs(themeStore);
const { getTopThemes } = themeStore;

onMounted(() => {
    getTopThemes();
    console.log(topThemes.value);
})

const imagePath = "/assets/images/wallpaper.png";
const model = ref(null);
</script>

<template>
    <v-container>
        <v-sheet class="mx-auto" elevation="8" max-width="1500">
            <v-container class="top-ten ps-8">
                추천 높은 테마 찾아보기
            </v-container>
            <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
                <v-slide-group-item v-for="(theme, index) in topThemes" :key="theme" v-slot="{ toggle, selectedClass }">
                    <v-card :class="['ma-4', selectedClass]" height="256" width="256" @click="toggle" :image="imagePath">
                        <v-card-item>
                            <v-card-title>Top : {{ index + 1 }}</v-card-title>
                            <v-card-subtitle>추천수 : {{ theme.likeCnt }}</v-card-subtitle>
                        </v-card-item>
                    </v-card>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>
    </v-container>
</template>

<style scoped>
.top-ten {
    font-family: "Maplestory-Bold";
    font-size: 25px;
}
</style>