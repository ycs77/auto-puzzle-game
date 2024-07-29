import { reply1A1B } from './reply'

test('can reply 1234 with starter', () => {
  expect(reply1A1B()).toBe('1234')
})

test('can reply 1234 with has history', () => {
  expect(reply1A1B({ a: 1, b: 1 }, [])).toBe('1234')
})
