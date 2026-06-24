import { renderTemplate } from '../shared.ts'

const html = renderTemplate(import.meta.url, './for.ejs')

console.log(html)
