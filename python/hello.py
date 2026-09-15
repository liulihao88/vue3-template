#!/usr/bin/env python3
# print('I\'m ok.')

# name = input()

# print('name', name)

# print('1024 * 768 =', 1024*768)

# print('I\'m learning\nPython.')

# print('''line1
# line2
# line3''')

# print(True and True)


# n = 123
# f = 456.789
# s1 = 'Hello, world'
# s2 = 'Hello, \'Adam\''
# s3 = r'Hello, "Bart"'
# s4 = r'''Hello,
# Bob!'''

# print(n)
# print(f)
# print(s1)
# print(s2)
# print(s3)
# print(s4)

# print(ord('A'))
# print(ord('中'))
# print(chr(65))
# print('\u4e2d\u6587')
# print(len('ABC'))

# p = ['asp', 'php']
# print(p[1])

# t=(1,)
# print(t)

# L = [
#     ['Apple', 'Google', 'Microsoft'],
#     ['Java', 'Python', 'Ruby', 'PHP'],
#     ['Adam', 'Bart', 'Bob']
# ]

# # 打印Apple:
# print(L[0][0])
# # 打印Python:
# print(L[1][1])
# # 打印Bob:
# print(L[2][-1])

# age = 3
# if age >= 18:
#     print('adult')
# elif age >= 6:
#     print('teenager')
# else:
#     print('kid')

# s = input('birth: ')
# birth = int(s)
# if birth < 2000:
#   print('2000前')
# else:
#   print('2000后')

# 小明身高1.75，体重80.5kg。请根据BMI公式（体重除以身高的平方）帮小明计算他的BMI指数，并根据BMI指数：
# 低于18.5：过轻 18.5-25：正常 25-28：过重 28-32：肥胖 高于32：严重肥胖

# height = 1.75
# weight = 80.5

# bmi = weight / (height * height)
# print(bmi)

# if bmi < 18.5:
#   print('过轻')
# elif bmi < 25:
#   print('正常')
# elif bmi < 28:
#   print('过重')
# elif bmi < 32: 
#   print('肥胖')
# else: 
#   print('严重肥胖')



# sum = 0
# for x in range(101):
#     sum = sum + x
# print(sum)

# L = ['Bart', 'Lisa', 'Adam']
# for x in L:
#     print(x)

# n = 1
# while n <= 100:
#     if n > 10: # 当n = 11时，条件满足，执行break语句
#         break # break语句会结束当前循环
#     print(n)
#     n = n + 1
# print('END')

d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
print(d['Michael'])

s1 = {1, 2, 3}
s2 = {2, 3, 4}
print(s1 & s2)
# {2, 3}
print(s1 | s2)
# {1, 2, 3, 4}
