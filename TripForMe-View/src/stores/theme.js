import { ref } from 'vue'
import { defineStore } from 'pinia'
import { httpStatusCode } from "@/util/http-status";
import {
    getThemeById, delThemeById, top10Themes, AllThemes, themesFindByKeyword
} from "@/api/theme";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

export const useThemeStore = defineStore('theme', () => {

    const GPTDialog = ref(false)
    const myThemes = ref([]);
    const gptreply = ref('');
    const gptTheme = ref({});
    const topThemes = ref([]);
    const Themes = ref([]);
    const searchedThemes = ref([]);
    const sido = ref({});
    const gugun = ref({});
    const course = ref([]);
    const courseinfo = ref([]);
    const title = ref("");
    const description = ref("");
    const companion = ref("");
    const period = ref("");
    const budget = ref("");
    const getUserTheme = (userId) => {

        getThemeById(
            userId,
            (response) => {
                if (response.status === httpStatusCode.OK) {
                    myThemes.value = response.data.myList;
                    console.log(response.data.myList);
                    console.log(myThemes.value, 'myThemes에 담았다');
                } else {
                    console.log("정보 접근 권한 없음!!!!");
                }
            },
            (error) => {
                console.log(error);

            }
        );
    };

    const themeDelete = (id) => {

        delThemeById(
            id,
            (response) => {
                if (response.status === 204) {
                    const userStore = useUserStore();
                    const { userInfo } = storeToRefs(userStore);
                    getUserTheme(userInfo.value.userId);
                    console.log('테마 삭제 성공');
                } else {
                    console.log("테마 삭제 실패");
                }
            },
            (error) => {
                console.log(error);

            }
        );
    };

    const getTopThemes = (id) => {
        top10Themes(
            id,
            (response) => {
                if (response.status === httpStatusCode.OK) {
                    topThemes.value = response.data.topList;
                    console.log('추천순위 높은 테마 가져오기 성공');
                } else {
                    console.log("실패");
                }
            },
            (error) => {
                console.log(error);

            }
        );
    };

    const getAllThemes = (id) => {
        AllThemes(
            id,
            (response) => {
                if (response.status === httpStatusCode.OK) {
                    Themes.value = response.data.themes;
                    console.log('모든 테마 가져오기 성공');
                } else {
                    console.log("실패");
                }
            },
            (error) => {
                console.log(error);

            }
        );
    };

    const searchThemes = (keyword) => {
        themesFindByKeyword(
            keyword,
            (response) => {
                if (response.status === httpStatusCode.OK) {
                    searchedThemes.value = response.data.themes;
                    console.log('검색된 테마 가져오기 성공');
                } else {
                    console.log("실패");
                }
            },
            (error) => {
                console.log(error);

            }
        );
    };

    return {
        myThemes,
        GPTDialog,
        gptreply,
        gptTheme,
        topThemes,
        Themes,
        searchedThemes,
        sido,
        gugun,
        course,
        courseinfo,
        title,
        description,
        companion,
        period,
        budget,
        getUserTheme,
        themeDelete,
        getTopThemes,
        getAllThemes,
        searchThemes,
    };
},
    {
        persist: {
            storage: sessionStorage
        },
    },)