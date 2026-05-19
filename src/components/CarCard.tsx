import { Link } from "@tanstack/react-router";
import { type Listing, formatPrice } from "@/data/cars";

export function CarCard({ car }: { car: Listing }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={car.image}
          alt={car.title}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base leading-snug text-foreground">{car.title}</h3>
        <div className="font-serif text-xl font-bold text-foreground">
          {formatPrice(car.price)}
          {car.type === "aluguel" && (
            <span className="text-sm font-normal text-muted-foreground"> /dia</span>
          )}
        </div>
        <Link
          to="/carro/$id"
          params={{ id: car.id }}
          className="mt-2 inline-flex items-center justify-center rounded bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
        >
          Ver anúncio
        </Link>
      </div>
    </div>
  );
}