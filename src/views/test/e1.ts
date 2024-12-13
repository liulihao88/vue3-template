console.log(`2208 1行 test/e1.ts 222 `, 222)

function isValid(s: string): boolean {
  const stack: string[] = []
  const n = s.length
  for (let i = 0; i < n; i++) {
    const chat = s.charAt(i)
    if (chat == '(') {
      stack.push(')')
    } else if (chat == '[') {
      stack.push(']')
    } else if (chat == '{') {
      stack.push('}')
    } else {
      const str = stack.pop()
      if (str != chat) return false
    }
  }
  return stack.length == 0
}

let res = isValid('{}[]')
console.log(`01 res`, res)
