import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import car5 from "@/assets/car-5.jpg";
import car6 from "@/assets/car-6.jpg";
import car7 from "@/assets/car-7.jpg";
import car8 from "@/assets/car-8.jpg";

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
  blackPlate?: boolean;
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
    blackPlate: true,
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
    title: "Ford Belina 1.8 GLX 1990",
    brand: "Ford",
    model: "Belina 1.8 GLX",
    year: 1990,
    price: 42000,
    type: "venda",
    city: "Rio de Janeiro",
    state: "RJ",
    km: 123000,
    image: car5,
    description:
      "Belina 1.8 GLX 1990, motor revisado, interior bem conservado e pronta para rodar.",
    seller: "Clássicos RJ",
  },
  {
    id: "6",
    title: "Chevrolet Kadett GSi 1992",
    brand: "Chevrolet",
    model: "Kadett GSi",
    year: 1992,
    price: 68000,
    type: "venda",
    city: "Campinas",
    state: "SP",
    km: 98000,
    image: car6,
    description:
      "Kadett GSi 1992 com acabamento esportivo, mecânica revisada e documentação em ordem.",
    seller: "Coleção Privada",
  },
  {
    id: "7",
    title: "Ford Mustang Mach 1 1969",
    brand: "Ford",
    model: "Mustang Mach 1",
    year: 1969,
    price: 520000,
    type: "venda",
    city: "São Paulo",
    state: "SP",
    km: 87000,
    image: car7,
    description:
      "Mustang Mach 1 1969 V8, restauro completo, motor potente e detalhes originais.",
    seller: "Mustang Garage",
  },
  {
    id: "8",
    title: "Chevrolet C10 1970",
    brand: "Chevrolet",
    model: "C10",
    year: 1970,
    price: 260000,
    type: "venda",
    city: "Curitiba",
    state: "PR",
    km: 112000,
    image: car8,
    description:
      "Chevrolet C10 1970, carroceria restaurada, motor V8 revisado e pronta para colecionar.",
    seller: "Clássicos Sul",
  },
];

export const brands = Array.from(new Set(cars.map((c) => c.brand))).sort();

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}