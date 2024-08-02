import fs from 'node:fs'
import path from 'node:path'

interface LogNode {
  message: string
  deep: number
}

export class SudokuLogger {
  private logs: LogNode[] = []

  log(message: string, deep: number) {
    this.logs.push({ message, deep })
  }

  getLogs() {
    return this.logs
  }

  exportHtml() {
    let logsContent = ''
    let maxDeep = 0

    for (let i = 0; i < this.logs.length; i++) {
      const log = this.logs[i]
      const prevLog = this.logs[i - 1]
      const deepScore = log.deep - (prevLog?.deep ?? -1)
      maxDeep = Math.max(maxDeep, log.deep)

      if (deepScore <= 0) {
        for (let i = 0; i <= Math.abs(deepScore); i++) {
          logsContent += `</details>\n`
        }
      }

      logsContent += `<details open>\n`
      logsContent += `<summary>${log.message}</summary>\n`
      // logsContent += `<summary>${log.message} (deep:${deepScore})</summary>\n`
    }

    for (let i = 0; i < maxDeep; i++) {
      logsContent += `</details>\n`
    }

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>solve-sudoku-logs</title>
  <style>
  details {
    margin-left: 20px;
  }
  </style>
</head>
<body>

${logsContent}

</body>
</html>
`

    fs.writeFileSync(path.resolve(__dirname, 'solve-sudoku-logs.html'), html, 'utf-8')
  }
}
