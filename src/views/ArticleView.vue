<script setup lang="ts">
import CategoryList from '@/components/CategoryList.vue';
import { onBeforeMount, computed } from 'vue';
import { useArticlesStore } from '@/stores/articles';
import { useRoute } from 'vue-router';
import { formatDate } from '@/utils';

const route = useRoute();
const store = useArticlesStore();

onBeforeMount(() => {
    // Check if article is loaded (including the full text)
    if (article.value && article.value.fullText) return;
    // Fetch the article from the API using the slug
    store.fetchArticle(route.params.slug as string);
});

const article = computed(() => {
    const found = store.articles.find((article) => article.slug === (route.params.slug as string));
    if (!found) return null;
    // Add formatted date to the article object
    return { ...found, dateFormatted: formatDate(found.createdAt) };
});
</script>

<template>
    <main v-if="article" class="">
        <img :src="article.imageUrl" class="relative -z-10 -mt-20 h-80 w-full object-cover lg:h-[500px]" alt="" />
        <div class="container -mt-20 mb-4 md:mb-10">
            <div class="max-w-[900px] bg-black py-3 px-6 md:py-8 md:px-16">
                <h1 class="h1 relative z-10 inline max-w-[400px] text-white">
                    {{ article.title }}
                </h1>
            </div>
        </div>
        <div v-if="store.loading" class="loading loading--infinite h-80"></div>
        <div v-else class="container mb-6 md:mb-14">
            <div class="mb-10 flex items-end md:mb-20">
                <CategoryList :categories="article.categories" />
                <span class="ml-4 text-sm font-bold text-gray-400">{{ article.dateFormatted }}</span>
            </div>
            <div class="wysiwyg" v-html="article.fullText"></div>
        </div>
    </main>
    <div v-else class="loading loading--infinite h-80"></div>
</template>
