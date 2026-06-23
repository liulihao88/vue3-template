import ejs from 'ejs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const name = process.argv[2]

if (!name) {
  console.log('请输入组件名称，例如：node src/ejs/Button/传递参数.ts cusButton')
  process.exit(1)
}

const template = fs.readFileSync(path.resolve(__dirname, './button.vue.ejs'), 'utf-8')

const html = ejs.render(template, { name })

console.log(html)

const filePath = path.join(__dirname, `${name}.vue`)

fs.writeFileSync(filePath, html, 'utf-8')

console.log(`created: ${filePath}`)
