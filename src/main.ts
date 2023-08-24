import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'
import { initStore } from "./store";
import { setupRouter } from './router'
const initApp = async () => {
   const app =  createApp(App)

   // 设置项目中的全局状态管理
    initStore(app)
    app.use(Antd)
    app.mount('#app')
    await setupRouter(app)
}
initApp()
