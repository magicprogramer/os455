'''
2- Consider dividing a string into two halves
Case1:
The length is even, the front and back halves are the same length.
Case2:
The length is odd, we’ll say that the extra char goes in the front half.
E.g. ‘abced’, the front half is ‘abc’, the back half’de.
Given 2 strings, a and b, return a string of the form:
(a-front + b-front) + (a-back +b-back)

'''
def halves(s):
    n = len(s)
    if (n & 1):
        return s[:n // 2 + 1], s[n // 2 + 1 : n]
    else:
        return s[:n // 2], s[n // 2 : n]
a = input("enter string a \n")
b = input("enter string b \n")
a_front, a_back = halves(a)
b_front, b_back = halves(b)
print(a_front, a_back)
print(b_front, b_back)
print(f"({a_front} + {b_front}) + ({a_back} + {b_back})")