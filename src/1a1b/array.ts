import { numberBetween } from './number'

export function arrayShuffle<T>(array: T[], seed?: number): T[] {
  return array.slice().sort(() => numberBetween(-1, 1, seed))
}
