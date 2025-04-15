from mysql.connector import connect, Error  
class Employee:
    __emp_list = []
    def fill_list():
        emps = Database.getall()
        for emp in emps:
            if emp[6] == '-1':
                e = Employee(emp[1], emp[2], emp[3], emp[4], emp[5])
            else:
                e = Manager(emp[1], emp[2], emp[3], emp[4], emp[5], emp[6])
            Employee.__emp_list.append(e)
    def list_employees():
        for emp in Employee.__emp_list:
            emp.show()
    def fire(self):
        Employee.__emp_list = [emp for emp in Employee.__emp_list if emp.first_name != self.first_name 
                                or emp.last_name != self.last_name]
        Database.delete(self)
    def __init__(self, fn="none", ln="none", age=18,dep=1, salary=2000):
        print(isinstance(self, Manager))
        self.__first_name = fn
        self.__last_name = ln
        self.__age = age
        self.__dep = dep 
        self.__salary = salary
        print(Employee.__emp_list, end=" - ")
        Employee.__emp_list.append(self)
        Database.insert(self)
    @property
    def first_name(self):
        return self.__first_name
    @first_name.setter
    def first_name(self, fn):
        self.__first_name = fn
    @property
    def last_name(self):
        return self.__last_name
    @last_name.setter
    def last_name(self, ln):
        self.__last_name=ln
    @property
    def age(self):
        return self.__age
    @age.setter
    def age(self, age):
        self.__age=age
    @property
    def dep(self):
        return self.__dep
    @dep.setter
    def dep(self, dep):
        self.__dep=dep
    @property
    def salary(self):
        return self.__salary
    @salary.setter
    def salary(self, salary):
        self.__salary=salary
    def show(self):
        print(self.first_name)
        print(self.last_name)
        print(self.age)
        print(self.dep)
        print(self.salary)
    def transfer(self, dep):
        self.dep = dep
        Database.update(self)
        print(Database.getall())
class Manager(Employee):
    def __init__(self, fn="none", ln="none", age=18,dep='1', salary=2000, managed_dep='1'):
        print("manager")
        self.__managed_dep = managed_dep
        super().__init__(fn, ln, age, dep, salary)
    @property
    def managed_dep(self):
        return self.__managed_dep
    @managed_dep.setter
    def managed_dep(self, dep):
        self.__managed_dep = dep
    def show(self):
        print(self.first_name)
        print(self.last_name)
        print(self.age)
        print(self.dep)
        print("confidential")
 
        

class Database:
    c = None
    def connection():
        try:
            Database.c = connect(
                
                    host = "localhost",
                    user="root",
                    password = "",
                    port = "3307",
                    database ="db"
            )
            print("connected")
        except Error as e:
            print(e)
    def create_tables():
        try:
            if (Database.c == None):
                Database.connection()
            cur = Database.c.cursor() 
            cur.execute('''
                        create table if not exists employee(
                            id int auto_increment primary key,
                            first_name varchar(100) not null,
                            last_name varchar(100) not null,
                            age float,
                            department varchar(10),
                            salary float,
                            managed_dep varchar(20),
                            unique(first_name, last_name)

                        );
                        
                        ''')
            Database.c.commit()
        except Error as e:
            print(e)
    def insert (e):
        try:
            managed_dep = '-1'
            if (Database.c == None):
                Database.connection()
            if (isinstance(e, Manager)):
                print("Manager")
                managed_dep = e.managed_dep
                print(managed_dep)
            cur = Database.c.cursor()
            print(repr((e.first_name, e.last_name, e.age, e.salary, e.dep, managed_dep)))
            cur.execute('''
                    select * from employee where first_name= %s and last_name = %s and
                           age = %s and salary = %s and department = %s and managed_dep = %s
                           ''',
                             (e.first_name, e.last_name, e.age, e.salary, e.dep, managed_dep))
            if (cur.fetchone()):
                print("already exist")
                return
                
            cur.execute('''
                        insert into employee(
                        first_name, last_name, age, salary,
                        department, managed_dep
                        )
                        values(%s, %s, %s, %s, %s, %s)
                        ''',
                        (e.first_name, e.last_name, e.age, e.salary, e.dep, ""+managed_dep)                        
                        )
            Database.c.commit()
            print("done")
        except Error as e:
            print(e)
    def update (e):
        print("try")
        try:
            if (Database.c == None):
                Database.connection()
            cur = Database.c.cursor()
            managed_dep = -1
            if (isinstance(e, Manager)):
                managed_dep = e.managed_dep
            print(repr((e.first_name, e.last_name, e.age, e.salary, e.dep, managed_dep)))
            cur.execute('''
                        update employee set department = %s where first_name = %s and last_name = %s
                       ''', (e.dep, e.first_name, e.last_name))
            Database.c.commit()
            print("done")
        except Error as e:
            print(e)
    def getall():
        if (Database.c == None):
            Database.connection()
        cur = Database.c.cursor()
        cur.execute('''
                        select * from employee
                          ''')
        print("OK")
        return cur.fetchall()
    def delete(self):
        if (Database.c == None):
            Database.connection()
        cur = Database.c.cursor()
        print("delete", self.first_name, self.last_name)
        cur.execute('''
            delete from employee where first_name = %s and last_name = %s
                    ''', (self.first_name, self.last_name))
        Database.c.commit()
Database.connection()
Database.create_tables()
Employee.fill_list()