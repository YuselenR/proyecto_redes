from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import ArticleSerializer
from .models import Article
# Create your views here.

class ArticleViewSet(ListAPIView):

    queryset = Article.objects.all()
    serializer_class = ArticleSerializer