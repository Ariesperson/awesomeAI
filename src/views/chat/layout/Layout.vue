<script setup lang="ts">
console.log("layout index")

// import { computed } from 'vue'
// import { NLayout, NLayoutContent } from 'naive-ui'
import { useRouter } from 'vue-router'
import Sider from './sider/index.vue'
const router = useRouter()
// router.replace({ name: 'Chat', params: { uuid: chatStore.active } })
router.replace({ name: 'Chat' })
</script>

<template>
    <div>
        <Sider />
    </div>
</template>

<style scoped>
</style>
