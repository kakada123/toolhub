<template>
  <aside class="rounded-2xl bg-white p-4 shadow-sm">
    <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
      Tools
    </p>

    <div class="space-y-1">
      <RouterLink
        to="/tools"
        class="flex items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-gray-100"
        active-class="bg-gray-900 text-white hover:bg-gray-900"
        exact-active-class="bg-gray-900 text-white hover:bg-gray-900"
      >
        <span>All Tools</span>
      </RouterLink>

      <RouterLink
        v-for="t in enabledTools"
        :key="t.key"
        :to="t.route"
        class="flex items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-gray-100"
        active-class="bg-gray-900 text-white hover:bg-gray-900"
      >
        <span>{{ t.name }}</span>
        <span
          class="text-[10px] rounded-full px-2 py-0.5"
          :class="badgeClass(t.status)"
        >
          {{ t.status }}
        </span>
      </RouterLink>

      <div class="mt-4">
        <p
          class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
        >
          Coming soon
        </p>
        <div
          v-for="t in comingSoon"
          :key="t.key"
          class="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-gray-400"
        >
          <span>{{ t.name }}</span>
          <span class="text-[10px] rounded-full bg-gray-100 px-2 py-0.5"
            >soon</span
          >
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { TOOLS, ENABLED_TOOLS, type ToolStatus } from "@/app/tool-registry";

const enabledTools = computed(() => ENABLED_TOOLS);
const comingSoon = computed(() => TOOLS.filter((t) => !t.enabled));

const badgeClass = (s: ToolStatus) => {
  if (s === "stable") return "bg-green-100 text-green-700";
  if (s === "beta") return "bg-yellow-100 text-yellow-700";
  if (s === "alpha") return "bg-purple-100 text-purple-700";
  return "bg-gray-100 text-gray-600";
};
</script>
