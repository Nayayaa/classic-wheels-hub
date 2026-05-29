import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, BrandMark } from "@/components/SiteHeader";
import { SearchBar } from "@/components/SearchBar";
import { CarCard } from "@/components/CarCard";
import { cars } from "@/data/cars";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Garagem Clássica — Compre, venda e alugue carros antigos" },
      {
        name: "description",
        content:
          "Marketplace para colecionadores e entusiastas: compre, venda e alugue automóveis clássicos das décadas de 50, 60, 70 e 80.",
      },
      { property: "og:title", content: "Garagem Clássica — Carros antigos" },
      { property: "og:description", content: "Compra, venda e aluguel de clássicos." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = cars;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-14 pb-10">
          <BrandMark size="lg" />

          <div className="mt-10 w-full max-w-6xl">
            <SearchBar />
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
