import { computed } from 'vue'
import { message } from 'ant-design-vue'
import { t } from '@/locales'
import { useChatStore } from '@/store'

export function useUsingContext() {

    const chatStore = useChatStore()
    const usingContext = computed<boolean>(() => chatStore.usingContext)
  
    function toggleUsingContext() {
      //设置上下文并且传入
      chatStore.setUsingContext(!usingContext.value)
      if (usingContext.value)
      message.success(t('chat.turnOnContext'))
      else
      message.warning(t('chat.turnOffContext'))
    }
  
    return {
      usingContext,
      toggleUsingContext,
    }
  }
  