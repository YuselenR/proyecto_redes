from django.db import models

# Create your models here.
class Article(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField('nombre del articulo', max_length=100)
    stock = models.IntegerField('Cantidad del articulo')
    price = models.DecimalField('Precio del articulo', max_digits=10, decimal_places=2)
    description = models.TextField('Descripcion del articulo')


    class Meta:
        """Meta definition for Articulo."""

        verbose_name = 'Article'
        verbose_name_plural = 'Articles'

    def __str__(self):
        """Unicode representation of Articulo."""
        return self.name