from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:book_id>', views.detail, name='details'),
    path('<int:book_id>/edit', views.edit, name='edit'),
    path('<int:book_id>/delete', views.delete, name='delete'),
    path('add', views.add, name='add'),
]
