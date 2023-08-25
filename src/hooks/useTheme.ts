// import type { GlobalThemeOverrides } from 'naive-ui'
import { computed, watch } from 'vue'
import { theme } from 'ant-design-vue';
// import { useAppStore } from '../store'
// import { darkTheme, useOsTheme } from 'naive-ui'
const { darkAlgorithm, defaultAlgorithm, defaultSeed } = theme;

export function useTheme() {
    console.log(darkAlgorithm,defaultAlgorithm)
//   const appStore = useAppStore()
    const appStore = {
        theme:'dark'
    }
//   const OsTheme = defaultAlgorithm
//   const isDark = computed(() => {
//     if (appStore.theme === 'auto')
//       return 'dark'
//     else
//       return darkAlgorithm
//   })

  const themeStyle = computed(() => {
    return {
        'algorithm':appStore.theme === 'dark' ? darkAlgorithm : defaultAlgorithm
    }
  })
  
  const themeOverrides = {}
//   const themeOverrides = computed<GlobalThemeOverrides>(() => {
//     if (isDark.value) {
//       return {
//         common: {},
//       }
//     }
//     return {}
//   })

//   watch(
//     () => isDark.value,
//     (dark) => {
//       if (dark)
//         document.documentElement.classList.add('dark')
//       else
//         document.documentElement.classList.remove('dark')
//     },
//     { immediate: true },
//   )

  return { themeStyle, themeOverrides }
}
