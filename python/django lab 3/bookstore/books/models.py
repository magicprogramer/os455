from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
import random
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
def validate_title_length(value):
    if not (10 <= len(value) <= 50):
        raise ValidationError('Book title must be between 10 and 50 characters.')

def validate_category_name(value):
    if len(value) < 2:
        raise ValidationError('Category name must be at least 2 characters.')

class Category(models.Model):
    name = models.CharField(max_length=100, validators=[validate_category_name])

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=100, validators=[validate_title_length])
    rate = models.IntegerField(default=1)
    desc = models.TextField()
    views = models.IntegerField(default=0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    categories = models.ManyToManyField(Category)

    def __str__(self):
        return self.title

class ISBN(models.Model):
    book = models.OneToOneField(Book, on_delete=models.CASCADE)
    author_title = models.CharField(max_length=100)
    book_title = models.CharField(max_length=100)
    isbn_number = models.CharField(max_length=13, unique=True, editable=False)

    def save(self, *args, **kwargs):
        if not self.isbn_number:
            self.isbn_number = self.generate_isbn()
        super().save(*args, **kwargs)

    def generate_isbn(self):
        return ''.join([str(random.randint(0, 9)) for _ in range(13)])

    def __str__(self):
        return f"{self.book_title} ({self.isbn_number})"

@receiver(post_save, sender=Book)
def create_isbn_for_book(sender, instance, created, **kwargs):
    if created and not hasattr(instance, 'isbn'):
        from .models import ISBN
        ISBN.objects.create(book=instance, author_title='Unknown', book_title=instance.title)