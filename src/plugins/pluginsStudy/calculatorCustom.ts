export class CalculatorPlugins {
  private plugins: any[] = []

  // 定义一个方法, 用来注册插件
  use(plugin: any) {
    this.plugins.push(plugin)
  }

  // 定义一个方法, 用来执行插件
  run(str: string) {
    // 1. 先获取到所有的插件
    const plugins = this.plugins

    // 2. 遍历素有的插件, 执行插件
    return !!plugins.reduce((result, plugin) => {
      return plugin(result) ? result : false
    }, str)
  }
}

// 表单校验
// 自定义rules, babel, eslint, Plugin
// 1. 定义一个插件
// 长度不小于10, 不大于20

const plugin1 = (result: string) => {
  return result.length >= 10
}

const plugin2 = (result: string) => {
  return result.length <= 20
}

const plugins = new CalculatorPlugins()
plugins.use(plugin1)
plugins.use(plugin2)

console.log(plugins.run('123456789'))
console.log(plugins.run('1234567890123'))
console.log(plugins.run('123456789012345678901'))
