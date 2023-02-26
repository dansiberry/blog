<script setup lang="ts">
import { onBeforeMount, computed, ref } from 'vue';
import { useArticlesStore } from '@/stores/articles';
import CategoryList from '@/components/CategoryList.vue';
import CardList from '@/components/CardList.vue';

const store = useArticlesStore();

onBeforeMount(() => {
    if (!store.articles.length) {
        store.fetchArticles(9);
    }
    if (!store.categories.length) {
        store.fetchCategories();
    }
});

const activeCategoryId = ref(-1);

const orderBy = ref('Date Desc.');

const searchTerm = ref('');

const fetchArticles = () => {
    const category = activeCategoryId.value === -1 ? '' : activeCategoryId.value;
    store.fetchArticles(50, category, searchTerm.value);
};

const updateCateogory = (id: number) => {
    activeCategoryId.value = activeCategoryId.value === id ? -1 : id;
    fetchArticles();
};

const orderedArticles = computed(() => {
    return [...store.articles].sort((a, b) => {
        if (orderBy.value === 'Title') {
            return a.title > b.title ? 1 : -1;
        } else if (orderBy.value === 'Date Desc.') {
            return a.createdAt > b.createdAt ? -1 : 1;
        } else if (orderBy.value === 'Date Asc.') {
            return a.createdAt > b.createdAt ? 1 : -1;
        }
    });
});
</script>

<template>
    <main v-if="store.categories.length && orderedArticles.length">
        <div class="container">
            <h1 class="h1 mt-20 mb-12">Browse articles</h1>
            <div class="flex justify-between">
                <div class="">
                    <h5 class="h5 mb-3">Search</h5>
                    <div class="mb-6">
                        <input type="text" v-model="searchTerm" class="h-9 w-64" @keyup.enter="fetchArticles" />
                        <button class="button button--small ml-3" @click="fetchArticles">Submit</button>
                    </div>
                    <h5 class="h5 mb-3">Categories</h5>
                    <CategoryList
                        :categories="store.categories"
                        class="mb-8"
                        :interactive="true"
                        :active-id="activeCategoryId"
                        @category-click="updateCateogory"
                    />
                </div>
                <div class="">
                    <h5 class="h5 mb-3">Order by</h5>
                    <select v-model="orderBy">
                        <option>Date Desc.</option>
                        <option>Date Asc.</option>
                        <option>Title</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="bg-gray-100 py-14">
            <h4 v-if="!activeCategoryId" class="h4 container text-gray-500">Recent articles...</h4>
            <CardList :articles="orderedArticles" class="container mt-10 bg-gray-100" />
        </div>
    </main>
    <div v-else class="loading loading--infinite h-80"></div>
</template>
