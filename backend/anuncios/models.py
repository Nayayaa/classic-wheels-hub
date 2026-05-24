from django.db import models
from django.contrib.auth import get_user_model
from catalogo.models import Marca, Categoria

User = get_user_model()

class Anuncio(models.Model):

    class Fonte(models.TextChoices):
        MERCADO_LIVRE = 'mercadolivre', 'Mercado Livre'
        OLX           = 'olx', 'OLX'
        WEBMOTORS     = 'webmotors', 'Webmotors'
        USUARIO       = 'usuario', 'Anúncio de Usuário'

    class Status(models.TextChoices):
        ATIVO   = 'ativo',   'Ativo'
        VENDIDO = 'vendido', 'Vendido'
        PAUSADO = 'pausado', 'Pausado'
        
    # Relacionamentos
    marca = models.ForeignKey(
        Marca, on_delete=models.PROTECT,
        verbose_name="Marca"
    )
    categoria = models.ForeignKey(
        Categoria, on_delete=models.PROTECT,
        verbose_name="Categoria", blank = True, null = True
    )
    anunciante = models.ForeignKey(
        User, on_delete=models.SET_NULL,
        related_name="anuncios",
        verbose_name="Anunciante", blank=True, null = True
    )
    
    # Dados do veículo
    modelo = models.CharField(max_length=100, verbose_name="Modelo")
    ano = models.PositiveIntegerField(verbose_name="Ano")
    cor = models.CharField(max_length=50, blank=True, verbose_name="Cor")
    
    combustivel = models.CharField(max_length=50, blank=True,
            verbose_name="Combustível"
            )
    cambio = models.CharField(max_length=50, blank=True, verbose_name="Câmbio")
    
    quilometragem = models.PositiveIntegerField(
        null=True, blank=True, 
        verbose_name="Quilometragem"
        )
    
    # Dados do anúncio
    titulo = models.CharField(max_length=200, verbose_name="Título")
    descricao = models.TextField(blank=True, verbose_name="Descrição")
    
    preco = models.DecimalField(
        max_digits=10, decimal_places=2, 
         verbose_name="Preço"
         )
    fonte = models.CharField(
        max_length=20, 
        choices=Fonte.choices,
        default=Fonte.USUARIO
     ) # PARA FILTRO Ex: 'mercadolivre', 'olx', 'webmotors', 'usuario'
    
    imagem = models.ImageField(
        upload_to="anuncios/", blank=True, 
        null=True, verbose_name="Imagem"
    )
    status    = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.ATIVO
    )
    # Web Scraping - armazena resposta completa da API/scraping
    dados_externos = models.JSONField(
        default=dict, blank=True, 
        verbose_name="Dados de Scraping (JSON completo)"
    )
    
    # Timestamps
    criado_em = models.DateTimeField(
        auto_now_add=True, verbose_name="Criado em"
    )
    atualizado_em = models.DateTimeField(
        auto_now=True, verbose_name="Atualizado em"
    )
    class Meta:
        ordering = ["-criado_em"]

    def __str__(self):
        return f"{self.marca.nome} {self.modelo} ({self.ano})"