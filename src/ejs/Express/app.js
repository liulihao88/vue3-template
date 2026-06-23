import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set('view engine', 'ejs')
app.set('views', __dirname)

app.get('/', (req, res) => {
  res.render('index', {
    title: '首页',
    user: 'Tom',
  })
})

app.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})
