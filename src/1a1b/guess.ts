import { difference, uniq } from 'lodash-es'
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

const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

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

  // 前兩次猜測，隨機選擇 4 個不重複的數字
  if (history.length < 2) {
    // 把歷史紀錄所有的數字取出
    const historiesNums = history.reduce((carry, item) => carry.concat(item.guess.split('')), <string[]>[])
    // 將 0~9 中過濾掉歷史紀錄的數字
    const leftoverNums = difference(nums, historiesNums)
    // 剩下的數字中隨機取出4個數字
    const guess = arrayShuffle(leftoverNums, seed).slice(0, 4).join('')

    return { guess, isAnswer: answers.length === 1 }
  }

  // 第三次開始就用窮舉來過濾不正確答案
  answers = answers.filter(answer => {
    return history.every(item => {
      const a = item.guess.split('').filter((char, i) => char === answer[i]).length
      const b = item.guess.split('').filter((char, i) => char !== answer[i] && answer.includes(char)).length
      return a === item.hint.a && b === item.hint.b
    })
  })

  // 隨機從答案候選庫中取出一個答案
  const guess = arrayShuffle(answers, seed)[0]

  return { guess, isAnswer: answers.length === 1 }
}

export function getPossibleAnswers() {
  return answers
}
