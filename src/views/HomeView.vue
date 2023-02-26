<script setup lang="ts">
import CardList from '@/components/CardList.vue';
import { onBeforeMount } from 'vue';
import { useArticlesStore } from '@/stores/articles';

const store = useArticlesStore();

onBeforeMount(() => {
    store.fetchArticles(9);
});
</script>

<template>
    <main>
        <h1 class="h1 container mb-8 mt-14">Latest articles</h1>
        <div class="min-h-[350px] bg-gray-100" :class="{ loading: store.loading }">
            <div v-if="!store.loading" class="container py-8">
                <CardList :articles="store.articles.slice(0, 3)" />
            </div>
        </div>
    </main>
</template>
