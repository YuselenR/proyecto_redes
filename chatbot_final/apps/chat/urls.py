from django.urls import path
from .views import EntryViewSet, OutputViewSet

urlpatterns = [
    path('entry/', EntryViewSet.as_view(), name='entry'),
    path('output/<id>', OutputViewSet.as_view(), name='output')
]
