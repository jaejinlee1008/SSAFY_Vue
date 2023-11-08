import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

//router 객체를 전역 객체로 등록 : 모든 컴포넌트에서 사용 가능
app.use(router)

app.mount('#app')
