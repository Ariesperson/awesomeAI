<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, ref, watch } from 'vue'
import { useAppStore,useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
// 组件
import List from './List.vue'

const appStore = useAppStore()
const chatStore = useChatStore()

//定义响应式变量
const collapsed = computed(() => appStore.siderCollapsed)
const show = ref(false)


const { isMobile } = useBasicLayout()

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    }
  }
  return {}
})
function handleAdd() {
  chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false })
  if (isMobile.value)
  appStore.setSiderCollapsed(true)
  return true;
}
const getMobileClass = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50,
    }
  }
  return {}
})

</script>

<template>
    <a-layout-sider style="background-color: white;"  :collapsed="collapsed" :style="getMobileClass" :width="260" :trigger="isMobile ? false : 'arrow-circle'">
      <div class="flex flex-col h-full" :style="mobileSafeArea">
        <main class="flex flex-col flex-1 min-h-0">
          <div class="p-4">
              <a-button type="dashed" block @click="handleAdd">
                  {{ $t('chat.newChatButton') }}
              </a-button>
          </div>
          <div class="flex-1 min-h-0 pb-4 overflow-hidden">
            <List />
          </div>
          <div class="p-4">
              <a-button block @click="show = true">
                  {{ $t('store.siderButton') }}
              </a-button>
          </div>
        </main>
        <!-- <Footer /> -->
      </div>
    </a-layout-sider>
</template>

<style scoped>
</style>
