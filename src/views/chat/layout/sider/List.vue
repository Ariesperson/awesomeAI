<script setup lang="ts">
import { computed } from 'vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useAppStore, useChatStore } from '@/store'
import { SvgIcon } from '@/components/common'
import { debounce } from '@/utils/functions/debounce'

const { isMobile } = useBasicLayout()

// 获取全局状态
const appStore = useAppStore()
const chatStore = useChatStore()
//  计算属性
const dataSources = computed(() => chatStore.history)

const isActive = (uuid: number) => {
  return chatStore.active === uuid
}

const handleSelect = async ({ uuid }: Chat.History) => {

    //判断是否是正在活跃的历史对话
    if (isActive(uuid))
    return
    // 如果存在正在活跃的uui的对话
    if (chatStore.active) {
        chatStore.updateHistory(chatStore.active, { isEdit: false })
    }

    await chatStore.setActive(uuid)

    //如果是手机的话，就设置侧边栏
    if (isMobile.value)
    appStore.setSiderCollapsed(true)

}
const handleEnter = ({ uuid }: Chat.History, isEdit: boolean, event: KeyboardEvent) => {

}
const handleEdit = ({ uuid }: Chat.History, isEdit: boolean, event?: MouseEvent) => {

}
//删除会话
const handleDelete = (index: number, event?: MouseEvent | TouchEvent) => {

}
//防抖
const handleDeleteDebounce = debounce(handleDelete, 600)

const cancel = (e: MouseEvent) => {
  console.log(e);
};
</script>
<template>
    <div class="px-4">
        <div class="flex flex-col gap-2 text-sm">
            <template v-if="!dataSources.length">
                <div class="flex flex-col items-center mt-4 text-center text-neutral-300">
                <SvgIcon icon="ri:inbox-line" class="mb-2 text-3xl" />
                <span>{{ $t('common.noData') }}</span>
                </div>
            </template>
            <template v-else>
                <div v-for="(item, index) of dataSources" :key="index">
                    <a
                        class="relative flex items-center gap-3 px-3 py-3 break-all border rounded-md cursor-pointer hover:bg-neutral-100 group dark:border-neutral-800 dark:hover:bg-[#24272e]"
                        :class="isActive(item.uuid) && ['border-[#4b9e5f]', 'bg-neutral-100', 'text-[#4b9e5f]', 'dark:bg-[#24272e]', 'dark:border-[#4b9e5f]', 'pr-14']"
                        @click="handleSelect(item)">
                        <span>
                            <SvgIcon icon="ri:message-3-line" />
                        </span>
                        <div class="relative flex-1 overflow-hidden break-all text-ellipsis whitespace-nowrap">
                            <a-input v-if="item.isEdit" v-model:value="item.title" @keypress="handleEnter(item, false, $event)"/>
                            <span v-else>{{ item.title }}</span>
                        </div>
                        <div v-if="isActive(item.uuid)" class="absolute z-10 flex visible right-1">
                            <template v-if="item.isEdit">
                                <a-button class="p-1" @click="handleEdit(item, false, $event)">
                                <SvgIcon icon="ri:save-line" />
                                </a-button>
                            </template>
                            <template v-else>
                                <button class="p-1">
                                    <SvgIcon icon="ri:edit-line" @click="handleEdit(item, true, $event)" />
                                </button>
                                <a-popconfirm :title="$t('chat.deleteHistoryConfirm')" 
                                    ok-text="Yes" 
                                    cancel-text="No"
                                    @confirm="handleDeleteDebounce(index, $event)">
                                    <button class="p-1">
                                        <SvgIcon icon="ri:delete-bin-line" @click="handleEdit(item, true, $event)" />
                                    </button>
                                </a-popconfirm>
                            </template>
                        </div>
                    </a>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
</style>
