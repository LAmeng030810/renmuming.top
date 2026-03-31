import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'
import i18n from './i18n'
import '@/assets/styles/global.scss'
import '@/assets/styles/theme.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(i18n)
app.use(pinia)
app.use(router)

app.mount('#app')
