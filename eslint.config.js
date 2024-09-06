import ycs77, { GLOB_SRC, GLOB_VUE } from '@ycs77/eslint-config'

export default ycs77({
  vue: true,
  typescript: true,
  ignores: [
    '**/solve-sudoku-logs.html',
  ],
})
  .append({
    files: [GLOB_SRC, GLOB_VUE],
    rules: {
      'no-alert': 'off',
      'no-console': 'off',
    },
  })
  .append({
    files: ['**/*.test.ts'],
    rules: {
      'style/array-bracket-spacing': 'off',
      'style/no-multi-spaces': 'off',

      'test/consistent-test-it': 'off',
    },
  })
