<script setup lang="ts">
defineProps<{
    activePage: number;
    totalPages: number;
}>();
</script>

<template>
    <div class="">
        <div class="flex items-center justify-center">
            <button
                class="mr-4 rounded-full border border-black p-3"
                :disabled="activePage === 1"
                :class="{ 'opacity-30': activePage === 1 }"
                @click="$emit('setPage', activePage - 1)"
                aria-label="Previous page"
            >
                <svg class="h-4 w-4 fill-current" role="img" focusable="false" viewBox="0 0 20 20">
                    <path
                        d="M7.050 9.293l-0.707 0.707 5.657 5.657 1.414-1.414-4.242-4.243 4.242-4.243-1.414-1.414z"
                    ></path>
                </svg>
            </button>
            <span class="mx-8">{{ activePage }}</span>
            <button
                class="ml-4 rounded-full border border-black p-3"
                :disabled="activePage === totalPages"
                :class="{ 'opacity-30': activePage === totalPages }"
                @click="$emit('setPage', activePage + 1)"
                aria-label="Next page"
            >
                <svg class="h-4 w-4 fill-current" role="img" focusable="false" viewBox="0 0 20 20">
                    <path
                        d="M12.95 10.707l0.707-0.707-5.657-5.657-1.414 1.414 4.242 4.243-4.242 4.243 1.414 1.414 4.95-4.95z"
                    ></path>
                </svg>
            </button>
        </div>
    </div>
</template>
