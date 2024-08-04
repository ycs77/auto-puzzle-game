import { getPossibleAnswers, guess1A1B } from './guess'
import type { Item } from './guess'
import { resetRng } from './number'

test('can guess 1A1B and remaining only one answer', () => {
  const seed = 42
  resetRng(seed)

  expect(guess1A1B({
    history: [],
    seed,
  })).toStrictEqual({ guess: '0123', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0123', hint: { a: 1, b: 0 } },
    ],
    seed,
  })).toStrictEqual({ guess: '0456', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0123', hint: { a: 1, b: 0 } },
      { guess: '0456', hint: { a: 1, b: 0 } },
    ],
    seed,
  })).toStrictEqual({ guess: '0798', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0123', hint: { a: 1, b: 0 } },
      { guess: '0456', hint: { a: 1, b: 0 } },
      { guess: '0798', hint: { a: 1, b: 1 } },
    ],
    seed,
  })).toStrictEqual({ guess: '7158', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0123', hint: { a: 1, b: 0 } },
      { guess: '0456', hint: { a: 1, b: 0 } },
      { guess: '0798', hint: { a: 1, b: 1 } },
      { guess: '7158', hint: { a: 1, b: 0 } },
    ],
    seed,
  })).toStrictEqual({ guess: '9428', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0123', hint: { a: 1, b: 0 } },
      { guess: '0456', hint: { a: 1, b: 0 } },
      { guess: '0798', hint: { a: 1, b: 1 } },
      { guess: '7158', hint: { a: 1, b: 0 } },
      { guess: '9428', hint: { a: 1, b: 1 } },
    ],
    seed,
  })).toStrictEqual({ guess: '7493', isAnswer: true })
})

test('can guess 1A1B remaining not one answer', () => {
  const seed = 42
  resetRng(seed)

  expect(guess1A1B({
    history: [],
    seed,
  })).toStrictEqual({ guess: '0123', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0123', hint: { a: 0, b: 3 } },
    ],
    seed,
  })).toStrictEqual({ guess: '4012', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0123', hint: { a: 0, b: 3 } },
      { guess: '4012', hint: { a: 0, b: 3 } },
    ],
    seed,
  })).toStrictEqual({ guess: '1260', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0123', hint: { a: 0, b: 3 } },
      { guess: '4012', hint: { a: 0, b: 3 } },
      { guess: '1260', hint: { a: 2, b: 0 } },
    ],
    seed,
  })).toStrictEqual({ guess: '3240', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0123', hint: { a: 0, b: 3 } },
      { guess: '4012', hint: { a: 0, b: 3 } },
      { guess: '1260', hint: { a: 2, b: 0 } },
      { guess: '3240', hint: { a: 1, b: 2 } },
    ],
    seed,
  })).toStrictEqual({ guess: '1234', isAnswer: false })

  expect(guess1A1B({
    history: [
      { guess: '0123', hint: { a: 0, b: 3 } },
      { guess: '4012', hint: { a: 0, b: 3 } },
      { guess: '1260', hint: { a: 2, b: 0 } },
      { guess: '3240', hint: { a: 1, b: 2 } },
      { guess: '1234', hint: { a: 4, b: 0 } },
    ],
    seed,
  })).toStrictEqual({ guess: '1234', isAnswer: true })
})

test('auto guess 1A1B', () => {
  const answer = '7493'
  const history: (Item & { answerCount: number })[] = []

  const seed = 42
  resetRng(seed)

  let i = 0

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
    { guess: '0123', hint: { a: 1, b: 0 }, answerCount: 5040 },
    { guess: '0456', hint: { a: 1, b: 0 }, answerCount: 480 },
    { guess: '0798', hint: { a: 1, b: 1 }, answerCount: 42 },
    { guess: '7158', hint: { a: 1, b: 0 }, answerCount: 12 },
    { guess: '9428', hint: { a: 1, b: 1 }, answerCount: 2 },
    { guess: '7493', hint: { a: 4, b: 0 }, answerCount: 1 },
  ])
})
