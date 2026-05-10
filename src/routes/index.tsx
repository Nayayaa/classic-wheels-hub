import { createFileRoute, Link } from "@tanstack/react-router";
import heroCar from "@/assets/hero-car.jpg";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { SearchBar } from "@/components/SearchBar";
import { CarCard } from "@/components/CarCard";
import { cars } from "@/data/cars";
import { ShieldCheck, Wrench, Handshake, KeyRound } from "lucide-react";

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
  const featured = cars.slice(0, 6);
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-0">
            <img
              src={heroCar}
              alt="Carro clássico em garagem iluminada"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
            <div className="max-w-2xl text-secondary-foreground">
              <span className="inline-block rounded-full border border-accent/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
                desde os anos 50
              </span>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
                A maior vitrine de <span className="text-accent">carros antigos</span> do Brasil
              </h1>
              <p className="mt-4 text-lg opacity-90">
                Compre, venda e alugue clássicos verificados. Conectamos colecionadores, compradores e entusiastas de verdade.
              </p>
            </div>
            <div className="mt-8">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "Anúncios verificados", desc: "Documentação conferida" },
              { icon: Wrench, title: "Avaliação técnica", desc: "Histórico do veículo" },
              { icon: Handshake, title: "Negociação direta", desc: "Sem intermediários" },
              { icon: KeyRound, title: "Aluguel para eventos", desc: "Casamentos e ensaios" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <Icon className="h-8 w-8 shrink-0 text-primary" />
                <div>
                  <div className="font-semibold text-foreground">{title}</div>
                  <div className="text-sm text-muted-foreground">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">Destaques</div>
              <h2 className="mt-1 font-serif text-3xl font-bold">Clássicos em destaque</h2>
            </div>
            <Link to="/busca" className="text-sm font-semibold text-primary hover:underline">
              Ver todos os anúncios →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary text-secondary-foreground">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center">
            <h2 className="font-serif text-3xl font-bold">Tem um clássico para vender ou alugar?</h2>
            <p className="max-w-2xl opacity-90">
              Anuncie gratuitamente e alcance milhares de colecionadores em todo o Brasil.
            </p>
            <Link
              to="/anunciar"
              className="mt-2 rounded bg-accent px-6 py-3 font-semibold text-accent-foreground transition hover:opacity-90"
            >
              Anunciar meu carro
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
