<template>
  <div class="h-full bg-gray-50 text-gray-900">
    <Topbar />

    <div class="mx-auto max-w-6xl px-4 py-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-[260px_1fr]">
        <Sidebar />
        <main class="min-h-[70vh] rounded-2xl bg-white p-4 shadow-sm">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Topbar from "@/components/Topbar.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>
