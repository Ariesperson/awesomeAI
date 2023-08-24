import { defineStore } from 'pinia'
import type { AppState, Language, Theme } from './helper'
import { getLocalSetting, setLocalSetting } from './helper'
import { store } from '../../helper'

// 使用 defineStore 方法创建应用状态存储对象
export const useAppStore = defineStore('app-store',{
     // 通过提供一个状态对象来定义该存储对象的初始状态
    state: (): AppState => getLocalSetting(), // 从本地存储中读取应用的状态
    // 添加Actions
    actions:{
        // 设置主题
        setTheme(theme: Theme) {
            this.theme = theme
            this.recordState()
        },
        // 设置语言
        setLanguage(language: Language) {
            if (this.language !== language) {
              this.language = language
              this.recordState()
            }
        },
        // 设置侧边栏折叠状态
        setSiderCollapsed(collapsed: boolean) {
            this.siderCollapsed = collapsed
            // 保存当前的应用状态到本地存储
            this.recordState()
        },
        // 保存当前的应用状态到本地存储
        recordState() {
            setLocalSetting(this.$state)
        },
    },
})
// 创建一个注入该应用状态存储对象的高阶组件
export function useAppStoreWithOut() {
    return useAppStore(store)
}