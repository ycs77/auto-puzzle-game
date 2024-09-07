<template>
  <div class="py-8">
    <h1 class="text-2xl text-center font-bold">數獨</h1>

    <div class="mt-4 max-w-[500px] mx-auto px-4">
      <div
        ref="wrapperRef"
        class="flex flex-col"
        :style="{
          '--wrapper-width': `${wrapperWidth}px`,
          '--grid-size': `${wrapperWidth / 9}px`,
        }"
      >
        <div
          v-for="row in 9"
          :key="row"
          class="flex"
        >
          <div
            v-for="col in 9"
            :key="col"
            class="w-[--grid-size] h-[--grid-size]"
            :class="[
              [1, 4, 7].includes(row) ? 'border-t-2 border-t-black' : 'border-t border-t-gray-400',
              [1, 4, 7].includes(col) ? 'border-l-2 border-l-black' : 'border-l border-l-gray-400',
              col === 9 ? 'border-r-2 border-r-black' : '',
              row === 9 ? 'border-b-2 border-b-black' : '',
            ]"
          >
            <input
              v-model.number="sudoku[row - 1][col - 1]"
              type="number"
              class="w-full h-full p-0 text-center text-[length:calc(var(--grid-size)*0.6)] focus:outline-none"
              max="9"
              min="0"
              autocomplete="off"
            >
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-center gap-2">
        <button type="button" class="inline-block px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors" @click="solve">
          開始解數獨
        </button>

        <button type="button" class="inline-block px-4 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-500 rounded-md transition-colors" @click="initial">
          清除
        </button>
      </div>
    </div>

    <BackLink />
  </div>
</template>

<script setup lang="ts">
import { solveSudoku } from '../sudoku/solve-sudoku'

useHead({
  title: '數獨 | 程式解題',
})

const wrapperRef = ref(null) as Ref<HTMLDivElement | null>
const { width: wrapperWidth } = useElementSize(wrapperRef)

const sudoku = ref<(number | null)[][]>([])

initial()

function initial() {
  sudoku.value = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ]
}

function solve() {
  // 如果全部格子都沒有填數字，就不執行解數獨
  if (sudoku.value.every(row => row.every(num => typeof num !== 'number'))) return

  sudoku.value = solveSudoku(sudoku.value)
}
</script>
