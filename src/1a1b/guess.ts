import { uniq } from 'lodash-es'
import { arrayShuffle } from './array'

export interface Hint {
  a: number
  b: number
}

export interface Item {
  guess: string
  hint: Hint
}

export interface ReturnGuess1A1B {
  guess: string | undefined
  isAnswer: boolean
}

// 答案候選庫
let answers: string[] = []

export function guess1A1B(options: {
  history?: Item[]
  seed?: number
} = {}): ReturnGuess1A1B {
  const { history = [], seed } = options

  if (history.length === 0) {
    // 初始化答案候選庫
    answers = []
    for (let i = 0; i <= 9999; i++) {
      const nums = `${i}`.padStart(4, '0')
      const numsAry = nums.split('')
      // 當4個數字都不一樣才加入候選庫
      if (numsAry.length === uniq(numsAry).length) {
        answers.push(nums)
      }
    }
  }

  // 用窮舉來過濾不正確答案
  answers = answers.filter(answer => {
    return history.every(item => {
      const a = item.guess.split('').filter((char, i) => char === answer[i]).length
      const b = item.guess.split('').filter((char, i) => char !== answer[i] && answer.includes(char)).length
      return a === item.hint.a && b === item.hint.b
    })
  })

  // 隨機從答案候選庫中取出一個答案
  const guess = arrayShuffle(answers, seed)[0]

  // 如果上一次猜測猜對了，或是答案候選庫只剩下一個答案，就直接回傳答案
  const isAnswer = history[history.length - 1]?.hint?.a === 4 || answers.length === 1

  return { guess, isAnswer }
}

export function getPossibleAnswers() {
  return answers
}
