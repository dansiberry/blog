import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/main.css';

// Use Pinia for state management
const app = createApp(App);
app.use(createPinia());

// Use the Vue router
app.use(router);

// Initialise the app and mount it in the DOM at #app
app.mount('#app');
