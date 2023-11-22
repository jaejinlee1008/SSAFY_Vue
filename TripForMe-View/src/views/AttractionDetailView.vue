<script setup>

    import { useRoute, useRouter } from 'vue-router';
    import { ref, onMounted } from 'vue';

    import MapDetail from '../components/MapDetail.vue'
    import ThemeInfo from '../components/ThemeInfo.vue';

    import { getTheme, getAttractions, getLikeCnt, updateLike } from '../api/theme'

    import { useUserStore } from '../stores/user'
    import { storeToRefs } from "pinia";

    const store = useUserStore();
    const { userInfo, tab } = storeToRefs(store);

    const route = useRoute();
    const router = useRouter();
    const themeId = route.params.id;

    const theme = ref({});
    const course = ref({});
    const likeCnt = ref(0);

    onMounted(() => {
        getThemeById();
        getAttractionsById();
        getLikeCntById();
    })

    const getThemeById = () => {
        getTheme( themeId,
            ({ data }) => {
                theme.value = data;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    const getAttractionsById = () => {
        getAttractions( themeId,
            ({ data }) => {
                course.value = data;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    const getLikeCntById = () => {
        getLikeCnt( themeId,
            ({ data }) => {
                likeCnt.value = data.likeCnt;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    const clickLike = () => {

        if (!userInfo) return ;

        const data = {
            "themeId": themeId,
            "userId": userInfo.value.userId
        };

        updateLike( data,
            ({ data }) => {
                likeCnt.value = data.likeCnt;
                getLikeCntById();
            },
            (err) => {
                console.log(err);
            }
        );
    }
    
    const back = () => {
        tab.value = 1;
        router.push("/list")
    }

</script>

<template>
    <v-main>
        <MapDetail
            :attractions="course"></MapDetail>

        <ThemeInfo
            :theme="theme"></ThemeInfo>

        <v-container>
            <v-row justify="center">
                <v-btn height="50" width="150" @click="clickLike">
                    추천하기 : {{ likeCnt }}
                </v-btn>
            </v-row>
            <v-row justify="center">
                <v-btn variant="text" class="sign" @click="" v-if="userInfo?.userId === theme.userId">
                    수정하기
                </v-btn>
                <v-btn variant="text" class="sign" @click="" v-if="userInfo?.userId === theme.userId">
                    삭제하기
                </v-btn>
                <v-btn variant="text" class="sign" @click="back">
                    돌아가기
                </v-btn>
            </v-row>
        </v-container>
    </v-main>
</template>

<style scoped>

</style>