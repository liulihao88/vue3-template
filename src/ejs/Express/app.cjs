const express = require('express')
const path = require('node:path')

const app = express()

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
