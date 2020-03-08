from rest_framework import serializers
from .models import Entry,Output

class EntrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Entry
        fields = ['id','entry_text','date_text']


class OutputSerializer(serializers.ModelSerializer):

    class Meta:
        model = Output
        fields = ['id','output_text','date_text']