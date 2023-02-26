<script setup lang="ts">
import CategoryList from '@/components/CategoryList.vue';
import { onBeforeMount, computed } from 'vue';
import { useArticlesStore } from '@/stores/articles';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useArticlesStore();

onBeforeMount(() => {
    if (article.value && article.value.fullText) return;
    console.log(store.articles.length);
    store.fetchArticle(route.params.slug as string);
});

const article = computed(() => {
    return store.articles.find((article) => article.slug === (route.params.slug as string));
});
</script>

<template>
    <main v-if="article" class="">
        <img :src="article.imageUrl" class="relative -z-10 -mt-20 h-80 w-full object-cover" alt="" />
        <div class="container -mt-8">
            <h1 class="h1 relative z-10 mb-4 inline max-w-[400px] bg-black p-4 text-white md:mb-10">
                {{ article.title }}
            </h1>
        </div>
        <div v-if="store.loading" class="loading loading--infinite h-80"></div>
        <div v-else class="container mt-14">
            <CategoryList :categories="[article.category]" class="mb-20 mt-4" />
            <div class="wysiwyg">
                <h2>Lorum ipsom dolor&nbsp;ipsom dolor ipsom dolor</h2>
                <p>
                    ipsom dolor ipsom <a href="/">dolor</a> ipsom dolor ipsom <strong>dolor </strong>ipsom dolor ipsom
                    dolor ipsom dolor ipsom dolor ipsom dolor ipsom dolor ipsom dolor ipsom dolor ipsom dolor ipsom
                    dolor ipsom dolor ipsom dolor ipsom dolor ipsom dolor ipsom dolor ipsom dolor ipsom dolor ipsom
                    dolor ipsom dolor ipsom dolor <br />
                </p>
                <ul>
                    <li>ipsom dolor&nbsp;</li>
                    <li>ipsom dolor&nbsp;</li>
                    <li>ipsom dolor</li>
                </ul>
                <figure>
                    <img
                        src="https://assets-stage.healthpartners.com.au/marketing/images/landing-page-banner-image.png#asset:142679"
                        data-image="142679"
                    />
                </figure>
            </div>
            <!-- <p>{{ article.fullText }}</p> -->
        </div>
    </main>
    <div v-else class="loading loading--infinite h-80"></div>
</template>
