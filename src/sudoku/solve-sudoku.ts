// import { SudokuLogger } from './solve-sudoku-logs'

export function solveSudoku(board: (number | null)[][]) {
  // const logger = new SudokuLogger()

  const newBoard = board.map(row => row.map(num => num === 0 ? null : num))

  /** 檢查整個數獨是否填滿 */
  function isFull() {
    return newBoard.every(row => row.every(num => typeof num === 'number'))
  }

  /** 檢查行、列、九宮格是否可以填入此數字 */
  function isValid(row: number, col: number, num: number) {
    // 檢查行、列
    for (let i = 0; i < 9; i++) {
      if (newBoard[row][i] === num || newBoard[i][col] === num) {
        return false
      }
    }

    // 九宮格的起始位置
    const boxRow = Math.floor(row / 3) * 3
    const boxCol = Math.floor(col / 3) * 3

    // 檢查九宮格
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (newBoard[i][j] === num) {
          return false
        }
      }
    }

    return true
  }

  /** 使用窮舉法解數獨 */
  function solve(row: number, col: number, deep: number = 0) {
    // 數獨已經填滿
    if (isFull()) {
      // logger.log(`[${row}, ${col}] 數獨已經填滿`, deep)
      return true
    }

    // 如果這個位置已經填入數字，就跳到下一個位置
    if (typeof newBoard[row][col] === 'number') {
      const nextRow = row + (col === 8 ? 1 : 0)
      const nextCol = (col + 1) % 9
      // logger.log(`[${row}, ${col}] 已經填入數字 ${newBoard[row][col]}，跳到下一個位置 [${nextRow}, ${nextCol}]`, deep)
      return solve(nextRow, nextCol, deep + 1)
    }

    // 嘗試填入 1~9
    // logger.log(`[${row}, ${col}] 嘗試填入 1~9`, deep)
    for (let num = 1; num <= 9; num++) {
      // 如果這個數字可以填入這個位置
      if (isValid(row, col, num)) {
        // 填入數字
        newBoard[row][col] = num

        // 嘗試填入下一個位置
        const nextRow = row + (col === 8 ? 1 : 0)
        const nextCol = (col + 1) % 9
        // logger.log(`[${row}, ${col}] 填入數字 ${num}，嘗試填入下一個位置 [${nextRow}, ${nextCol}]`, deep)
        if (solve(nextRow, nextCol, deep + 1)) {
          // logger.log(`[${row}, ${col}] 填入數字 ${num} 成功`, deep)
          return true
        }

        // 如果無法填入下一個位置，就把這個位置的數字清空
        newBoard[row][col] = null
        // logger.log(`[${row}, ${col}] 無法填入下一個位置，清空數字 ${num}`, deep)
      }
    }

    // 如果無法填入任何數字，就回傳 false
    // logger.log(`[${row}, ${col}] 無法填入任何數字`, deep)
    return false
  }

  // 從左上角開始解數獨
  solve(0, 0)

  // logger.exportHtml()

  return newBoard
}

export function isValidSudoku(board: (number | null)[][]) {
  // 檢查行
  for (let row = 0; row < 9; row++) {
    const set = new Set<number>()
    for (let col = 0; col < 9; col++) {
      const num = board[row][col]
      if (typeof num === 'number') {
        if (set.has(num)) return false
        set.add(num)
      }
    }
  }

  // 檢查列
  for (let col = 0; col < 9; col++) {
    const set = new Set<number>()
    for (let row = 0; row < 9; row++) {
      const num = board[row][col]
      if (typeof num === 'number') {
        if (set.has(num)) return false
        set.add(num)
      }
    }
  }

  // 檢查九宮格
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const set = new Set<number>()
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const num = board[boxRow * 3 + i][boxCol * 3 + j]
          if (typeof num === 'number') {
            if (set.has(num)) return false
            set.add(num)
          }
        }
      }
    }
  }

  return true
}
