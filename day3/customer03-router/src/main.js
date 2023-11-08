import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

app.use(router)

//import 한 axios 객체를 component 전역에서 사용 가능하도록 등록 
app.config.globalProperties.axios = axios
app.config.globalProperties.code = 'london'

app.mount('#app')
