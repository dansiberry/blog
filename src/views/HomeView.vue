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
        <div class="container py-12 flex items-center">
            <div class="text-center md:text-left">
                <h1 class="underline decoration-cyan-300 text-4xl leading-10 md:leading-[60px] font-bold md:text-[60px]">Welcome to the computer science blog.</h1>
                <RouterLink to="/search" class="button mt-8 md:mt-14">Browse Articles</RouterLink>
            </div>
            <img class="hidden md:block w-[350px] lg:w-[500px] flex-shrink-0" src="https://s3.eu-west-3.amazonaws.com/blog-assets-2468/istockphoto-1050049486-612x612.jpg" alt="">
        </div>
        <div class="min-h-[350px] pb-8 pt-20 bg-gray-100" :class="{ loading: store.loading }">
            <h2 class="h1 container mb-4">Latest articles</h2>
            <div v-if="!store.loading" class="container py-8">
                <CardList :articles="store.articles.slice(0, 3)" />
            </div>
        </div>
    </main>
</template>
