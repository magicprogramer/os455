def solve(lst):
    lst2 = []
    n = len(lst)
    for i in range(n):
        if len(lst2) == 0 or lst2[-1] != lst[i]:
            lst2.append(lst[i])
    return lst2
lst1 = [1, 2, 3, 3]
lst2 = [1, 1, 1, 2, 2, 2, 1 ,1, 1, 1]
print(solve(lst1))
print(solve(lst2))