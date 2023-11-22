<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';
import { useThemeStore } from "@/stores/theme";
import { useUserStore } from '../stores/user'

const router = useRouter();

const themeStore = useThemeStore();
const userStore = useUserStore();
const { tab } = storeToRefs(userStore);

const { topThemes } = storeToRefs(themeStore);
const { getTopThemes } = themeStore;

onMounted(() => {
    getTopThemes();
    console.log(topThemes.value);
})

const imagePath = "/assets/images/wallpaper.png";
const model = ref(null);

const move = (id) => {
    tab.value = -1;
    router.push(`/detail/${id}`);
}
</script>

<template>
    <v-container>
        <v-sheet class="mx-auto" elevation="8" max-width="1500">
            <v-container class="top-ten ps-8">
                <div class="area">인기테마 10선</div>
            </v-container>
            <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
                <v-slide-group-item v-for="(theme, index) in topThemes" :key="theme" v-slot="{ toggle, selectedClass }">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card :class="['ma-4', selectedClass]" height="256" width="256" @click="move(theme.id)"
                            :elevation="isHovering ? 24 : 6" v-bind="props">
                            <v-card-item>
                                <v-img v-if="theme.representImg" :src="theme.representImg" height="150px" cover></v-img>
                                <v-img v-else src="/assets/images/jejudo.jpg" height="150px" cover></v-img>

                                <v-card-text class="overflow-x-hidden justify-center mb-6">
                                    <div class="area">Top{{ index + 1 }} : {{ theme.title }}</div>

                                </v-card-text>
                                <!-- <v-card-subtitle class="d-flex justify-end mb-6">
                                                                                                                                                        추천수 : {{ theme.likeCnt }}
                                                                                                                                                    </v-card-subtitle> -->
                            </v-card-item>
                            <v-overlay :model-value="isHovering" contained scrim="#080808"
                                class="align-center justify-center">
                                <div class="d-flex justify-center like">{{ theme.description }}</div><br>
                                <div class="d-flex justify-center align-end like2">추천수 : {{ theme.likeCnt }}</div>
                                <!-- <v-btn variant="flat">See more info</v-btn> -->
                            </v-overlay>
                        </v-card>
                    </v-hover>
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

.area {
    font-family: 'JalnanGothic';
    font-size: 20px;
}

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