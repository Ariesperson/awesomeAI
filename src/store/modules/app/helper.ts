import { ss } from '../../../utils/storage'
// 定义本地存储的键名
const LOCAL_NAME = 'appSetting'

// 定义主题类型
export type Theme = 'light' | 'dark' | 'auto'
// 定义语言类型
export type Language = 'zh-CN' | 'zh-TW' | 'en-US' | 'ko-KR' | 'ru-RU'

// 定义应用状态接口
export interface AppState {
  siderCollapsed: boolean
  theme: Theme
  language: Language
}
// 默认应用设置
export function defaultSetting(): AppState {
  return { siderCollapsed: false, theme: 'light', language: 'zh-CN' }
}
// 从本地存储获取应用设置
export function getLocalSetting(): AppState {
  const localSetting: AppState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}
// 将应用设置保存到本地存储
export function setLocalSetting(setting: AppState): void {
  ss.set(LOCAL_NAME, setting)
}
