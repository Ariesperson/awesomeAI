import type { App } from 'vue'
// 引入全局状态机
import { store } from './helper'

export function initStore(app: App) {
  app.use(store)
}

export * from './modules'
