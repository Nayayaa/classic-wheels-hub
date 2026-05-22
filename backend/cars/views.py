from rest_framework import viewsets, permissions, filters
from .models import Marca, Carro
from .serializers import MarcaSerializer, CarroSerializer


class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CarroViewSet(viewsets.ModelViewSet):
    queryset = Carro.objects.all()
    serializer_class = CarroSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['modelo', 'marca__nome', 'cor']
    ordering_fields = ['ano', 'preco', 'quilometragem', 'criado_em']

    def get_queryset(self):
        qs = Carro.objects.all()
        marca = self.request.query_params.get('marca')
        ano = self.request.query_params.get('ano')
        if marca:
            qs = qs.filter(marca__nome__icontains=marca)
        if ano:
            qs = qs.filter(ano=ano)
        return qs

    def perform_create(self, serializer):
        serializer.save(anunciante=self.request.user)
