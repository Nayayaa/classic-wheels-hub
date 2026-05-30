from rest_framework import serializers
from .models import Anuncio, FotoAnuncio, Portal, Cidade, Estado


class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        field = ["id", "nome", "uf"]



class CidadeSerialiazer (serializers.ModelSerializer):
    class Meta:
        model = Cidade
        fields = ["id", "nome", "estado"]
        
        
class PortalSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Portal
        fields = ['id','nome']
class FotoAnuncioSerializer(serializers.ModelSerializer):
    """
    Serializer para Fotos de Anúncio.
    Retorna: imagem, ordem
    """
    class Meta:
        model = FotoAnuncio
        fields = ['id', 'imagem', 'ordem']
        read_only_fields = ['id']


class AnuncioSerializer(serializers.ModelSerializer):
    
    marca_nome = serializers.CharField(source='marca.nome', read_only=True)
    categoria_nome = serializers.CharField(source='categoria.nome', read_only=True)
    fotos = FotoAnuncioSerializer(many=True, read_only=True)  # Adiciona multiplas fotos
    portal_nome = serializers.CharField(source='portal.nome', read_only=True)
    portal  = serializers.PrimaryKeyRelatedField(
        queryset= Portal.objects.all(),
        write_only= True                   # ISso permite receber o portal
    )
    class Meta:
        model = Anuncio
        fields = [
            'id',
            'placa_preta'
            'portal'
            'portal_nome',
            'marca',
            'marca_nome',
            'categoria',
            'categoria_nome',
            'modelo',
            'ano',
            'cor',
            'combustivel',
            'cambio',
            'quilometragem',
            'titulo',
            'descricao',
            'preco',
            'fotos',             
            'dados_externos',
            'anunciante',
            'status',
            'criado_em',
            'atualizado_em',
        ]   
        
        read_only_fields = ['anunciante', 'criado_em', 'atualizado_em', 'fotos', 'status']
        