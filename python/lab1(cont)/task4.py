'''
4- Given unordered list, sort it using algorithm bubble sort
( read about bubble sort and try to implement it)
'''
def bubble(lst):
    n = len(lst)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if (lst[j] > lst[j + 1]):
                lst[j], lst[j + 1] = lst[j + 1], lst[j]
    return lst
print(bubble([5, 4, 3, 2, 1]))
print(bubble([2, 1, 4, 3, 1]))
