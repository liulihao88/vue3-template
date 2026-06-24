import { writeButtonComponent } from './generator.ts'

const name = process.argv[2]

if (!name) {
  console.log('请输入组件名称，例如：node src/ejs/Button/传递参数.ts cusButton')
  process.exit(1)
}

const { html, filePath } = writeButtonComponent({ name })

console.log(html)

console.log(`created: ${filePath}`)
