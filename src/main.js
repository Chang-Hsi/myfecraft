// src/main.js
import './style.css'
import 'swiper/css'

import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import { createApp } from 'vue'

// 這行改成從 'unhead' 匯入 createHead（重點只改這一行）
import { createHead } from '@unhead/vue/client'

import App from './App.vue'
import router from '@/router'
import MasonryWall from '@yeger/vue-masonry-wall'

import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
import 'primeicons/primeicons.css'

const app = createApp(App)
const head = createHead() // 啟用 head 管理（動態 <title>/<meta>/OG/JSON-LD）

app.component('Button', Button)
app.component('InputText', InputText)
app.component('RadioButton', RadioButton)

app.use(createPinia())
app.use(router)
app.use(MasonryWall)
app.use(MotionPlugin)
app.use(head)

app.use(PrimeVue, { theme: { preset: Aura } })

app.mount('#app')
