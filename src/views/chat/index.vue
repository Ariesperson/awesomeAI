<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useChatStore } from '@/store'
import { useRoute } from 'vue-router'
import { Message } from './components'
import { useScroll } from './hooks/useScroll'
import { useChat } from './hooks/useChat'
import { useUsingContext } from './hooks/useUsingContext'
import { HoverButton,SvgIcon } from '@/components/common'
import { t } from '@/locales'
import { fetchChatAPIProcess } from '@/api'
import { storeToRefs } from 'pinia'

let controller = new AbortController()

const openLongReply = import.meta.env.VITE_GLOB_OPEN_LONG_REPLY === 'true'

const { isMobile } = useBasicLayout()
//定义滚动区域
const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll()

const chatStore = useChatStore()
const route = useRoute()
// const ms = useMessage()

// 获取对话所需hooks方法
const { addChat, updateChat, updateChatSome, getChatByUuidAndIndex } = useChat()
// 获取上下文相关信息 
const { usingContext, toggleUsingContext } = useUsingContext()
//路由获取uuid
const { uuid } = route.params as { uuid: string }

const dataSources = computed(() => chatStore.getChatByUuid(+uuid))
// 定义对话列表
const conversationList = computed(() => dataSources.value.filter(item => (!item.inversion && !!item.conversationOptions)))

// 定义prompt
const prompt = ref<string>('')
const loading = ref<boolean>(false)

// 添加PromptStore
// const promptStore = usePromptStore()

// 使用storeToRefs，保证store修改后，联想部分能够重新渲染
// const { promptList: promptTemplate } = storeToRefs<any>(promptStore)
// const addChat

// 确认发送
const handleSubmit = () => {
  onConversation()
}

// 开始对话
const onConversation = async () => {
    // 获取prompt 
    let message = prompt.value
    // 加载中时不处理新的对话任务
    if (loading.value)
    return
    //prompt为空时不回答该问题
    if (!message || message.trim() === '')
    return

    //添加对话
    addChat(
        +uuid,
        {
        dateTime: new Date().toLocaleString(),
        text: message,
        inversion: true,
        error: false,
        conversationOptions: null,
        requestOptions: { prompt: message, options: null },
        },
    )
    //滚动到对话底部
    scrollToBottom()

    loading.value = true
    prompt.value = ''
    
    // 定义请求对话接口的参数
    let options: Chat.ConversationRequest = {}
    // 获取存储的历史上下文
    const lastContext = conversationList.value[conversationList.value.length - 1]?.conversationOptions
    // 如果拿到了上下文
    if (lastContext && usingContext.value)
    options = { ...lastContext }
    // 拿到上下文之后添加chat对话记录
    addChat(
    +uuid,
        {
        dateTime: new Date().toLocaleString(),
        text: '',
        loading: true,
        inversion: false,
        error: false,
        conversationOptions: null,
        requestOptions: { prompt: message, options: { ...options } },
        },
    )
    //滚动到底部
    scrollToBottom()
    //准备工作就绪，接下来要请求AI的接口返回对话数据
    let lastText = ''
    try {
        const fetchChatAPIOnce = async () => {
            // return '我是您的AI小助手'
            // await fetchChatAPIProcess<Chat.ConversationResponse>({
            //     prompt: message,
            //     options,
            //     signal: controller.signal,
            //     onDownloadProgress: ({ event }) => {
            //         const xhr = event.target
            //         const { responseText } = xhr
            //         // Always process the final line
            //         const lastIndex = responseText.lastIndexOf('\n', responseText.length - 2)
            //         let chunk = responseText
            //         if (lastIndex !== -1)
            //             chunk = responseText.substring(lastIndex)
       
            //     },
            // })
            try {
              
                // const data = JSON.parse(chunk)
                let data = {
                    text:'我是您的AI小助手',
                    conversationId:'1',
                    parentMessageId:'1',
                    id:'1'
                }
                updateChat(
                    +uuid,
                    dataSources.value.length - 1,
                    {
                        dateTime: new Date().toLocaleString(),
                        text: lastText + (data.text ?? ''),
                        inversion: false,
                        error: false,
                        loading: true,
                        conversationOptions: { conversationId: data.conversationId, parentMessageId: data.id },
                        requestOptions: { prompt: message, options: { ...options } },
                    },
                )
                if (openLongReply && data.detail.choices[0].finish_reason === 'length') {

                    options.parentMessageId = data.id
                    lastText = data.text
                    message = ''
                    return fetchChatAPIOnce()
                    
                }
                scrollToBottomIfAtBottom()
            }
            catch (error) {
                //
            }
            updateChatSome(+uuid, dataSources.value.length - 1, { loading: false })
        }
        fetchChatAPIOnce()
    } catch (error) {
        console.log(error)
    }

}

//清除对话记录
const handleClear = () => {
    console.log("清除对话记录")
}

//处理下载为图片
const handleExport = () => {
    console.log("导出为图片")
}

// footer class
const footerClass = computed(() => {
  let classes = ['p-4']
  if (isMobile.value)
    classes = ['sticky', 'left-0', 'bottom-0', 'right-0', 'p-2', 'pr-3', 'overflow-hidden']
  return classes
})
// 定义placeholder
const placeholder = computed(() => {
  if (isMobile.value)
    return t('chat.placeholderMobile')
  return t('chat.placeholder')
})

// 可优化部分
// 搜索选项计算，这里使用value作为索引项，所以当出现重复value时渲染异常(多项同时出现选中效果)
// 理想状态下其实应该是key作为索引项,但官方的renderOption会出现问题，所以就需要value反renderLabel实现
// const searchOptions = computed(() => {
//   if (prompt.value.startsWith('/')) {
//     return promptTemplate.value.filter((item: { key: string }) => item.key.toLowerCase().includes(prompt.value.substring(1).toLowerCase())).map((obj: { value: any }) => {
//       return {
//         label: obj.value,
//         value: obj.value,
//       }
//     })
//   }
//   else {
//     return []
//   }
// })

//定义回车键确认时间
const handleEnter = (event: KeyboardEvent) => {
    debugger;
    if (!isMobile.value) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }
  else {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault()
      handleSubmit()
    }
  }
}
</script>

<template>
    <div class="flex flex-col w-full h-full">
        <!-- <header>header</header> -->
        <main class="flex-1 overflow-hidden">
            <div id="scrollRef" ref="scrollRef" class="h-full overflow-hidden overflow-y-auto">
                <div id="image-wrapper" class="w-full max-w-screen-xl m-auto dark:bg-[#101014]"
                :class="[isMobile?'p-2':'p-4']"
                >
                    <template v-if="!dataSources.length">
                        <div>
                            暂无信息
                        </div>
                    </template>
                    <template v-else>
                        <div>
                            <Message
                                v-for="(item, index) of dataSources"
                                :key="index"
                                :date-time="item.dateTime"
                                :text="item.text"
                                :inversion="item.inversion"
                                :error="item.error"
                                :loading="item.loading"
                            />
                        </div>
                    </template>
                </div>
            </div>
        </main>
        <footer :class="footerClass">
            <div class="w-full max-w-screen-xl m-auto">
                <div class="flex items-center justify-between space-x-2">
                    <HoverButton v-if="!isMobile" @click="handleClear">
                        <span class="text-xl text-[#4f555e] dark:text-white">
                        <SvgIcon icon="ri:delete-bin-line" />
                        </span>
                    </HoverButton>
                    <HoverButton v-if="!isMobile" @click="handleExport">
                        <span class="text-xl text-[#4f555e] dark:text-white">
                        <SvgIcon icon="ri:download-2-line" />
                        </span>
                    </HoverButton>
                    <HoverButton @click="toggleUsingContext">
                        <span class="text-xl" :class="{ 'text-[#4b9e5f]': usingContext, 'text-[#a8071a]': !usingContext }">
                        <SvgIcon icon="ri:chat-history-line" />
                        </span>
                    </HoverButton>
                    <a-auto-complete class="flex-grow" v-model:value="prompt" >
                        <template #default>
                        <a-input
                            ref="inputRef"
                            v-model:value="prompt"
                            :placeholder="placeholder"
                            :auto-size="{ minRows: 1, maxRows: isMobile ? 4 : 8 }"
                            type="textarea"
                            @pressEnter="handleEnter"
                        />
                        </template>
                    </a-auto-complete>
                    <a-button type="primary"  @click="handleSubmit">
                        <template #icon>
                        <span class="dark:text-black">
                            <SvgIcon icon="ri:send-plane-fill" />
                        </span>
                        </template>
                    </a-button>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
</style>
