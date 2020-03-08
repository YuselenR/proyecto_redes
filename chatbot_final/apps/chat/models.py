from django.db import models
from apps.articulos.models import Article

class Entry(models.Model):
    id = models.AutoField(primary_key = True)
    entry_text = models.CharField('texto de entrada', max_length=255)
    date_text = models.DateField('fecha de entrada', auto_now=False, auto_now_add=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, blank=True, null=True)


    def __str__(self):
        return self.entry_text

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Entrada'
        verbose_name_plural = 'Entradas'


class Output(models.Model):
    id = models.AutoField(primary_key=True)
    output_text = models.CharField('Salida de texto', max_length=255)
    date_text = models.DateField('fecha de salida', auto_now=False, auto_now_add=True)
    entry_fk = models.ForeignKey(Entry, on_delete=models.CASCADE)
    

    class Meta:
        verbose_name = ("Output")
        verbose_name_plural = ("Outputs")

    def __str__(self):
        return 'id:{0}/ text:{1}/ relation:{2}'.format(self.id, self.output_text, self.entry_fk)


