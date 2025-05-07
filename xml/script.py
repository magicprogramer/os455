from lxml import etree
parser = etree.XMLParser(dtd_validation=True)
tree = etree.parse("employee.xml", parser)
emps = tree.getroot().findall("employee")
for emp in emps:
    print("emp name is " + emp.get("name"))
    print("email is " + emp.get("e-mail"))
    phones = emp.find("phones").findall("phone")
    l = 1
    for phone in phones:
        print("phone ", l, " : ",phone.text)
        l += 1

##print(etree.tostring(tree, pretty_print=True).decode())