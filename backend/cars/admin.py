from django.contrib import admin
from .models import Marca, Carro


@admin.register(Marca)
class MarcaAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome']
    search_fields = ['nome']


@admin.register(Carro)
class CarroAdmin(admin.ModelAdmin):
    list_display = ['id', 'marca', 'modelo', 'ano', 'cor', 'preco', 'anunciante', 'criado_em']
    list_filter = ['marca', 'ano', 'fonte']
    search_fields = ['modelo', 'marca__nome']
