import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — Garagem Clássica" },
      { name: "description", content: "Seus clássicos favoritos salvos para acompanhar." },
    ],
  }),
  component: FavoritosPage,
});

function FavoritosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 text-center">
        <Heart className="mx-auto h-14 w-14 text-primary" strokeWidth={1.5} />
        <h1 className="mt-4 font-serif text-3xl font-bold">Seus favoritos</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Você ainda não salvou nenhum carro. Explore os anúncios e clique no coração para
          guardar seus clássicos preferidos.
        </p>
        <Link
          to="/busca"
          className="mt-8 inline-block rounded bg-accent px-6 py-3 text-base font-semibold text-accent-foreground hover:opacity-90"
        >
          Buscar carros
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
