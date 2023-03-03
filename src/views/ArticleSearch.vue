<script setup lang="ts">
import { onBeforeMount, computed, ref } from 'vue';
import { useArticlesStore } from '@/stores/articles';
import CategoryList from '@/components/CategoryList.vue';
import CardList from '@/components/CardList.vue';

const store = useArticlesStore();

// Use -1 when no category is active
const activeCategoryId = ref(-1);

const orderBy = ref('Date Desc.');

const searchTerm = ref('');

onBeforeMount(() => {
    // Reset query and category inputs
    activeCategoryId.value = -1;
    searchTerm.value = '';
    // Fetch default 50 recent articles if not already fetched on homepage
    if (store.articles.length <= 1) {
        store.fetchArticles(50);
    }
    // Fetch categories if not already fetched
    if (!store.categories.length) {
        store.fetchCategories();
    }
});

const fetchArticles = () => {
    // Format API input to emptry string if no category is active.
    const category = activeCategoryId.value === -1 ? '' : activeCategoryId.value;
    // Fetch 50 articles that match query/category
    store.fetchArticles(50, category, searchTerm.value);
};

const updateCateogory = (id: number) => {
    // Deselect category if already active
    activeCategoryId.value = activeCategoryId.value === id ? -1 : id;
    fetchArticles();
};

const orderedArticles = computed(() => {
    // Return sorted articles depending on user's choice
    return [...store.articles].sort((a, b) => {
        if (orderBy.value === 'Title') {
            return a.title > b.title ? 1 : -1;
        } else if (orderBy.value === 'Date Desc.') {
            return a.createdAt > b.createdAt ? -1 : 1;
        } else {
            return a.createdAt > b.createdAt ? 1 : -1;
        }
    });
});

// Used to know when the default recent articles are showing
const noFilterActive = computed(() => {
    return searchTerm.value === '' && activeCategoryId.value === -1;
});

const noArticlesFound = computed(() => {
    return !store.loading && orderedArticles.value.length === 0;
});
</script>

<template>
    <main>
        <div class="container">
            <h1 class="h1 mt-20 mb-12">Browse articles</h1>
            <div class="filters justify-between md:flex">
                <div class="">
                    <h5 class="h5 mb-3">Search</h5>
                    <div class="mb-6" :class="{ 'pointer-events-none opacity-50': store.loading }">
                        <input
                            type="text"
                            v-model="searchTerm"
                            class="w-50 h-9 md:w-64"
                            id="search-input"
                            :disabled="store.loading"
                            @keyup.enter="fetchArticles"
                        />
                        <button class="button button--small ml-3" id="search-submit" @click="fetchArticles">
                            Submit
                        </button>
                    </div>
                    <h5 class="h5 mb-3">Categories</h5>
                    <CategoryList
                        :categories="store.categories"
                        class="text-md categories-filter pb-8"
                        :class="{ 'pointer-events-none opacity-50': store.loading }"
                        :interactive="true"
                        :active-id="activeCategoryId"
                        @category-click="updateCateogory"
                    />
                </div>
                <div class="mb-8">
                    <h5 class="h5 mb-3">Order by</h5>
                    <select v-model="orderBy" class="order-by">
                        <option>Date Desc.</option>
                        <option>Date Asc.</option>
                        <option>Title</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="mt:pb-20 min-h-[500px] bg-gray-100 pt-4 pb-12 md:pt-14" :class="{ loading: store.loading }">
            <h3 v-if="noFilterActive" class="h3 container text-gray-500">Recent articles...</h3>
            <CardList v-if="!store.loading" :articles="orderedArticles" class="container mt-10 bg-gray-100" />
            <h3 v-if="noArticlesFound" class="h3 container text-gray-500">
                Sorry, no articles found. Please refine your search.
            </h3>
        </div>
    </main>
</template>
