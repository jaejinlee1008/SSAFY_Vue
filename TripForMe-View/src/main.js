
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from './App.vue'
import router from './router'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as styles from 'vuetify/styles'

const app = createApp(App)
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
const vuetify = createVuetify({
  components,
  directives,
  styles
})

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
