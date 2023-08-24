import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initStore } from "./store";
const initApp = async () => {
   const app =  createApp(App)
   // 设置项目中的全局状态管理
    initStore(app)
    app.mount('#app')
}
initApp()
