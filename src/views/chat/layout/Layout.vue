<script setup lang="ts">
import { computed } from 'vue'
// import { NLayout, NLayoutContent } from 'naive-ui'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useRouter } from 'vue-router'
import Sider from './sider/index.vue'
import { useAppStore,useChatStore } from '@/store'

const router = useRouter()
const appStore = useAppStore()
const chatStore = useChatStore()
router.replace({ name: 'Chat', params: { uuid: chatStore.active } })

const { isMobile } = useBasicLayout()
const collapsed = computed(() => appStore.siderCollapsed)

const getMobileClass = computed(() => {
  if (isMobile.value)
  return ['rounded-none', 'shadow-none']
  return ['border', 'rounded-md', 'shadow-md', 'dark:border-neutral-800']
})
const getContainerClass = computed(() => {
    return [
    'h-full',
    // { 'pl-[260px]': !isMobile.value && !collapsed.value },
  ]
})
</script>

<template>
    <div class="h-full dark:bg-[#24272e] transition-all" :class="[isMobile ? 'p-0' : 'p-4']">
        <div class="h-full overflow-hidden w-full" :class="getMobileClass" >
            <a-layout class="z-40 transition" :class="getContainerClass">
                <Sider />
                    <RouterView v-slot="{ Component, route }">
                        <a-layout-content style="width: 1000px;" class="h-full w-full">
                            <component :is="Component" :key="route.fullPath" />
                        </a-layout-content>
                    </RouterView>
            </a-layout>
        </div>
    </div>
</template>

<style scoped>
</style>
