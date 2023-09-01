<script setup lang='ts'>
import { defineAsyncComponent, ref } from 'vue'
import {  UserAvatar } from '@/components/common'
import { SvgIcon } from '@/components/common'
// const Setting = defineAsyncComponent(() => import('@/components/common/Setting/index.vue'))

const show = ref(false)
</script>
<template>
    <a-footer class="flex items-center justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800">
      <div class="flex-1 flex-shrink-0 overflow-hidden">
        <UserAvatar />
      </div>
      <a-button class="p-1" @click="show = true">
        <span class="text-xl text-[#4f555e] dark:text-white">
          <SvgIcon icon="ri:settings-4-line" />
        </span>
      </a-button>
      <!-- <Setting v-if="show" v-model:visible="show" /> -->
    </a-footer>
</template>