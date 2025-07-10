from django.contrib import admin
from .models import Book, Category, ISBN

class ISBNInline(admin.StackedInline):
    model = ISBN
    extra = 0

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'rate', 'views', 'user')
    list_filter = ('user', 'categories')
    search_fields = ('title',)
    inlines = [ISBNInline]

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(ISBN)
class ISBNAdmin(admin.ModelAdmin):
    list_display = ('book', 'author_title', 'book_title', 'isbn_number')
    search_fields = ('book_title', 'isbn_number')