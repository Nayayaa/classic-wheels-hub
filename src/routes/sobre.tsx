import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Lasanha Tracker" },
      { name: "description", content: "Conheça o Lasanha Tracker, o marketplace dedicado a colecionadores de carros antigos." },
      { property: "og:title", content: "Sobre o Lasanha Tracker" },
      { property: "og:description", content: "Marketplace para entusiastas de automóveis clássicos." },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-14">
          <h1 className="font-serif text-4xl font-bold">Sobre o Lasanha Tracker</h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/90">
            O Lasanha Tracker é uma plataforma inteligente de monitoramento de carros antigos que centraliza anúncios de diversos marketplaces em um só lugar.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground/90">
            Utilizamos automação e inteligência artificial para ajudar colecionadores, antigomobilistas e car hunters a encontrar oportunidades raras com mais rapidez, organização e confiabilidade.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground/90">
            Nossa missão é transformar o processo de garimpo automotivo em uma experiência prática, segura e eficiente.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Stat n="+XXX" l="Clássicos anunciados" />
            <Stat n="+XXX" l="De experiência" />
            <Stat n="100%" l="Anúncios verificados" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-6 text-center">
      <div className="font-serif text-3xl font-bold text-primary">{n}</div>
      <div className="mt-1 text-sm text-muted-foreground">{l}</div>
    </div>
  );
}