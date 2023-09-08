import type { Ref } from 'vue'
import { nextTick, ref } from 'vue'

type ScrollElement = HTMLDivElement | null

interface ScrollReturn {
    //scorll dome element
  scrollRef: Ref<ScrollElement>
  //滚动到最底部
  scrollToBottom: () => Promise<void>
  //滚动到顶部
  scrollToTop: () => Promise<void>

  scrollToBottomIfAtBottom: () => Promise<void>
}

export function useScroll(): ScrollReturn {
  const scrollRef = ref<ScrollElement>(null)

  const scrollToBottom = async () => {
    //使用nextTick是为了确保是在dom更新完之后
    await nextTick()
    if (scrollRef.value)
    // element的scrollTop等于scrollHeighT时就相当于滚动到底部
    scrollRef.value.scrollTop = scrollRef.value.scrollHeight
  }

  const scrollToTop = async () => {
    await nextTick()
    if (scrollRef.value)
      scrollRef.value.scrollTop = 0
  }
  //如果元素的滚动条已经到了底部，那么将其滚动到底部。
  const scrollToBottomIfAtBottom = async () => {
//  - 使用 nextTick 函数等待事件循环中的其他任务完成后再执行本次操作；
//  - 判断当前元素是否存在并获取其高度和滚动位置；
// - 通过计算剩余空间和阈值判断是否需要滚动到底部；
// - 使用 scrollTo 方法将元素滚动到底部。
    await nextTick()
    if (scrollRef.value) {
      const threshold = 100 // 阈值，表示滚动条到底部的距离阈值
      const distanceToBottom = scrollRef.value.scrollHeight - scrollRef.value.scrollTop - scrollRef.value.clientHeight
      if (distanceToBottom <= threshold)
        scrollRef.value.scrollTop = scrollRef.value.scrollHeight
    }
  }

  return {
    scrollRef,
    scrollToBottom,
    scrollToTop,
    scrollToBottomIfAtBottom,
  }
}
