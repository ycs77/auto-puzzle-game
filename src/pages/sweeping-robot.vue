<template>
  <div class="py-8">
    <h1 class="text-2xl text-center font-bold">模擬掃地機器人</h1>

    <div class="mt-8 max-w-[360px] mx-auto px-4">
      <div class="mt-2 flex justify-center gap-2">
        <button type="button" class="inline-block px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition-colors" @click="calcRoutes">
          Calc routes
        </button>

        <button type="button" class="inline-block px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors" @click="go">
          Go
        </button>

        <button type="button" class="inline-block px-4 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-500 rounded-md transition-colors" @click="reset">
          Reset
        </button>
      </div>

      <div class="mt-8 flex justify-center">
        <div class="relative">
          <table class="border-collapse">
            <tr
              v-for="(row, rowIndex) in mapAry"
              :key="rowIndex"
              class="border-y border-gray-300"
            >
              <td
                v-for="(cell, cellIndex) in row"
                :key="cellIndex"
                class="p-5 border-x border-gray-300"
                :class="`c-${cellTypes[cell]}`"
              />
            </tr>
          </table>

          <div
            ref="circle"
            class="absolute top-2 left-2 size-6 bg-indigo-500 rounded-full transition-transform duration-300 ease-linear"
          />
        </div>
      </div>
    </div>

    <BackLink />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '模擬掃地機器人',
})

const map = `
  000
  000
  000
`

const cellTypes = [
  'normal',    // 0: 一般格子
  'obstacle',  // 1: 障礙物
] as const

const directions = ['b', 'r', 't', 'l'] as const

type Direction = typeof directions[number]

// 格子尺寸
const cellSize = 40.8

// 移動時間 (ms)
const time = 300

const graph: Record<string, Cell> = {}
const routes: Cell[] = []

const circle = ref() as Ref<HTMLElement>

const mapAry = map
  .split('\n')
  .filter(Boolean)
  .map(row => row.trim().split('').map(Number))

class Cell {
  type: number
  r: number = 0
  c: number = 0
  visited = false
  adjacent: Cell[] = []

  constructor(type: number, r: number, c: number) {
    this.type = type
    this.r = r
    this.c = c
  }

  clone() {
    const newCell = new Cell(this.type, this.r, this.c)
    newCell.adjacent = this.adjacent.slice()
    return newCell
  }
}

// 確認格子類型
function isCellType(cell: number | undefined, type: typeof cellTypes[number]) {
  return typeof cell === 'number' ? cellTypes[cell] === type : undefined
}

// 計算此方向的下一格位置
function calcNextCell(cell: Cell, direction: Direction) {
  const newCell = cell.clone()
  if (direction === 't')      newCell.r--
  else if (direction === 'b') newCell.r++
  else if (direction === 'l') newCell.c--
  else if (direction === 'r') newCell.c++
  return newCell
}

// 傳回有效移動的下一格子 (不超出邊界)
function getNextCell(cell: Cell, direction: Direction, rowLen: number, cellLen: number) {
  const nextCell = calcNextCell(cell, direction)
  nextCell.adjacent = []
  if ((
    (direction === 't' && nextCell.r >= 0)       ||
    (direction === 'b' && nextCell.r <  rowLen)  ||
    (direction === 'l' && nextCell.c >= 0)       ||
    (direction === 'r' && nextCell.c <  cellLen)
  ) && isCellType(mapAry[nextCell.r]?.[nextCell.c], 'normal')) {
    return nextCell
  }
}

// 計算路徑走完全部格子
function calcRoutes() {
  // 初始化格子圖、路徑列表、堆棧
  Object.entries(graph).forEach(([key, _value]) => delete graph[key])
  routes.slice(0, routes.length)
  const stack: Cell[] = []

  // 建立格子圖
  const mapRowLen = mapAry.length
  mapAry.forEach((row, r) => {
    const mapCellLen = row.length
    row.forEach((cellType, c) => {
      // 建立格子
      graph[`${r}-${c}`] ||= new Cell(cellType, r, c)
      const cell = graph[`${r}-${c}`]

      // 設定相鄰格子
      directions.forEach(direction => {
        const nextCell = getNextCell(cell, direction, mapRowLen, mapCellLen)
        if (nextCell) {
          graph[`${nextCell.r}-${nextCell.c}`] ||= nextCell
          cell.adjacent.push(graph[`${nextCell.r}-${nextCell.c}`])
        }
      })
    })
  })

  console.log('graph', graph)

  // 如果沒有格子就結束
  if (Object.keys(graph).length === 0) return

  // 先設定第一個格子
  stack.push(graph[Object.keys(graph)[0]])

  // 當前走訪的格子
  let curCell: Cell

  let i = 0
  while (stack.length && i < 20) {
    i++

    // 取得 Stack 最後一個格子
    curCell = stack.pop()!
    console.log('curCell', curCell)

    // 紀錄為已走訪過
    curCell.visited = true
    routes.push(curCell)

    // 增加未走訪過的相鄰格子
    stack.push(
      ...curCell.adjacent
        .filter(cell => !cell.visited)
        .filter(cell => !stack.some(stachCell => stachCell.r === cell.r && stachCell.c === cell.c))
    )
  }

  console.log('routes', routes)
}

// 走路
async function go() {
  routes.reduce(
    (p, cell) => p.then(() => circleMoveTo(cell.r, cell.c)),
    Promise.resolve()
  )
}

async function reset() {
  await circleMoveTo(0, 0)
}

async function circleMoveTo(r: number, c: number) {
  return new Promise<void>(resolve => {
    const axis = {
      x: cellSize * c,
      y: cellSize * r,
    }

    circle.value.style.transform = `translate(${axis.x}px, ${axis.y}px)`

    setTimeout(resolve, time)
  })
}
</script>
