import { Link } from "@tanstack/react-router";
import { MapPin, Gauge, Calendar } from "lucide-react";
import { type Listing, formatPrice } from "@/data/cars";

export function CarCard({ car }: { car: Listing }) {
  return (
    <Link
      to="/carro/$id"
      params={{ id: car.id }}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={car.image}
          alt={car.title}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded bg-primary px-2 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          {car.type === "venda" ? "Venda" : "Aluguel"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-lg font-bold text-foreground">{car.title}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{car.year}</span>
          <span className="flex items-center gap-1"><Gauge className="h-3.5 w-3.5" />{car.km.toLocaleString("pt-BR")} km</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{car.city}/{car.state}</span>
        </div>
        <div className="mt-auto pt-4">
          <div className="text-xs text-muted-foreground">
            {car.type === "aluguel" ? "A partir de" : "Preço"}
          </div>
          <div className="font-serif text-2xl font-bold text-primary">
            {formatPrice(car.price)}
            {car.type === "aluguel" && <span className="text-sm font-normal text-muted-foreground"> /dia</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}