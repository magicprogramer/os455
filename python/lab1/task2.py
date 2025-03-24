n = int(input("enter n "))
ans = 0
for i in range(3):
    ans += n
    n = n * 10 + 5
print(f"expected value {ans}")