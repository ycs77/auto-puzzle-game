<template>
  <div class="py-8">
    <h1 class="text-2xl text-center font-bold">1A1B 程式出題</h1>

    <div class="mt-8 max-w-[360px] mx-auto px-4 space-y-6">
      <div>
        <label>答案數字：</label>
        <div class="flex gap-4">
          <input v-model="answerNums" type="text" class="grow p-2 text-white focus:text-inherit border border-gray-400 rounded-md">
          <button type="button" class="shrink-0 inline-block px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors" @click="random">
            隨機
          </button>
        </div>
      </div>

      <div>
        <label>猜測數字：</label>
        <div class="flex gap-4">
          <input ref="testNumsRef" v-model="testNums" type="text" class="grow p-2 border border-gray-400 rounded-md">
          <button type="button" class="shrink-0 inline-block px-4 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-500 rounded-md transition-colors" @click="clear">
            清除
          </button>
        </div>
      </div>

      <div>
        <label>結果：</label>
        <div class="bg-gray-100 px-3 py-1.5 text-center text-4xl font-bold rounded-md">
          {{ result }}
        </div>
      </div>
    </div>

    <RouterLink to="/" class="absolute top-4 left-4 inline-flex justify-center items-center w-10 h-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-colors">
      <HeroiconsArrowLeft class="w-5 h-5 inline-block" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '1A1B | 程式解題',
})

const answerNums = ref('1234')
const testNums = ref('')
const testNumsRef = ref() as Ref<HTMLInputElement>
const isTesting = ref(false)

const a = computed(() => {
  return testNums.value.split('').filter((char, i) => {
    return char === answerNums.value[i]
  }).length
})

const b = computed(() => {
  return testNums.value.split('').filter((char, i) => {
    return char !== answerNums.value[i] && answerNums.value.includes(char)
  }).length
})

const result = computed(() => `${a.value}A${b.value > 0 ? `${b.value}B` : ''}`)

watch(testNums, () => {
  isTesting.value = true
})

watch([a, b], ([a, b]) => {
  if (a === 4 && b === 0) {
    isTesting.value = false
  }
})

function random() {
  if (isTesting.value && !confirm('確定要重新產生數字嗎?')) {
    return
  }

  let resultNums = ''
  const nums = Array.from({ length: 10 }).map((_, i) => i)

  for (let i = 0; i < 4; i++) {
    const typedArr = new Uint8Array(1)
    crypto.getRandomValues(typedArr)
    const randomIndex = Math.floor(typedArr[0] / 256 * nums.length)
    // const randomIndex = Math.floor(Math.random() * nums.length)
    resultNums += nums[randomIndex]
    nums.splice(randomIndex, 1)
  }

  testNums.value = ''
  answerNums.value = resultNums

  nextTick(() => isTesting.value = false)
}

function clear() {
  testNums.value = ''
  testNumsRef.value.focus()
}
</script>
