import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { type Listing, formatPrice } from "@/data/cars";
import { useFavorites } from "@/hooks/use-favorites";

export function CarCard({ car }: { car: Listing }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(car.id);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <button
          type="button"
          onClick={() => toggleFavorite(car.id)}
          aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-2 text-foreground shadow-sm transition hover:bg-background"
        >
          <Heart
            className={
              favorited ? "h-5 w-5 text-red-500 fill-current" : "h-5 w-5 text-muted-foreground"
            }
          />
        </button>
        <img
          src={car.image}
          alt={car.title}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
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
          className="mt-auto inline-flex items-center justify-center rounded bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
        >
          Ver anúncio
        </Link>
      </div>
    </div>
  );
}