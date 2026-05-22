# Classic Wheels Hub

Plataforma para listagem e anúncio de carros clássicos. O projeto é dividido em backend (Django REST Framework) e frontend (React + Vite).

---

## Tecnologias

**Backend**
- Python + Django 5.2
- Django REST Framework
- django-cors-headers
- python-decouple
- SQLite (desenvolvimento)

**Frontend**
- React 19 + TypeScript
- Vite
- TanStack Router
- Tailwind CSS + shadcn/ui

---

## Como clonar e instalar

```bash
git clone <url-do-repositorio>
cd classic-wheels-hub
```

---

## Rodar o backend

**1. Entrar na pasta e criar o ambiente virtual:**
```bash
cd backend
python -m venv venv
```

**2. Ativar o ambiente virtual:**

Windows:
```powershell
.\venv\Scripts\Activate.ps1
```

Linux/Mac:
```bash
source venv/bin/activate
```

**3. Instalar as dependências:**
```bash
pip install -r requirements.txt
```

**4. Criar o arquivo `.env`** (copie o `.env.example` e preencha):
```bash
cp .env.example .env
```

Conteúdo do `.env`:
```
SECRET_KEY=sua-chave-secreta-aqui
DEBUG=True
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

**5. Aplicar as migrations:**
```bash
py manage.py migrate
```

**6. Criar superuser (para acessar o admin):**
```bash
py manage.py createsuperuser
```

**7. Rodar o servidor:**
```bash
py manage.py runserver
```

O backend estará disponível em `http://127.0.0.1:8000`

---

## Rodar o frontend

Em outro terminal, na raiz do projeto:

```bash
bun install
bun dev
```

O frontend estará disponível em `http://localhost:5173`

---

## Endpoints da API

Base URL: `http://127.0.0.1:8000/api/`

### Marcas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/marcas/` | Lista todas as marcas |
| POST | `/api/marcas/` | Cria uma nova marca |
| GET | `/api/marcas/{id}/` | Detalhe de uma marca |
| PUT | `/api/marcas/{id}/` | Atualiza uma marca |
| DELETE | `/api/marcas/{id}/` | Remove uma marca |

### Carros

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/carros/` | Lista todos os carros |
| POST | `/api/carros/` | Cria um novo anúncio |
| GET | `/api/carros/{id}/` | Detalhe de um carro |
| PUT | `/api/carros/{id}/` | Atualiza um anúncio |
| DELETE | `/api/carros/{id}/` | Remove um anúncio |

### Filtros disponíveis em `/api/carros/`

| Parâmetro | Exemplo | Descrição |
|-----------|---------|-----------|
| `search` | `?search=mustang` | Busca por modelo, marca ou cor |
| `marca` | `?marca=ford` | Filtra por nome da marca |
| `ano` | `?ano=1969` | Filtra por ano |
| `ordering` | `?ordering=preco` | Ordena por preço, ano, quilometragem ou data |

### Admin

`http://127.0.0.1:8000/admin` — interface de administração Django
