import ejs from 'ejs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const filename = path.resolve(__dirname, './index.ejs')
const template = fs.readFileSync(filename, 'utf-8')
const username = 'andy 凌云'

const html = ejs.render(
  template,

  { username, title: '' },
  {
    filename,
  },
)

console.log(html)
