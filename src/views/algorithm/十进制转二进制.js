/*
1. 使用循环
function decimalToBinaryIterative(n, radix=2) {
  let res = "";
  while (n > 0) {
    res = (n % radix).toString() + res;
    n = Math.floor(n / radix);
  }
  return res;
}

decimalToBinaryIterative(10) // 1010
decimalToBinaryIterative(11); // 1011
decimalToBinaryIterative(13) // 1101 */

// 2. 使用内置方法
function decimalToBinaryBuiltIn(n, radix = 2) {
  return n.toString(radix)
}

console.log(decimalToBinaryBuiltIn(10)) // 1010
console.log(decimalToBinaryBuiltIn(11)) // 1011
console.log(decimalToBinaryBuiltIn(11, 8)) // 13
