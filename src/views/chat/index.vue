<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useChatStore } from '@/store'
import { useRoute } from 'vue-router'
import { Message } from './components'


const { isMobile } = useBasicLayout()
const chatStore = useChatStore()
const route = useRoute()
//路由获取uuid
const { uuid } = route.params as { uuid: string }

const dataSources = computed(() => chatStore.getChatByUuid(+uuid))

</script>

<template>
    <div class="flex flex-col w-full h-full">
        <!-- <header>header</header> -->
        <main class="flex-1 overflow-hidden">
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
                        222
                    </div>
                </template>
            </div>
        </main>
        <footer>footer</footer>
    </div>
</template>

<style scoped>
</style>
