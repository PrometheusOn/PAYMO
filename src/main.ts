import { createApp } from 'vue'
import './style.css'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueTheMask from 'vue-the-mask'
import App from './App.vue'

const app = createApp(App)

app
  .use(router)
  .use(ElementPlus)
  .use(VueTheMask)
app.mount('#app')