import { ref } from 'vue'
import { useRouter } from "vue-router";
import { defineStore } from 'pinia'
import { jwtDecode } from "jwt-decode";
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";
import {
    userConfirm, findById, tokenRegeneration, logout, idDupCheck, signUp,
    updatePwd, updateUser, deleteUser, AllUser, deleteUsers
} from "@/api/user";
import { httpStatusCode } from "@/util/http-status";

export const useUserStore = defineStore('user', () => {
    const themeStore = useThemeStore();
    const { course, title, description, companion, period, budget } = storeToRefs(themeStore);
    const router = useRouter();
    const tab = ref(null)
    const loginDialog = ref(false)
    const signUpDialog = ref(false)
    const isLogin = ref(false)
    const isLoginError = ref(false);
    const userInfo = ref(null);
    const isValidToken = ref(false);
    const canUseId = ref(false);
    const users = ref([]);
    const getAllUser = () => {
        AllUser(
            userInfo.value.userId,
            (response) => {
                if (response.status === httpStatusCode.OK) {
                    users.value = response.data.users;
                    console.log(response.data.users);
                    console.log(users.value, 'users에 담았다');
                } else {
                    console.log("정보 접근 권한 없음!!!!");
                }
            },
            (error) => {
                console.log(error);

            }
        );
    };

    const userLogin = async (loginUser) => {
        await userConfirm(
            loginUser,
            (response) => {
                // console.log("login ok!!!!", response.status);
                // console.log("login ok!!!!", httpStatusCode.CREATE);
                if (response.status === httpStatusCode.CREATE) {
                    let { data } = response;
                    // console.log("data", data);
                    let accessToken = data["access-token"];
                    let refreshToken = data["refresh-token"];
                    console.log("accessToken", accessToken);
                    console.log("refreshToken", refreshToken);
                    isLogin.value = true;
                    isLoginError.value = false;
                    isValidToken.value = true;
                    sessionStorage.setItem("accessToken", accessToken);
                    sessionStorage.setItem("refreshToken", refreshToken);
                    console.log("sessiontStorage에 담았다", isLogin.value);
                } else {
                    console.log("로그인 실패했다");
                    isLogin.value = false;
                    isLoginError.value = true;
                    isValidToken.value = false;
                }
            },
            (error) => {
                console.error(error);
            }
        );
    };

    const getUserInfo = (token) => {
        let decodeToken = jwtDecode(token);
        console.log("2. decodeToken", decodeToken);
        findById(
            decodeToken.userId,
            (response) => {
                if (response.status === httpStatusCode.OK) {
                    userInfo.value = response.data.userInfo;
                    console.log("3. getUserInfo data >> ", response.data);
                    course.value = [];
                    title.value = '';
                    description.value = '';
                    companion.value = '';
                    period.value = '';
                    budget.value = '';
                    tab.value = 0;
                } else {
                    console.log("유저 정보 없음!!!!");
                }
            },
            async (error) => {
                console.error(
                    "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
                    error.response.status
                );
                isValidToken.value = false;

                await tokenRegenerate();
            }
        );
    };

    const tokenRegenerate = async () => {
        console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("accessToken"));
        await tokenRegeneration(
            JSON.stringify(userInfo.value),
            (response) => {
                if (response.status === httpStatusCode.CREATE) {
                    let accessToken = response.data["access-token"];
                    console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
                    sessionStorage.setItem("accessToken", accessToken);
                    isValidToken.value = true;
                }
            },
            async (error) => {
                // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
                if (error.response.status === httpStatusCode.UNAUTHORIZED) {
                    console.log("갱신 실패");
                    // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
                    await logout(
                        userInfo.value.userid,
                        (response) => {
                            if (response.status === httpStatusCode.OK) {
                                console.log("리프레시 토큰 제거 성공");
                            } else {
                                console.log("리프레시 토큰 제거 실패");
                            }
                            alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                            isLogin.value = false;
                            userInfo.value = null;
                            isValidToken.value = false;
                            // dialog.value = true;
                            router.push({ name: "/" });
                        },
                        (error) => {
                            console.error(error);
                            isLogin.value = false;
                            userInfo.value = null;
                        }
                    );
                }
            }
        );
    };

    const userLogout = async (userid) => {
        await logout(
            userid,
            (response) => {
                if (response.status === httpStatusCode.OK) {
                    isLogin.value = false;
                    userInfo.value = null;
                    isValidToken.value = false;
                    loginDialog.value = false;
                    tab.value = 0;
                } else {
                    console.error("유저 정보 없음!!!!");
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const check = (userId) => {

        idDupCheck(
            userId,
            (response) => {
                if (response.data.Check) {
                    console.log('아이디 중복');
                    canUseId.value = false;
                } else {
                    console.log("아이디 사용 가능");
                    canUseId.value = true;
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const userSignUp = (user) => {

        signUp(
            user,
            (response) => {
                if (response.data.message == 'success') {
                    console.log('회원가입 성공');
                    signUpDialog.value = false;
                } else {
                    console.log('회원가입 실패');
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const userUpdatePwd = (newPwd) => {
        const user = {
            userId: userInfo.value.userId,
            userPwd: newPwd
        }
        updatePwd(
            user,
            (response) => {
                if (response.data.message == 'success') {
                    console.log('비밀번호 변경 성공');
                    userInfo.value.userPwd = user.userPwd;
                } else {
                    console.log('비밀번호 변경 실패');
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const userUpdate = (user) => {

        updateUser(
            user,
            (response) => {
                if (response.data.message == 'success') {
                    console.log('회원정보 변경 성공');
                    userInfo.value.userName = user.userName;
                    userInfo.value.emailId = user.emailId;
                    userInfo.value.emailDomain = user.emailDomain;
                } else {
                    console.log('회원정보 변경 실패');
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const userSignOut = (userId) => {

        deleteUser(
            userId,
            (response) => {
                if (response.data.message == 'success') {
                    console.log('회원탈퇴 성공');
                    isLogin.value = false;
                    userInfo.value = null;
                    tab.value = 0;
                    loginDialog.value = false;
                } else {
                    console.log('회원탈퇴 실패');
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const userDelete = (userId) => {

        deleteUsers(
            userId,
            async (response) => {
                if (response.data.message == 'success') {
                    console.log('회원삭제 성공');
                    await getAllUser();
                } else {
                    console.log('회원삭제 실패');
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };


    return {
        loginDialog,
        signUpDialog,
        isLogin,
        isLoginError,
        userInfo,
        isValidToken,
        canUseId,
        tab,
        users,
        userLogin,
        getUserInfo,
        tokenRegenerate,
        userLogout,
        check,
        userSignUp,
        userUpdatePwd,
        userUpdate,
        userSignOut,
        getAllUser,
        userDelete,
    };
},
    {
        persist: {
            storage: sessionStorage
        },
    },)