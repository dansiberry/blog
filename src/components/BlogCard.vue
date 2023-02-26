<script setup lang="ts">
import type { Article } from '@/types';
import { computed } from 'vue';
import CategoryList from '@/components/CategoryList.vue';

const props = defineProps<{
    article: Article;
}>();

const dateFormatted = computed(() => {
    return new Date(props.article.createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
});
</script>

<template>
    <div class="BlogCard">
        <div class="relative h-44">
            <img class="lazyload absolute h-full w-full object-cover object-center" :src="article.imageUrl" alt="" />
            <div
                class="BlogCard__bar absolute bottom-0 left-0 h-0 w-full bg-cyan-500 transition-all duration-300"
            ></div>
        </div>
        <div class="relative h-36 bg-white px-8 py-6">
            <CategoryList :categories="[article.category]" />
            <h3 class="mb-3 text-lg font-bold leading-tight">{{ article.title }}</h3>
            <span class="mt-4 text-sm font-bold text-gray-400">{{ dateFormatted }}</span>
        </div>
    </div>
</template>

<style scoped>
.BlogCard:hover .BlogCard__bar {
    @apply h-1;
}
</style>
