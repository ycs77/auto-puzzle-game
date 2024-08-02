import prand from 'pure-rand'

const rngs = new Map<number, prand.RandomGenerator>()

export function numberBetween(min: number, max: number, seed?: number): number {
  if (typeof seed === 'number') {
    let rng: prand.RandomGenerator
    if (rngs.has(seed)) {
      rng = rngs.get(seed)!
    } else {
      rng = prand.xoroshiro128plus(seed)
      rngs.set(seed, rng)
    }

    return prand.unsafeUniformIntDistribution(min, max, rng)
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function resetRng(seed: number) {
  rngs.set(seed, prand.xoroshiro128plus(seed))
}
