import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'
import { initStore } from "./store";
import { setupRouter } from './router'
import { initAssets, initScrollbarStyle } from './plugins'

const initApp = async () => {
   const app =  createApp(App)
    // 通过 setupAssets 函数设置项目中的静态资源
    initAssets()
   // 设置项目中的全局状态管理
    initStore(app)
    app.use(Antd)
    await setupRouter(app)
    app.mount('#app')
}
initApp()
