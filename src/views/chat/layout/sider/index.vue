<script setup lang="ts">
import { computed, ref, watch } from 'vue'
// import { useAppStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
// 组件
import List from './List.vue'
// import { t } from '@/locales'

// const appStore = useAppStore()
// const chatStore = useChatStore()

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
//   chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false })
  if (isMobile.value)
  return true;
//   appStore.setSiderCollapsed(true)
}
</script>

<template>
    <a-layout-sider>
      <div class="flex flex-col h-full" :style="mobileSafeArea">
        <main class="flex flex-col flex-1 min-h-0">
          <div class="p-4">
              <a-button dashed block @click="handleAdd">
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
