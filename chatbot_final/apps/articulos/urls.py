from django.urls import path
from .views import ArticleViewSet
urlpatterns = [
    path('articulo/', ArticleViewSet.as_view(), name='articulo')
]
