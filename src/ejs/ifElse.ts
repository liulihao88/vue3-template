import ejs from 'ejs'

const html = ejs.render(
  `
      <% if(user.name){ %>

      <h1>
        欢迎 <%= user.name %>
      </h1>

      <% } else { %>

      <h1>
        未登录
      </h1>

        <% } %>
      `,
  {
    user: {
      name: '凌云',
    },
  },
)

console.log(html)
