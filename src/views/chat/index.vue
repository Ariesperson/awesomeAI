<script setup lang="ts">
import { computed, ref, watch } from 'vue'
// import { useBasicLayout } from '@/hooks/useBasicLayout'
// const { isMobile } = useBasicLayout()
const mobileSafeArea = computed(() => {
//   if (isMobile.value) {
//     return {
//       paddingBottom: 'env(safe-area-inset-bottom)',
//     }
//   }
  return {}
})
</script>

<template>
    <div>
       <div class="flex flex-col h-full" :style="mobileSafeArea">
            <main class="flex flex-col flex-1 min-h-0">
                <div class="p-4">
                <NButton dashed block @click="handleAdd">
                    {{ $t('chat.newChatButton') }}
                </NButton>
                </div>
                <div class="flex-1 min-h-0 pb-4 overflow-hidden">
                <List />
                </div>
                <div class="p-4">
                <NButton block @click="show = true">
                    {{ $t('store.siderButton') }}
                </NButton>
                </div>
            </main>
        <!-- <Footer /> -->
        </div>
    </div>
</template>

<style scoped>
</style>
