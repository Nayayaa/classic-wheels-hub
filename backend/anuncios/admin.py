from django.contrib import admin
from .models import Anuncio


@admin.register(Anuncio)
class AnuncioAdmin(admin.ModelAdmin):
    list_display = ['id', 'marca', 'modelo', 'ano', 'preco', 'anunciante', 'categoria', 'criado_em']
    list_filter = ['marca', 'categoria', 'ano',]
    search_fields = ['modelo', 'marca__nome', 'categoria__nome']
    readonly_fields = ['criado_em', 'atualizado_em']
