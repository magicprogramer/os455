from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
import uuid

# Create your views here.
books = [
    {
        'id' : 1,
        "name" : 'b1',
        "price" : 32,
        'description' : 'this is book 1'
    },
    {
        'id' : 2,
        "name" : "b2",
        "price" : 200,
        'description' : 'this is book 2'
    }
]
def index(request):
    return render(request, 'index.html', {
        'books' : books
    })
def detail(request, book_id):
    book = None
    for b in books:
        if b['id'] == book_id:
            book = b
            break
    return render(request, 'details.html', {
        'book' : book
    })
def edit(request, book_id):
    if request.method == 'GET':
        book = None
        for b in books:
            if b['id'] == book_id:
                book = b
                break
        return render(request, 'edit.html', {
            'book' : book
        })
    else:
        name = request.POST['name']
        price = request.POST['price']
        description = request.POST['description']
        for b in books:
            if b['id'] == book_id:
                b['name'] = name
                b['price'] = price
                b['description'] = description
                break
        return redirect('/books')
def delete(request, book_id):
    for b in books:
        if b['id'] == book_id:
            books.remove(b)
            break
    return redirect('/books')
def add(request):
    if request.method == 'GET':
        return render(request, 'add.html')
    else:
        name = request.POST['name']
        price = request.POST['price']
        description = request.POST['description']
        books.append({
            'id' : uuid.uuid4().int,
            'name' : name,
            'price' : price,
            'description' : description
        })
        return redirect('/books')