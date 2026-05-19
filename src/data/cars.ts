import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import car5 from "@/assets/car-5.jpg";
import car6 from "@/assets/car-6.jpg";

export type Listing = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  type: "venda" | "aluguel";
  city: string;
  state: string;
  km: number;
  image: string;
  description: string;
  seller: string;
};

export const cars: Listing[] = [
  {
    id: "1",
    title: "Chevrolet Bel Air 1957",
    brand: "Chevrolet",
    model: "Bel Air",
    year: 1957,
    price: 285000,
    type: "venda",
    city: "São Paulo",
    state: "SP",
    km: 89000,
    image: car1,
    description:
      "Bel Air totalmente restaurado, motor original revisado, pintura turquesa de fábrica. Documentação em dia, placa preta.",
    seller: "Garagem Clássicos SP",
  },
  {
    id: "2",
    title: "Ford Maverick GT 1974",
    brand: "Ford",
    model: "Maverick GT",
    year: 1974,
    price: 165000,
    type: "venda",
    city: "Belo Horizonte",
    state: "MG",
    km: 120000,
    image: car2,
    description:
      "Maverick GT V8 302, amarelo competição, lataria impecável, mecânica revisada. Carro de colecionador.",
    seller: "Antônio Carvalho",
  },
  {
    id: "3",
    title: "VW Fusca 1300 1970",
    brand: "Volkswagen",
    model: "Fusca",
    year: 1970,
    price: 38000,
    type: "venda",
    city: "Curitiba",
    state: "PR",
    km: 95000,
    image: car3,
    description:
      "Fusca bege original, segundo dono, manuais e nota fiscal originais. Pronto para rodar.",
    seller: "José Almeida",
  },
  {
    id: "4",
    title: "Chevrolet Opala Comodoro 1976",
    brand: "Chevrolet",
    model: "Opala Comodoro",
    year: 1976,
    price: 95000,
    type: "venda",
    city: "Porto Alegre",
    state: "RS",
    km: 78000,
    image: car4,
    description:
      "Opala 6 cilindros, verde britânico, interior em couro restaurado. Joia rara para colecionador.",
    seller: "Clube Opala RS",
  },
  {
    id: "5",
    title: "Puma GTE 1973",
    brand: "Puma",
    model: "GTE",
    year: 1973,
    price: 220000,
    type: "aluguel",
    city: "Rio de Janeiro",
    state: "RJ",
    km: 65000,
    image: car5,
    description:
      "Puma GTE vermelho, motor VW 1600. Disponível para aluguel em eventos, ensaios e casamentos.",
    seller: "Eventos Vintage RJ",
  },
  {
    id: "6",
    title: "Willys Interlagos 1965",
    brand: "Willys",
    model: "Interlagos",
    year: 1965,
    price: 480000,
    type: "venda",
    city: "Campinas",
    state: "SP",
    km: 42000,
    image: car6,
    description:
      "Interlagos prata, exemplar raro, restauração concursal. Um dos poucos remanescentes no Brasil.",
    seller: "Coleção Privada",
  },
];

export const brands = Array.from(new Set(cars.map((c) => c.brand))).sort();

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}