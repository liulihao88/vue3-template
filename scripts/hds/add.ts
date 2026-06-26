import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

interface GetHdsFilesFn {
  (dir: string, baseDir?: string): string[]
}

interface ReplaceComponentNameFn {
  (value: string): string
}

interface GetTargetRelativePathFn {
  (fileName: string): string
}

const componentName: string | undefined = process.argv[2]
const outputDirArg: string = process.argv[3] ?? '.'

if (!componentName) {
  console.error('Usage: node scripts/hds/add.ts <componentName> [outputDir]')
  process.exit(1)
}

const templateDir: string = path.dirname(fileURLToPath(import.meta.url))
const outputDir: string = path.resolve(process.cwd(), outputDirArg)

const getHdsFiles: GetHdsFilesFn = (dir, baseDir = dir) => {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath: string = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      return getHdsFiles(entryPath, baseDir)
    }

    if (!entry.isFile() || !entry.name.endsWith('.hds')) {
      return []
    }

    return path.relative(baseDir, entryPath)
  })
}

const hdsFiles: string[] = getHdsFiles(templateDir)

if (hdsFiles.length === 0) {
  console.error(`No .hds files found in ${templateDir}`)
  process.exit(1)
}

fs.mkdirSync(outputDir, { recursive: true })

const replaceComponentName: ReplaceComponentNameFn = (value: string): string =>
  value
    .replaceAll('{{ componentName }}', componentName)
    .replaceAll('{{componentName}}', componentName)
    .replaceAll('componentName', componentName)

const getTargetRelativePath: GetTargetRelativePathFn = (fileName: string): string => {
  const withoutHds: string = fileName.replace(/\.hds$/, '')
  const parsedPath = path.parse(withoutHds)
  const targetBaseName: string = parsedPath.name === 'index' ? componentName : replaceComponentName(parsedPath.name)

  return path.join(parsedPath.dir, `${targetBaseName}${parsedPath.ext}`)
}

const writtenFiles: string[] = hdsFiles.map((fileName: string) => {
  const sourcePath: string = path.join(templateDir, fileName)
  const targetPath: string = path.join(outputDir, 'src/views', componentName, getTargetRelativePath(fileName))
  const content: string = replaceComponentName(fs.readFileSync(sourcePath, 'utf-8'))

  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  fs.writeFileSync(targetPath, content, 'utf-8')
  return targetPath
})

for (const filePath of writtenFiles) {
  console.log(`- ${path.relative(process.cwd(), filePath)}`)
}
