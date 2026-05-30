from rest_framework import viewsets, status, filters, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Anuncio
from .serializers import AnuncioSerializer, FotoAnuncioSerializer
import requests
from rest_framework.parsers import MultiPartParser




class AnuncioViewSet(viewsets.ModelViewSet):
    
    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['modelo', 'marca__nome', 'categoria__nome', 'cor']
    ordering_fields = ['ano', 'preco', 'quilometragem', 'criado_em']

    def get_queryset(self):
        queryset         = Anuncio.objects.all()
        marca            = self.request.query_params.get('marca')
        categoria        = self.request.query_params.get('categoria')
        ano              = self.request.query_params.get('ano')
        portal           = self.request.query_params.get('portal')
        status_filtro    = self.request.query_params.get('status')
        

        if marca:
            queryset = queryset.filter(marca__nome__icontains=marca)
        if categoria:
            queryset = queryset.filter(categoria__nome__icontains=categoria)
        if ano:
            queryset = queryset.filter(ano=ano)
        if portal:
            queryset = queryset.filter(portal__id=portal)

        if status_filtro:
            queryset = queryset.filter(status=status_filtro)

        return queryset

    def perform_create(self, serializer):
        serializer.save(anunciante=self.request.user)

    @action(detail=False, methods=['get'], url_path='buscar-ml')
    def buscar_ml(self, request):
        """
        Busca carros no Mercado Livre em tempo real.
        GET /api/anuncios/buscar-ml/?q=fusca
        GET /api/anuncios/buscar-ml/?q=opala&ordem=preco_asc
        """
        query = request.query_params.get('q', '')
        if not query:
            return Response(
                {"erro": "Parâmetro 'q' é obrigatório"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            resp = requests.get(
                "https://api.mercadolibre.com/sites/MLB/search",
                params={
                    "q":        f"carro classico {query}",
                    "category": "MLB1744",
                    "limit":    20,
                    "sort":     "price_asc",
                },
                timeout=5
            )
            resp.raise_for_status()
            dados = resp.json()

            resultados = []
            for item in dados.get("results", []):
                atributos = {
                    a["id"]: a.get("value_name", "")
                    for a in item.get("attributes", [])
                }
                resultados.append({
                    "titulo":        item.get("title"),
                    "preco":         item.get("price"),
                    "ano":           atributos.get("VEHICLE_YEAR"),
                    "quilometragem": atributos.get("KILOMETERS"),
                    "combustivel":   atributos.get("FUEL_TYPE"),
                    "cambio":        atributos.get("TRANSMISSION"),
                    "cor":           atributos.get("COLOR"),
                    "link_origem":   item.get("permalink"),
                    "imagem":        item.get("thumbnail"),
                    "fonte":         "mercadolivre",
                    "condicao":      item.get("condition"),
                    "localizacao":   item.get("address", {}).get("state_name", ""),
                })

            return Response({
                "query":      query,
                "total":      dados.get("paging", {}).get("total", 0),
                "resultados": resultados
            })

        except requests.Timeout:
            return Response(
                {"erro": "O Mercado Livre demorou para responder. Tente novamente."},
                status=status.HTTP_504_GATEWAY_TIMEOUT
            )
        except Exception as e:
            return Response(
                {"erro": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class PortalViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Portal.objects.filter(ativo=True)
    serializer_class = PortalSerializer
    permission_classes = [AllowAny]



@action(
    detail=True,methods=['post'], 
    url_path = 'fotos',
    parser_classes=[MultiPartParser]
    )

def upload_foto (self, request, pk = None):
    
    anuncio = self.get_object()
    serializer = FotoAnuncioSerializer (data=request.data)
     if serializer.is_valid():
         serializer.save(anuncio =anuncio)
         return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)