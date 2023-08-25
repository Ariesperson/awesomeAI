// import 'katex/dist/katex.min.css'
import '@/styles/lib/tailwind.css'
import '@/styles/lib/highlight.less'
import '@/styles/lib/github-markdown.less'
import '@/styles/global.less'

/** Tailwind's Preflight Style Override */
function naiveStyleOverride() {
//   const meta = document.createElement('meta')
//   meta.name = 'naive-ui-style'
//   document.head.appendChild(meta)
}

function initAssets() {
  naiveStyleOverride()
}

export default initAssets
