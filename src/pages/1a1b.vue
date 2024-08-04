<template>
  <div class="py-8">
    <h1 class="text-2xl text-center font-bold">1A1B</h1>

    <div class="mt-8 max-w-[360px] mx-auto px-4">
      <template v-if="guess">
        <div class="mb-4 bg-gray-100 px-3 py-1.5 text-center text-4xl font-bold rounded-md">
          {{ guess }}
        </div>
        <div v-if="!isAnswer" class="mb-8 text-center">
          <input
            v-model.number="a"
            type="number"
            class="w-10 sm:w-12 p-2 border border-gray-400 rounded-md"
            maxlength="4"
            autocomplete="off"
          >
          A
          <input
            v-model.number="b"
            type="number"
            class="w-10 sm:w-12 p-2 border border-gray-400 rounded-md"
            maxlength="4"
            autocomplete="off"
          >
          B
        </div>
      </template>

      <div v-if="!isAnswer && !isEmptyNumbersError" class="text-center">
        <button type="button" class="inline-block px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors" @click="callProgramGuessNumber">
          猜數字
        </button>
      </div>

      <div v-if="isEmptyNumbersError" class="text-center">
        <p class="text-red-500">當前沒有可以猜的數字...</p>
      </div>

      <ul v-if="history.length" class="mt-8 border border-gray-400 divide-y divide-gray-400 rounded-md">
        <li v-for="(item, i) in history" :key="i">
          <div class="flex justify-between px-3 py-1.5">
            <span>{{ item.guess }}</span>
            <span>{{ item.hint.a }}A{{ item.hint.b }}B</span>
          </div>
        </li>
      </ul>

      <div v-if="isAnswer || isEmptyNumbersError" class="mt-4 text-center">
        <button type="button" class="inline-block px-4 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors" @click="reset">
          重置
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { guess1A1B } from '../1a1b/guess'
import type { Item } from '../1a1b/guess'

const guess = ref<string | undefined>(undefined)
const a = ref<number | undefined>(undefined)
const b = ref<number | undefined>(undefined)
const history = ref([]) as Ref<Item[]>
const isAnswer = ref(false)
const isEmptyNumbersError = computed(() => history.value.length && !guess.value)

function callProgramGuessNumber() {
  if (isAnswer.value) return
  if (typeof a.value === 'number' && (a.value < 0 || a.value > 4)) return
  if (typeof b.value === 'number' && (b.value < 0 || b.value > 4)) return

  if (guess.value) {
    history.value.push({
      guess: guess.value,
      hint: {
        a: a.value ?? 0,
        b: b.value ?? 0,
      },
    })

    a.value = undefined
    b.value = undefined
  }

  const result = guess1A1B({
    history: history.value,
  })
  guess.value = result.guess
  isAnswer.value = result.isAnswer
}

function reset() {
  guess.value = undefined
  a.value = undefined
  b.value = undefined
  history.value = []
  isAnswer.value = false
}
</script>
