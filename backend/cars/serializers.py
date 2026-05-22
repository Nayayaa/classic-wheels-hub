from rest_framework import serializers
from .models import Marca, Carro

class MarcaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Marca
        fields = ['id','nome']
        
        

class CarroSerializer(serializers.ModelSerializer):
    
    marca_nome = serializers.CharField(source='marca.nome', read_only=True)
    
    class Meta:
        model = Carro
        fields = ['id',
            'marca',        # envia o ID (para criar/editar)
            'marca_nome',   # envia o nome legível (para exibir no front
            'modelo',
            'ano',
            'cor',
            'preco',
            'quilometragem',
            'descricao',
            'imagem',
            'anunciante',
            'criado_em',]   
        
        read_only_fields = ['anunciante', 'criado_em']
        
        