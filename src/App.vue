<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <header class="bg-white/70">
        <div class="container flex items-center justify-between py-4">
            <RouterLink to="/">
                <img alt="Blog logo" class="" src="@/assets/logo.svg" width="60" />
            </RouterLink>

            <nav>
                <RouterLink to="/search" class="mx-4 border-black hover:border-b">Search</RouterLink>
                <RouterLink to="/about" class="mx-4 border-black hover:border-b">About</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style scoped></style>
