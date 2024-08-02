import ycs77 from '@ycs77/eslint-config'

export default ycs77({
  vue: true,
  typescript: true,
  ignores: [
    '**/solve-sudoku-logs.html',
  ],
})
  .append({
    files: ['**/*.test.ts'],
    rules: {
      'style/array-bracket-spacing': 'off',
      'style/no-multi-spaces': 'off',

      'test/consistent-test-it': 'off',
    },
  })
