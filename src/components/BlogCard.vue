<script setup lang="ts">
import type { Article } from '@/types';
import { computed } from 'vue';
import CategoryList from '@/components/CategoryList.vue';
import { formatDate } from '@/utils';

const props = defineProps<{
    article: Article;
}>();

const dateFormatted = computed(() => {
    return formatDate(props.article.createdAt);
});
</script>

<template>
    <div class="BlogCard">
        <div class="relative h-32 md:h-44">
            <img class="lazyload absolute h-full w-full object-cover object-center" :src="article.imageSmallUrl" alt="" />
            <div
                class="BlogCard__bar absolute bottom-0 left-0 h-0 w-full bg-cyan-500 transition-all duration-300"
            ></div>
        </div>
        <div class="relative bg-white px-8 py-6 md:min-h-[200px]">
            <CategoryList :categories="article.categories" class="text-xs md:text-sm" />
            <h3 class="mb-3 mt-4 text-lg font-bold leading-tight">{{ article.title }}</h3>
            <span class="mt-4 text-sm font-bold text-gray-400">{{ dateFormatted }}</span>
        </div>
    </div>
</template>

<style scoped>
.BlogCard:hover .BlogCard__bar {
    @apply h-1;
}
</style>
