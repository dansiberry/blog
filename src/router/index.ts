import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ArticleView from '@/views/ArticleView.vue';
import ArticleSearch from '@/views/ArticleSearch.vue';

// Define the SPA routes for the app
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior() {
        // always scroll to top
        return { top: 0 };
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/article/:slug',
            name: 'article',
            component: ArticleView
        },
        {
            path: '/search',
            name: 'search',
            component: ArticleSearch
        }
    ]
});

export default router;
