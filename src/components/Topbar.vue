<template>
  <header class="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <!-- Brand -->
      <div class="flex items-center gap-3">
        <img
          src="@/assets/logo-toolhub.png"
          alt="ToolHub"
          class="h-9 w-9 rounded-xl object-contain"
        />

        <div class="leading-tight">
          <p class="text-sm font-semibold">ToolHub</p>
          <p class="text-xs text-gray-500">
            Simple tools that get things done.
          </p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex items-center gap-2 text-sm">
        <RouterLink
          to="/"
          class="rounded-lg px-3 py-2 transition hover:bg-gray-100"
        >
          Home
        </RouterLink>

        <RouterLink
          to="/tools"
          class="rounded-lg px-3 py-2 transition hover:bg-gray-100"
        >
          Tools
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
