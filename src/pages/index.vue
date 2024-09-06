<template>
  <div class="py-8">
    <h1 class="text-2xl text-center font-bold">程式解題</h1>

    <div class="mt-4 flex flex-wrap gap-2 justify-center">
      <RouterLink to="/sudoku" class="inline-block px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors">
        數獨
      </RouterLink>

      <RouterLink to="/1a1b-answer" class="inline-block px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors">
        1A1B 程式答題
      </RouterLink>

      <RouterLink to="/1a1b-ask" class="inline-block px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors">
        1A1B 程式出題
      </RouterLink>
    </div>
  </div>
</template>
