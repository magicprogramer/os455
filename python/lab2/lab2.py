from tables.classes import *
if __name__ == '__main__':
    while (True):
        c = input("write Add for adding a new employee \nwrite q for exiting\n")
        if (c == "q"):
            break
        else:
            c = input("enter m for adding a manager or e for adding an employee m : ")
            first_name = last_name = age = salary = dep = manage_dep = None
            while not first_name:
                first_name = input("enter first name >>")
            while not last_name:
                last_name = input("enter last name >>")
            while not age:
                try:
                    age = input("enter your age >> ")
                    age = int(age)
                except :
                    age = None
            while not salary:
                try:
                    salary = input("enter salary >> ")
                    salary = float(salary)
                except:
                    salary = None
            if c == "m":
                while not manage_dep:
                    manage_dep = input("enter managed department")
            if c == "e":
                e = Employee(first_name, last_name, age, dep, salary)
            else:
                m = Manager(first_name, last_name, age, dep, salary, manage_dep)