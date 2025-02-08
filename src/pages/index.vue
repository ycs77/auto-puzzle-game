<template>
  <div class="py-8">
    <h1 class="text-2xl text-center font-bold">程式解題</h1>

    <div class="mt-4 max-w-xs px-4 mx-auto flex flex-col gap-4 justify-center">
      <RouterLink to="/sudoku" class="block px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-center rounded-md transition-colors">
        數獨
      </RouterLink>

      <RouterLink to="/1a1b-answer" class="block px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-center rounded-md transition-colors">
        1A1B 程式答題
      </RouterLink>

      <RouterLink to="/1a1b-ask" class="block px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-center rounded-md transition-colors">
        1A1B 程式出題
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '程式解題',
})
</script>
