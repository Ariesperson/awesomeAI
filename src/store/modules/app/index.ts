import { defineStore } from 'pinia'
import type { AppState, Language, Theme } from './helper'
import { getLocalSetting, setLocalSetting } from './helper'

const useAppstore = defineStore('app-store',{
    state() {
        AppState => getLocalSetting()
    },
    actions:{

    },

})

export useAppstore