<template>
  <div class="space-y-4">
    <div class="flex items-end justify-between gap-3">
      <div>
        <h1 class="text-xl font-bold">Tools</h1>
        <p class="text-sm text-gray-500">
          Enable/disable tools from the registry.
        </p>
      </div>

      <input
        v-model="q"
        class="w-56 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
        placeholder="Search tools..."
      />
    </div>

    <div class="grid gap-3 sm:grid-cols-2">
      <ToolCard v-for="t in filtered" :key="t.key" :tool="t" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { TOOLS } from "@/app/tool-registry";
import ToolCard from "@/components/ToolCard.vue";

const q = ref("");

const filtered = computed(() => {
  const keyword = q.value.trim().toLowerCase();
  if (!keyword) return TOOLS;
  return TOOLS.filter((t) =>
    [t.name, t.description, t.category].some((x) =>
      x.toLowerCase().includes(keyword)
    )
  );
});
</script>
