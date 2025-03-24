import random
def play(trys):
    st = set()
    n = random.randint(1, 100)
   # print(n)
    found = False
    while trys:
        trys -= 1
        g = int(input("guess the number \n"))
        print(g)
        if (g > 100):
            print("enter a number less than or equal 100")
            trys += 1
            continue
        prv_len = len(st)
        st.add(g)
        if len(st) == prv_len:
            trys += 1
            print("you made this guess before")
            continue
        if g == n:
            found = True
            break
        if g > n:
            print("the number is less than your number")
        else :
            print("the number is greater than your number")
    if found:
        print("you found the number \n")
    if trys:
        play(trys)
    else:
        print(f"number was {n}")
        c = input("game over want to play again? enter 1\n")
        if c == "1":
            play(10)
play(10)
            





'''
5- Gusses game
● Your game generates a random number and gives only 10 tries for the user to
guess that number.
● Get a user input and compare it with the random number
● Display a hit message to the user in case the use number is smaller or bigger of
the random number
● If the user type number is out of range(100), display a message that is not allowed
and don’t count this as try.
● If user type a number that has been entered before, display a hint message and
don’t count this as try
● In case the user entered a correct number within the 10 tries, display a
congratulations message and let your application guess another random number
with the remain number of tries
● If the user finishes all his tries, display a message to ask him if he wants to play
again or not.
'''