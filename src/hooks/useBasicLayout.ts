// breakpointsTailwind是一个对象，其中包含了TailwindCSS中定义的所有断点。 useBreakpoints是一个高阶组件，它接受一个断点对象并返回一个包含当前屏幕匹配哪些断点的对象。
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
// 用于检测设备是否为移动端的hook函数
export function useBasicLayout() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  //判断是否是移动端
  const isMobile = breakpoints.smaller('sm')
  return { isMobile }
}
