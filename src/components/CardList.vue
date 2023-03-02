<script setup lang="ts">
import type { Article } from '@/types';
import { ref, computed } from 'vue';
import Card from '@/components/BlogCard.vue';
import PaginationButtons from '@/components/PaginationButtons.vue';

const props = defineProps<{
    articles: Article[];
}>();

const activePage = ref(1);

const totalPages = computed(() => {
    return Math.ceil(props.articles.length / 6);
});

const paginatedCards = computed(() => {
    const base = (activePage.value - 1) * 6;
    return props.articles.slice(base, base + 6);
});
</script>

<template>
    <div class="">
        <div class="CardList grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <RouterLink
                v-for="article in paginatedCards"
                :key="article.id"
                :to="{ name: 'article', params: { slug: article.slug } }"
            >
                <Card :article="article" class="shadow-lg" />
            </RouterLink>
        </div>
        <PaginationButtons
            v-if="totalPages > 1"
            :active-page="activePage"
            :total-pages="totalPages"
            class="my-12"
            @set-page="activePage = $event"
        />
    </div>
</template>
