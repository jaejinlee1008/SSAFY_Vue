<script setup>

    import { useRoute, useRouter } from 'vue-router';
    import { ref, onMounted } from 'vue';

    import MapDetail from '../components/MapDetail.vue'
    import ThemeInfo from '../components/ThemeInfo.vue';

    import { getTheme, getAttractions, getLikeCnt, updateLike, delThemeById } from '../api/theme'

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

    const deleteTheme = () => {
        delThemeById(themeId,
            () => {
                tab.value = 1;
                router.replace("/list");
            },
            (err) => {
                console.log(err);
            }
        )
    }

    const update = () => {
        router.push(`/update/${themeId}`)
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
                <v-btn class="like" height="50" width="200" elevation-4  @click="clickLike">
                    추천하기 : {{ likeCnt }}
                </v-btn>
            </v-row>
            <v-row justify="center" class="pa-4">
                <v-btn variant="text" class="sign" @click="update" v-if="userInfo?.userId === theme.userId">
                    수정하기
                </v-btn>
                <v-btn variant="text" class="sign" @click="deleteTheme" v-if="userInfo?.userId === theme.userId">
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

.like {
    font-family: "Maplestory-Bold";
    font-size: 20px;
}

.sign {
    font-family: "NPSfont_bold";
    font-size: 20px;
}

</style>