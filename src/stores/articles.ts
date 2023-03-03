import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Article, Category } from '@/types';
const apiUrl = import.meta.env[import.meta.env.DEV ? 'VITE_API_URL_DEV' : 'VITE_API_URL_PROD'];

// Store used for sharing state between pages and components
export const useArticlesStore = defineStore('article', () => {
    // Init articles as empty array of Article type
    const articles = ref<Article[]>([]);
    // Init categories as empty array of Category type
    const categories = ref<Category[]>([]);
    // Used throughout the app to show loading spinners when API calls are being made
    const loading = ref(false);

    // Fetche articles from the API for listing pages. Does not include full text.
    // By default returns articles in chronological order.
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

    // Fetch all categories from the API
    const fetchCategories = () => {
        loading.value = true;
        return fetch(`${apiUrl}/categories.json`)
            .then((response) => response.json())
            .then((data) => {
                categories.value = data.data;
                loading.value = false;
            });
    };

    // Fetch a specific article (using slug) and its full text.
    const fetchArticle = (slug: string) => {
        loading.value = true;
        return fetch(`${apiUrl}/article/${slug}.json`)
            .then((response) => response.json())
            .then((data) => {
                // Check if article is already loaded
                const existsAtIndex = articles.value.findIndex((article) => article.slug === slug);
                if (existsAtIndex === -1) {
                    // If not loaded, add it to the articles array directly
                    articles.value.push(data);
                } else {
                    // If loaded, replace the article with the enriched version that has full text.
                    articles.value.splice(existsAtIndex, 1);
                    articles.value.push(data);
                }
                loading.value = false;
            });
    };

    return { articles, categories, fetchArticles, fetchArticle, loading, fetchCategories };
});
