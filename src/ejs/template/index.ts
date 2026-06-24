const username = 'andy 凌云'
import { renderTemplate } from '../shared.ts'

const html = renderTemplate(import.meta.url, './index.ejs', { username, title: '' })

console.log(html)
