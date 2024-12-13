console.log('2208 1\u884C test/e1.ts 222 ', 222)
function isValid(s) {
  var stack = []
  var n = s.length
  for (var i = 0; i < n; i++) {
    var chat = s.charAt(i)
    if (chat == '(') {
      stack.push(')')
    } else if (chat == '[') {
      stack.push(']')
    } else if (chat == '{') {
      stack.push('}')
    } else {
      var str = stack.pop()
      if (str != chat) return false
    }
  }
  return stack.length == 0
}
var res = isValid('{}[]')
console.log('01 res', res)
