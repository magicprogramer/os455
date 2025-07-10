from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
import uuid
from .models import Book, Category, ISBN
from django.contrib.auth.decorators import login_required, permission_required
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
@login_required
@permission_required('books.change_book', raise_exception=True)
def edit(request, book_id):
    if request.method == 'GET':
        book = Book.objects.get(id=book_id)
        categories = Category.objects.all()
        return render(request, 'edit.html', {
            'book' : book,
            'categories': categories
        })
    else:
        title = request.POST['title']
        rate = request.POST['rate']
        desc = request.POST['desc']
        category_ids = request.POST.getlist('categories')
        book = Book.objects.get(id=book_id)
        book.title = title
        book.rate = rate
        book.desc = desc
        try:
            book.full_clean()
            book.save()
            book.categories.set(category_ids)
            return redirect('/books')
        except Exception as e:
            categories = Category.objects.all()
            return render(request, 'edit.html', {'book': book, 'categories': categories, 'error': str(e)})
@login_required
def delete(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        try:
            book.isbn.delete()
        except Exception:
            pass
        book.delete()
    except Book.DoesNotExist:
        pass
    return redirect('/books')
@login_required
def add(request):
    if request.method == 'GET':
        print(request.user)
        categories = Category.objects.all()
        return render(request, 'add.html', {'categories': categories})
    else:
        title = request.POST['title']
        rate = request.POST['rate']
        desc = request.POST['desc']
        category_ids = request.POST.getlist('categories')
        author_title = request.POST.get('author_title')
        isbn_book_title = request.POST.get('isbn_book_title')
        book = Book(title=title, rate=rate, desc=desc, user=request.user)
        try:
            book.full_clean()
            book.save()
            book.categories.set(category_ids)
            ISBN.objects.create(book=book, author_title=author_title, book_title=isbn_book_title)
            return redirect('/books')
        except Exception as e:
            categories = Category.objects.all()
            return render(request, 'add.html', {'error': str(e), 'categories': categories})
def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('/books')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})