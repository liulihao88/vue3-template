import { users } from './data.ts'
import { renderTemplate } from '../shared.ts'

const html = renderTemplate(import.meta.url, './index.ejs', { users })

console.log(html)
