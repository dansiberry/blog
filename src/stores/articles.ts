import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Article, Category } from '@/types';
const apiUrl = import.meta.env.VITE_API_URL;

export const useArticlesStore = defineStore('article', () => {
    const articles = ref<Article[]>([]);
    const categories = ref<Category[]>([]);

    const count = computed(() => articles.value.length);
    const loading = ref(false);

    const fetchArticles = (limit?: number, categoryId?: number | string, query?: string) => {
        loading.value = true;
        return fetch(
            `${apiUrl}/articles.json?category-id=${categoryId || ''}&query=${query || ''}&limit=${limit || ''}`
        )
            .then((response) => response.json())
            .then((data) => {
                articles.value = data.data;
                loading.value = false;
            });
    };

    const fetchCategories = () => {
        loading.value = true;
        return fetch(`${apiUrl}/categories.json`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                categories.value = data.data;
                loading.value = false;
            });
    };

    const fetchArticle = (slug: string) => {
        loading.value = true;
        return fetch(`${apiUrl}/article/${slug}.json`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const existing = articles.value.findIndex((article) => article.slug === slug);
                if (existing === -1) {
                    console.log('not found');
                    articles.value.push(data);
                } else {
                    console.log('exists.. replacing');
                    articles.value[existing] = data;
                }
                loading.value = false;
            });
    };

    return { count, articles, categories, fetchArticles, fetchArticle, loading, fetchCategories };
});
