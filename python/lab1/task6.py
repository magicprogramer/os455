n = 5
for i in range(2 * n - 1):
    if i < n:
        for j in range(i + 1):
            print("*", end=" ")
    else:
        for j  in range(n - (i - n + 1)):
            print("*", end=" ")
    print("\n")

'''
    
6 - Write a Python program to construct the following pattern, using a nested for loop.
Search about method
end=””
*
* *
* * *
* * * *
* * * * *
* * * *
* * *
* *
*
    
    
    '''