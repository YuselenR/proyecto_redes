from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import EntrySerializer,OutputSerializer
from .models import Entry,Output
import random, json

class EntryViewSet(ListAPIView):

    queryset = Entry.objects.all()
    serializer_class = EntrySerializer

class OutputViewSet(ListAPIView):
    serializer_class = OutputSerializer

    def get_queryset(self):
        pk = self.kwargs['id']
        out = Output.objects.filter(entry_fk = pk)
        count = len(out) #len cantidad de datos que estan en la lista
        return out

    