from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
import uuid
from .models import Book
# Create your views here.

def index(request):
    books = Book.objects.all()
    return render(request, 'index.html', {
        'books' : books
    })
def detail(request, book_id):
    book = Book.objects.get(id=book_id)
    return render(request, 'details.html', {
        'book' : book
    })
def edit(request, book_id):
    if request.method == 'GET':
        book = Book.objects.get(id=book_id)
        print(book.title)
        return render(request, 'edit.html', {
            'book' : book
        })
    else:
        title = request.POST['title']
        rate = request.POST['rate']
        desc = request.POST['desc']
        book = Book.objects.get(id=book_id)
        book.title = title
        book.rate = rate
        book.desc = desc
        book.save()

        return redirect('/books')
def delete(request, book_id):
    for b in books:
        if b['id'] == book_id:
            books.remove(b)
            break
    return redirect('/books')
def add(request):
    if request.method == 'GET':
        print("add")
        return render(request, 'add.html')
    else:
        title = request.POST['title']
        rate = request.POST['rate']
        desc = request.POST['desc']
        book = Book(title=title, rate=rate, desc=desc)
        book.save()
        return redirect('/books')