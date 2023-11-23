import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";


// const userStore = useUserStore();

// const { isLogin, loginDialog } = storeToRefs(userStore);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/list',
      name: 'list',
      component: () => import("@/views/AttractionListView.vue"),
    },
    {
      path: '/insert',
      name: 'insert',
      component: () => import("@/views/AttractionInsertView.vue"),
      beforeEnter: (to, from) => {
        const userStore = useUserStore()
        const { isLogin, loginDialog, tab } = storeToRefs(userStore);
        console.log('네비게이션 가드 실행');
        if (!isLogin.value) {
          alert('로그인이 필요합니다.');
          loginDialog.value = true;
          tab.value = 0;
          return { name: 'main' }
        } else {
          console.log('로그인 되어있음');
        }
      }
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import("@/views/UserPageView.vue"),
      beforeEnter: (to, from) => {
        const userStore = useUserStore()
        const { isLogin, loginDialog, tab } = storeToRefs(userStore);
        console.log('네비게이션 가드 실행');
        if (!isLogin.value) {
          alert('로그인이 필요합니다.');
          loginDialog.value = true;
          tab.value = 0;
          return { name: 'main' }
        } else {
          console.log('로그인 되어있음');
        }
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import("@/views/AttractionDetailView.vue"),
    },
    {
      path: '/update/:id',
      name: 'update',
      component: () => import("@/views/AttractionUpdateView.vue"),
      beforeEnter: (to, from) => {
        const userStore = useUserStore()
        const { isLogin, loginDialog, tab } = storeToRefs(userStore);
        console.log('네비게이션 가드 실행');
        if (!isLogin.value) {
          alert('로그인이 필요합니다.');
          loginDialog.value = true;
          tab.value = 0;
          return { name: 'main' }
        } else {
          console.log('로그인 되어있음');
        }
      }
    }
  ]
})
// router.beforeEach((to) => {

//   const userStore = useUserStore()
//   const { isLogin, loginDialog } = storeToRefs(userStore);

//   if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
// })
export default router
