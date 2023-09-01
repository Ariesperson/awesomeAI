import { defineStore } from "pinia";
import type { UserInfo, UserState } from './helper'
import { defaultSetting, getLocalState, setLocalState } from "./helper";

export const useUserStore = defineStore("user-store", {
    state: (): UserState => getLocalState(),
    actions: {
        /**
         * 更新用户信息
         */
        updateUserInfo(userInfo:Partial<UserInfo>) {
            this.userInfo = {...this.userInfo,...userInfo}
            this.recordState()
        },
         /**
         * 重置用户信息
         */
        resetUserInfo() {
            this.userInfo = {...defaultSetting().userInfo}
            this.recordState()
        },
        /**
         * 记录状态
         */
        recordState() {
            setLocalState(this.$state)
        }
    },
});