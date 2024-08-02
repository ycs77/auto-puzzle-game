import { getPossibleAnswers, guess1A1B } from './guess'
import type { Item } from './guess'
import { resetRng } from './number'

test('can guess 1A1B to answer is 7493', () => {
  const seed = 42

  resetRng(seed)

  expect(guess1A1B({
    history: [],
    seed,
  })).toStrictEqual({ guess: '0514', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0514', hint: { a: 0, b: 1 } },
    ],
    seed,
  })).toStrictEqual({ guess: '6837', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0514', hint: { a: 0, b: 1 } },
      { guess: '6837', hint: { a: 0, b: 2 } },
    ],
    seed,
  })).toStrictEqual({ guess: '3208', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0514', hint: { a: 0, b: 1 } },
      { guess: '6837', hint: { a: 0, b: 2 } },
      { guess: '3208', hint: { a: 0, b: 1 } },
    ],
    seed,
  })).toStrictEqual({ guess: '8975', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0514', hint: { a: 0, b: 1 } },
      { guess: '6837', hint: { a: 0, b: 2 } },
      { guess: '3208', hint: { a: 0, b: 1 } },
      { guess: '8975', hint: { a: 0, b: 2 } },
    ],
    seed,
  })).toStrictEqual({ guess: '1689', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0514', hint: { a: 0, b: 1 } },
      { guess: '6837', hint: { a: 0, b: 2 } },
      { guess: '3208', hint: { a: 0, b: 1 } },
      { guess: '8975', hint: { a: 0, b: 2 } },
      { guess: '1689', hint: { a: 0, b: 1 } },
    ],
    seed,
  })).toStrictEqual({ guess: '2756', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0514', hint: { a: 0, b: 1 } },
      { guess: '6837', hint: { a: 0, b: 2 } },
      { guess: '3208', hint: { a: 0, b: 1 } },
      { guess: '8975', hint: { a: 0, b: 2 } },
      { guess: '1689', hint: { a: 0, b: 1 } },
      { guess: '2756', hint: { a: 0, b: 1 } },
    ],
    seed,
  })).toStrictEqual({ guess: '7493', isAnswer: true })
})

test('auto guess 1A1B', () => {
  const answer = '7493'
  const seed = 42
  const history: (Item & { answerCount: number })[] = []
  let i = 0

  resetRng(seed)

  while (i < 10) {
    // 程式開始猜數字
    const { guess } = guess1A1B({ history, seed })
    if (!guess) break

    // 計算幾A幾B
    const a = guess.split('').filter((char, i) => char === answer[i]).length
    const b = guess.split('').filter((char, i) => char !== answer[i] && answer.includes(char)).length

    // 紀錄猜測內容
    history.push({
      guess,
      hint: { a, b },

      // 紀錄答案候選數量
      answerCount: getPossibleAnswers().length,
    })

    // 如果 4A0B 就結束
    if (a === 4 && b === 0) break

    i++
  }

  expect(history).toStrictEqual([
    { guess: '0514', hint: { a: 0, b: 1 }, answerCount: 5040 },
    { guess: '6837', hint: { a: 0, b: 2 }, answerCount: 5040 },
    { guess: '3208', hint: { a: 0, b: 1 }, answerCount: 504 },
    { guess: '8975', hint: { a: 0, b: 2 }, answerCount: 114 },
    { guess: '1689', hint: { a: 0, b: 1 }, answerCount: 25 },
    { guess: '2756', hint: { a: 0, b: 1 }, answerCount: 6 },
    { guess: '7493', hint: { a: 4, b: 0 }, answerCount: 1 },
  ])
})
