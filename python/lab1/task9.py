'''
9-Write a Python program to get the Fibonacci series between 0 to 50
Note : The Fibonacci Sequence is the series of numbers :
0, 1, 1, 2, 3, 5, 8, 13, 21, ....
'''
f = []
f.append(0)
f.append(1)
for i in range(2, 50):
    f.append(f[i - 1] +f[i - 2])
for i in range(50):
    print(f[i])