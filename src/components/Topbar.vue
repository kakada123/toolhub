<template>
  <header class="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <div class="flex items-center gap-2">
        <div class="h-9 w-9 rounded-xl bg-gray-900"></div>
        <div>
          <p class="text-sm font-semibold leading-tight">ToolHub</p>
          <p class="text-xs text-gray-500 leading-tight">
            Release tools one by one
          </p>
        </div>
      </div>

      <nav class="flex items-center gap-2 text-sm">
        <RouterLink class="rounded-lg px-3 py-2 hover:bg-gray-100" to="/"
          >Home</RouterLink
        >
        <RouterLink class="rounded-lg px-3 py-2 hover:bg-gray-100" to="/tools"
          >Tools</RouterLink
        >
      </nav>
    </div>
  </header>
</template>
