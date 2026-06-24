import { writeButtonComponent } from './generator.ts'

const { html, filePath } = writeButtonComponent({ name: 'MyButton' })

console.log(html)

console.log(`created: ${filePath}`)
