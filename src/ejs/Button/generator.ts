import { renderTemplate, writeRenderedFile } from '../shared.ts'

const BUTTON_TEMPLATE_PATH = './button.vue.ejs'

export type ButtonComponentInput = {
  name: string
}

export function renderButtonComponent({ name }: ButtonComponentInput) {
  return renderTemplate(import.meta.url, BUTTON_TEMPLATE_PATH, { name })
}

export function writeButtonComponent({ name }: ButtonComponentInput) {
  const html = renderButtonComponent({ name })
  const filePath = writeRenderedFile(import.meta.url, `./${name}.vue`, html)

  return {
    html,
    filePath,
  }
}
