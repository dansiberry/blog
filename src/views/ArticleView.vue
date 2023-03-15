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
        <div class="container--narrow container -mt-20 mb-10">
            <div class="max-w-[900px] bg-black py-3 px-6 md:py-8 md:px-16">
                <h1 class="h1 relative z-10 inline max-w-[400px] text-white">
                    {{ article.title }}
                </h1>
            </div>
        </div>
        <div v-if="store.loading" class="loading loading--infinite h-80"></div>
        <div v-else class="container--narrow container mb-6 md:mb-14">
            <div class="items-center justify-between lg:flex">
                <div class="mb-4 flex items-center lg:mb-0">
                    <img :src="article.authorImage" class="h-20 w-20 rounded-full" alt="" />
                    <p class="ml-4 font-bold text-gray-500">{{ article.authorName }}</p>
                </div>
                <div class="items-center md:flex">
                    <CategoryList :categories="article.categories" />
                    <p class="mt-6 text-sm font-bold text-gray-500 md:ml-4 md:mt-0">{{ article.dateFormatted }}</p>
                </div>
            </div>
            <div class="wysiwyg mt-10 md:mt-20" v-html="article.fullText"></div>
        </div>
    </main>
    <div v-else class="loading loading--infinite h-80"></div>
</template>
