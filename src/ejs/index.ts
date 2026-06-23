import ejs from 'ejs'

const html = ejs.render(
  `
  <h1>Hello <%= name %></h1>
  `,
  {
    name: 'Tom',
  },
)

console.log(html)
