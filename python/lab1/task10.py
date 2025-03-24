s = input("enter string \n")
letters = 0
digits = 0
for i in s:
    if i >= '0' and i <= '9':
        digits += 1
    elif (i >= 'a' and i <= 'z') or (i >= 'A' and i <= 'Z'):
        letters += 1
print(f"number of letters {letters}")
print(f"number of digits {digits}")  