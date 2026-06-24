import ejs from 'ejs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

type EjsRenderData = Record<string, unknown>

export function getModuleDir(importMetaUrl: string) {
  const filename = fileURLToPath(importMetaUrl)
  return path.dirname(filename)
}

export function resolveFromModule(importMetaUrl: string, relativePath: string) {
  return path.resolve(getModuleDir(importMetaUrl), relativePath)
}

export function readTemplate(importMetaUrl: string, relativePath: string) {
  const filename = resolveFromModule(importMetaUrl, relativePath)

  return {
    filename,
    template: fs.readFileSync(filename, 'utf-8'),
  }
}

export function renderTemplate(
  importMetaUrl: string,
  relativePath: string,
  data: EjsRenderData = {},
  options: ejs.Options = {},
) {
  const { filename, template } = readTemplate(importMetaUrl, relativePath)

  return ejs.render(template, data, {
    filename,
    ...options,
  })
}

export function writeRenderedFile(importMetaUrl: string, relativePath: string, content: string) {
  const filePath = resolveFromModule(importMetaUrl, relativePath)
  fs.writeFileSync(filePath, content, 'utf-8')
  return filePath
}
