<template>
  <div class="rounded-2xl border bg-white p-4 shadow-sm">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-sm font-semibold">{{ tool.name }}</p>
        <p class="mt-1 text-sm text-gray-600">{{ tool.description }}</p>

        <div class="mt-3 flex flex-wrap items-center gap-2">
          <span
            class="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600"
          >
            {{ tool.category }}
          </span>
          <span
            class="rounded-full px-2 py-0.5 text-[11px]"
            :class="badgeClass(tool.status)"
          >
            {{ tool.status }}
          </span>
        </div>
      </div>

      <RouterLink
        v-if="tool.enabled"
        :to="tool.route"
        class="shrink-0 rounded-xl bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-800"
      >
        Open
      </RouterLink>

      <button
        v-else
        class="shrink-0 cursor-not-allowed rounded-xl bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-400"
      >
        Coming soon
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToolDef, ToolStatus } from "@/app/tool-registry";

defineProps<{ tool: ToolDef }>();

const badgeClass = (s: ToolStatus) => {
  if (s === "stable") return "bg-green-100 text-green-700";
  if (s === "beta") return "bg-yellow-100 text-yellow-700";
  if (s === "alpha") return "bg-purple-100 text-purple-700";
  return "bg-gray-100 text-gray-600";
};
</script>
