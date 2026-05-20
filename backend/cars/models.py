from django.db import models
from django.conf import settings


# Create your models here.
class Marca (models.Model):
    nome = models.CharField(max_length = 100, unique = True, verbose_name = "Nome da Marca")
    def __str__ (self):
        return self.nome
    
    class Meta: 
        verbose_name = "Marca"
        verbose_name_plural = "Marcas"
        ordering = ["nome"]

class Carro (models.Model):
    
    class fonte(models.TextChoices):
        EXTERNO = 'externo', 'API Externa'
        USUARIO = 'usuario', 'Anúncio de Usuário'
        INTERNO = 'interno', 'Cadastro Interno'
        
    # Identificacao    
    marca = models.ForeignKey(Marca, on_delete=models.PROTECT,
    related_name ="carros",verbose_name ="Marca"
    )
    modelo = models.CharField(max_length=50, verbose_name = "Modelo")
    ano = models.PositiveIntegerField(verbose_name ="Ano")
    cor = models.CharField(max_length = 20, verbose_name ="Cor")
    preco = models.DecimalField(max_digits =10, decimal_places =2, verbose_name="Preço")
    quilometragem = models.PositiveIntegerField(verbose_name="Quilometragem")
    descricao = models.TextField(blank=True,verbose_name="Descrição")
    imagem = models.ImageField(upload_to="carros/", blank= True, null =True,verbose_name ="Imagem")
    
    anunciante = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, # se o usuário for deletado, tbm deleta os anuncios
    related_name ="Carros_anunciados", verbose_name ="Anunciante") 
    criado_em = models.DateTimeField(auto_now_add =True, verbose_name="Criado em")
    atualizado_em = models.DateTimeField(auto_now =True, verbose_name="Atualizado em")
    
    #controle de origem do anuncio
    fonte = models.CharField(max_length = 10, choices = fonte.choices, default = fonte.EXTERNO)
    id_externo = models.CharField(max_length =200, blank = True, null = True)
    link_origem = models.URLField(blank = True, null = True)
    
    def __str__(self):
        return f"{self.marca} {self.modelo} ({self.ano})"
    
    @property 
    def nome_completo(self):
        return f"{self.marca.nome} {self.modelo}"
    
    class Meta:
        verbose_name = "Carro"
        verbose_name_plural = "Carros"
        ordering = ["-criado_em"]
        

  
        
