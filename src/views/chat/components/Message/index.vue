<script setup lang="ts">
import { computed, ref } from 'vue'
import AvatarComponent from './Avatar.vue'
import TextComponent from './Text.vue'
//定义组件Props属性
interface Props {
  dateTime?: string
  text?: string
  inversion?: boolean
  error?: boolean
  loading?: boolean
}
//定义事件
interface Emit {
  (ev: 'regenerate'): void
  (ev: 'delete'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const asRawText = ref(props.inversion)

const messageRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()

</script>

<template>
    <div ref="messageRef" class="flex w-full mb-6 overflow-hidden" :class="[{ 'flex-row-reverse': inversion }]">
        <div class="flex items-center justify-center flex-shrink-0 h-8 overflow-hidden rounded-full basis-8">
            <AvatarComponent :image="inversion" />
        </div>
        <div class=" overflow-hidden text-sm" :class="[inversion ? 'items-end' : 'items-start']">
            <p class="text-xs text-[#b4bbc4]" :class="[inversion ? 'text-right' : 'text-left']">
                {{ dateTime }}
            </p>
            <div class="flex items-end gap-1 mt-2" :class="[inversion ? 'flex-row-reverse' : 'flex-row']">
                <TextComponent
                    ref="textRef"
                    :inversion="inversion"
                    :error="error"
                    :text="text"
                    :loading="loading"
                    :as-raw-text="asRawText"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
