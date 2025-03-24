'''
3- Write a Python function that takes a sequence of numbers and determines
whether all the numbers are different from each other.
E.X. [1,5,7,9] -> True
[2,4,5,5,7,9] -> False
'''
def f(lst):
    st = set(lst)
    return len(st) == len(lst)
print(f([1, 5, 7, 9]))
print(f([2, 4, 5, 5, 7, 9]))