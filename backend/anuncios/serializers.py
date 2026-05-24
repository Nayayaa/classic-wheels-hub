from rest_framework import serializers
from .models import Anuncio


class AnuncioSerializer(serializers.ModelSerializer):
    
    marca_nome = serializers.CharField(source='marca.nome', read_only=True)
    categoria_nome = serializers.CharField(source='categoria.nome', read_only=True)
    
    class Meta:
        model = Anuncio
        fields = [
            'id',
            'marca',              # ID para criar/editar
            'marca_nome',         # Nome legível
            'categoria',          # ID para criar/editar
            'categoria_nome',     # Nome legível
            'modelo',
            'ano',
            'cor',
            'combustivel',
            'cambio',
            'quilometragem',
            'titulo',
            'descricao',
            'preco',
            'imagem',
            'dados_externos',     # JSON do scraping
            'anunciante',
            'criado_em',
            'atualizado_em',
        ]   
        
        read_only_fields = ['anunciante', 'criado_em', 'atualizado_em']
        