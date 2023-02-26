<script setup lang="ts">
import type { Category } from '@/types';
defineProps<{
    categories: Category[];
    activeId?: number;
    interactive?: boolean;
}>();
</script>

<template>
    <ul class="">
        <li
            v-for="category in categories"
            :key="category.id"
            class="mr-2 mb-3 inline-block rounded-full border border-cyan-500 py-1 px-2 text-sm"
            :class="[
                activeId === category.id || !interactive ? 'bg-cyan-500 text-white' : 'text-cyan-500',
                interactive && 'cursor-pointer'
            ]"
            @click="$emit('categoryClick', category.id)"
        >
            {{ category.title }}
        </li>
    </ul>
</template>
