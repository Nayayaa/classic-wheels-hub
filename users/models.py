from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    telefone = models.CharField(
        max_length=15, blank=True,
        verbose_name="Telefone"
    )
    data_de_nascimento = models.DateField(
        null=True, blank=True,
        verbose_name="Data de Nascimento"
    )
    foto_perfil = models.ImageField(
        upload_to='fotos_perfil/', blank=True,
        null=True, verbose_name='Foto de Perfil'
    )
    cpf = models.CharField(
        max_length=14, unique=True,
        blank=True, null=True,
        verbose_name='CPF'
    )

    def __str__(self):
        return self.username