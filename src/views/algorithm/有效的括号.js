/**
 *
 * @param {*} s
 * @returns
 *
代码
测试用例
测试用例
测试结果
20. 有效的括号
已解答
简单
相关标签
相关企业
提示
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。
 */
function isValid(s) {
  const n = s.length
  if (n % 2 === 1) {
    return false
  }
  const stack = []

  for (let i = 0; i < n; i++) {
    if (s[i] === '(') {
      stack.push(')')
    } else if (s[i] === '[') {
      stack.push(']')
    } else if (s[i] === '{') {
      stack.push('}')
    } else {
      if (stack.length === 0 || s[i] !== stack[stack.length - 1]) {
        return false
      } else {
        stack.pop()
      }
    }
  }
  return stack.length === 0
}

let res = isValid('{}[]')
console.log(`01 res`, res)
