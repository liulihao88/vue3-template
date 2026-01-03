// 这个定义非常死板

export class Calculator {
  add(a: number, b: number): number {
    return a + b
  }
  subtract(a: number, b: number): number {
    return a - b
  }
  multiply(a: number, b: number): number {
    return a * b
  }
  divide(a: number, b: number): number {
    return a / b
  }
}

// 我能不能将计算器的功能,  暴漏给外部, 让外部给我增加功能

export class CalculatorPlugins {
  private plugins: any[] = []

  // 定义一个方法, 用来注册插件
  use(plugin: any) {
    this.plugins.push(plugin)
  }

  // 定义一个方法, 用来执行插件
  run(a: number, b: number) {
    // 1. 先获取到所有的插件
    const plugins = this.plugins

    // 2. 遍历素有的插件, 执行插件
    return plugins.reduce((result, plugin) => {
      return plugin(result)
    }, a + b)
  }
}

// 1. 定义一个插件

const plugin1 = (result: number) => {
  console.log(`85 result`, result)
  return result + 1
}

// 2. 定义一个插件
const plugin2 = (result: number) => {
  console.log(`97 result`, result)
  return result + 2
}

const plugins = new CalculatorPlugins()
plugins.use(plugin1)
plugins.use(plugin2)

console.log(plugins.run(1, 2))
