<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-lg font-bold">QR Generator</h1>
      <p class="text-sm text-gray-500">
        Generate a QR code from text or URL. Download as PNG.
      </p>
    </div>

    <section class="rounded-2xl border bg-white p-4 shadow-sm space-y-4">
      <h2 class="text-sm font-semibold">Input</h2>

      <div class="grid gap-3 md:grid-cols-2">
        <div class="space-y-2">
          <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Text / URL
          </label>
          <textarea
            v-model="state.text"
            rows="4"
            class="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
            placeholder="https://example.com"
          />

          <div class="flex gap-2">
            <button
              @click="generate()"
              class="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Generate
            </button>

            <button
              @click="clearAll()"
              class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
            >
              Clear
            </button>
          </div>

          <p v-if="state.error" class="text-sm text-red-600">{{ state.error }}</p>
        </div>

        <div class="space-y-3">
          <h3 class="text-sm font-semibold">Options</h3>

          <div class="grid gap-3 sm:grid-cols-2">
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Size (px)
              </label>
              <select
                v-model.number="state.size"
                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
              >
                <option :value="128">128</option>
                <option :value="256">256</option>
                <option :value="384">384</option>
                <option :value="512">512</option>
                <option :value="768">768</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Error correction
              </label>
              <select
                v-model="state.ecLevel"
                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
              >
                <option value="L">L (7%)</option>
                <option value="M">M (15%)</option>
                <option value="Q">Q (25%)</option>
                <option value="H">H (30%)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Margin
              </label>
              <input
                v-model.number="state.margin"
                type="number"
                min="0"
                max="10"
                class="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
              />
            </div>

            <div class="flex items-end gap-2">
              <button
                @click="downloadPng()"
                :disabled="!state.dataUrl"
                class="w-full rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download PNG
              </button>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              @click="copyDataUrl()"
              :disabled="!state.dataUrl"
              class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Copy DataURL
            </button>

            <button
              @click="generate()"
              :disabled="!state.text.trim()"
              class="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="rounded-2xl border bg-white p-4 shadow-sm space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-semibold">Preview</h2>
        <p class="text-xs text-gray-500" v-if="state.dataUrl">
          {{ state.size }}px • EC {{ state.ecLevel }} • margin {{ state.margin }}
        </p>
      </div>

      <div
        class="rounded-xl bg-gray-50 p-4 flex items-center justify-center min-h-[220px]"
      >
        <div v-if="state.dataUrl" class="text-center space-y-3">
          <img
            :src="state.dataUrl"
            :alt="`QR ${state.text}`"
            class="mx-auto rounded-lg border bg-white"
            :style="{ width: `${Math.min(state.size, 320)}px`, height: 'auto' }"
          />
          <p class="text-xs text-gray-500 break-all max-w-[560px]">
            {{ state.text }}
          </p>
        </div>

        <p v-else class="text-sm text-gray-400">
          Generate a QR to see preview here.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import QRCode from "qrcode";

type EcLevel = "L" | "M" | "Q" | "H";

const state = reactive({
  text: "",
  size: 256,
  margin: 2,
  ecLevel: "M" as EcLevel,
  dataUrl: "" as string,
  error: "" as string,
});

// auto-generate when options change (but only if text exists)
watch(
  () => [state.size, state.margin, state.ecLevel],
  () => {
    if (!state.text.trim()) return;
    generate();
  }
);

async function generate() {
  state.error = "";
  state.dataUrl = "";

  const input = state.text.trim();
  if (!input) {
    state.error = "Please enter text or URL.";
    return;
  }

  try {
    state.dataUrl = await QRCode.toDataURL(input, {
      width: state.size,
      margin: state.margin,
      errorCorrectionLevel: state.ecLevel,
    });
  } catch (e: any) {
    state.error = e?.message ?? "Failed to generate QR.";
  }
}

function clearAll() {
  state.text = "";
  state.dataUrl = "";
  state.error = "";
}

async function copyDataUrl() {
  if (!state.dataUrl) return;
  try {
    await navigator.clipboard.writeText(state.dataUrl);
  } catch {
    // fallback
    const el = document.createElement("textarea");
    el.value = state.dataUrl;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
}

function downloadPng() {
  if (!state.dataUrl) return;

  const safeName =
    (state.text.trim().slice(0, 24) || "qr")
      .replace(/[^a-z0-9_-]+/gi, "-")
      .replace(/-+/g, "-")
      .toLowerCase() + ".png";

  const a = document.createElement("a");
  a.href = state.dataUrl;
  a.download = safeName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
</script>
