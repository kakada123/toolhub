<template>
  <div class="rounded-xl bg-gray-50 p-3">
    <div class="flex items-center justify-between gap-2">
      <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">
        Result
      </p>

      <button
        v-if="hasText"
        class="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-100 border"
        @click="$emit('copy')"
      >
        Copy
      </button>
    </div>

    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="text" class="mt-2 text-sm text-gray-900 whitespace-pre-line">
      {{ text }}
    </p>
    <p v-else class="mt-2 text-sm text-gray-400">—</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  error?: string;
  text?: string;
}>();

defineEmits<{
  (e: "copy"): void;
}>();

const hasText = computed(() => !!props.text && !props.error);
</script>
