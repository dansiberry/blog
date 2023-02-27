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
        <div class="container flex items-center py-12">
            <div class="text-center md:text-left">
                <h1
                    class="text-4xl font-bold leading-10 underline decoration-cyan-300 md:text-[60px] md:leading-[60px]"
                >
                    Welcome to the computer science blog.
                </h1>
                <RouterLink to="/search" class="button mt-8 md:mt-14">Browse Articles</RouterLink>
            </div>
            <img
                class="hidden w-[350px] flex-shrink-0 md:block lg:w-[500px]"
                src="https://s3.eu-west-3.amazonaws.com/blog-assets-2468/istockphoto-1050049486-612x612.jpg"
                alt=""
            />
        </div>
        <div class="min-h-[350px] bg-gray-100 pb-8 pt-20" :class="{ loading: store.loading }">
            <h2 class="h1 container mb-4">Latest articles</h2>
            <div v-if="!store.loading" class="container py-8">
                <CardList :articles="store.articles.slice(0, 3)" />
            </div>
        </div>
    </main>
</template>
