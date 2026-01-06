<template>
  <!-- Mobile top bar -->
  <div class="md:hidden mb-3">
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm shadow-sm"
      @click="open = true"
    >
      <span class="text-lg leading-none">☰</span>
      <span class="font-medium">Tools</span>
    </button>
  </div>

  <!-- Desktop sidebar -->
  <aside class="hidden md:block rounded-2xl bg-white p-4 shadow-sm">
    <SidebarContent />
  </aside>

  <!-- Mobile drawer -->
  <teleport to="body">
    <div v-if="open" class="md:hidden">
      <!-- backdrop -->
      <div class="fixed inset-0 z-40 bg-black/50" @click="open = false" />

      <!-- drawer -->
      <aside
        class="fixed left-0 top-0 z-50 h-full w-[85%] max-w-xs bg-white p-4 shadow-xl rounded-r-2xl"
        role="dialog"
        aria-modal="true"
      >
        <div class="mb-3 flex items-center justify-between">
          <p class="text-sm font-semibold">Tools</p>
          <button
            type="button"
            class="rounded-lg px-2 py-1 text-sm hover:bg-gray-100"
            @click="open = false"
          >
            ✕
          </button>
        </div>

        <!-- close drawer when user clicks any link -->
        <div @click="closeIfLink">
          <SidebarContent />
        </div>
      </aside>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { RouterLink, useRouter } from "vue-router";
import { TOOLS, ENABLED_TOOLS, type ToolStatus } from "@/app/tool-registry";

const open = ref(false);

const enabledTools = computed(() => ENABLED_TOOLS);
const comingSoon = computed(() => TOOLS.filter((t) => !t.enabled));

const badgeClass = (s: ToolStatus) => {
  if (s === "stable") return "bg-green-100 text-green-700";
  if (s === "beta") return "bg-yellow-100 text-yellow-700";
  if (s === "alpha") return "bg-purple-100 text-purple-700";
  return "bg-gray-100 text-gray-600";
};

// Close on ESC
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") open.value = false;
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

// Close drawer when clicking a RouterLink inside
const closeIfLink = (e: MouseEvent) => {
  const el = e.target as HTMLElement | null;
  if (!el) return;
  if (el.closest("a")) open.value = false;
};

// Sidebar content as an inline component so we don't duplicate markup
const SidebarContent = defineComponent({
  name: "SidebarContent",
  setup() {
    return () =>
      h("div", { class: "space-y-1" }, [
        h(
          "p",
          {
            class:
              "mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500",
          },
          "Tools"
        ),

        h(
          RouterLink,
          {
            to: "/tools",
            class:
              "flex items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-gray-100",
            activeClass: "bg-gray-900 text-white hover:bg-gray-900",
            exactActiveClass: "bg-gray-900 text-white hover:bg-gray-900",
          },
          { default: () => h("span", "All Tools") }
        ),

        ...enabledTools.value.map((t) =>
          h(
            RouterLink,
            {
              key: t.key,
              to: t.route,
              class:
                "flex items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-gray-100",
              activeClass: "bg-gray-900 text-white hover:bg-gray-900",
            },
            {
              default: () => [
                h("span", t.name),
                h(
                  "span",
                  {
                    class: `text-[10px] rounded-full px-2 py-0.5 ${badgeClass(
                      t.status
                    )}`,
                  },
                  t.status
                ),
              ],
            }
          )
        ),

        h("div", { class: "mt-4" }, [
          h(
            "p",
            {
              class:
                "mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500",
            },
            "Coming soon"
          ),
          ...comingSoon.value.map((t) =>
            h(
              "div",
              {
                key: t.key,
                class:
                  "flex items-center justify-between rounded-xl px-3 py-2 text-sm text-gray-400",
              },
              [
                h("span", t.name),
                h(
                  "span",
                  { class: "text-[10px] rounded-full bg-gray-100 px-2 py-0.5" },
                  "soon"
                ),
              ]
            )
          ),
        ]),
      ]);
  },
});
</script>
