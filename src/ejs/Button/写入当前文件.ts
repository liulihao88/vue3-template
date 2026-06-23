import ejs from 'ejs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const template = fs.readFileSync(path.resolve(__dirname, './button.vue.ejs'), 'utf-8')

const html = ejs.render(template, { name: 'MyButton' })

console.log(html)

const filePath = path.join(__dirname, 'MyButton.vue')

fs.writeFileSync(filePath, html, 'utf-8')

console.log(`created: ${filePath}`)
