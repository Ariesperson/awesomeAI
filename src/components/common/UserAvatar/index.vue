<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/store'
import defaultAvatar from '@/assets/avatar.jpg'
import { isString } from '@/utils/is'

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

</script>
<template>
    <div class="flex items-center overflow-hidden">
        <div class="w-10 h-10 overflow-hidden rounded-full shrink-0">
            <template v-if="isString(userInfo.avatar) && userInfo.avatar.length > 0">
                <a-avatar
                size="large"
                round
                :src="userInfo.avatar"
                />
            </template>
            <template v-else>
                <a-avatar size="large" round :src="defaultAvatar" />
            </template>
        </div>
    </div>
</template>