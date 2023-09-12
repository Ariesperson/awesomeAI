import { ss } from '@/utils/storage'

const LOCAL_NAME = "userStorage"

// 用户信息
export interface UserInfo {
     // 用户头像链接
    avatar?: string;
    // 用户姓名
    name?: string;
    // 用户描述
    description?: string;
}
// 用户状态
export interface UserState {
    // 用户信息
    userInfo?: UserInfo;
}
// 默认设置
export function defaultSetting (): UserState {
    return {
        userInfo:{
            avatar: 'https://avatars.githubusercontent.com/u/29877580?v=4',
            name: 'GuluGulu',
            description: 'Star on <a href="https://github.com/Ariesperson/awesomeAI" class="text-blue-500" target="_blank" >GitHub</a>',
        }
    }
}
export function getLocalState(): UserState {
    const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
    return { ...defaultSetting(), ...localSetting }
  }
  
export function setLocalState(setting: UserState): void {
    ss.set(LOCAL_NAME, setting)
}