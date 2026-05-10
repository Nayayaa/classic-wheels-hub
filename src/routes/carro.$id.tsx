import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { cars, formatPrice } from "@/data/cars";
import { MapPin, Gauge, Calendar, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/carro/$id")({
  loader: ({ params }) => {
    const car = cars.find((c) => c.id === params.id);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.car.title} — Garagem Clássica` },
          { name: "description", content: loaderData.car.description },
          { property: "og:title", content: loaderData.car.title },
          { property: "og:description", content: loaderData.car.description },
          { property: "og:image", content: loaderData.car.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center p-10 text-center">
        <div>
          <h1 className="font-serif text-3xl font-bold">Carro não encontrado</h1>
          <Link to="/busca" className="mt-4 inline-block text-primary hover:underline">
            Voltar para a busca
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center">
      <p>{error.message}</p>
    </div>
  ),
  component: CarPage,
});

function CarPage() {
  const { car } = Route.useLoaderData();
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Início</Link> ·{" "}
            <Link to="/busca" className="hover:text-primary">Buscar</Link> ·{" "}
            <span className="text-foreground">{car.title}</span>
          </nav>
        </div>

        <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="overflow-hidden rounded-md border border-border bg-card">
              <img src={car.image} alt={car.title} width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
            </div>

            <div className="mt-8 rounded-md border border-border bg-card p-6">
              <h2 className="font-serif text-2xl font-bold">Descrição</h2>
              <p className="mt-3 leading-relaxed text-foreground/90">{car.description}</p>

              <h3 className="mt-6 font-serif text-xl font-bold">Especificações</h3>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                <Spec label="Marca" value={car.brand} />
                <Spec label="Modelo" value={car.model} />
                <Spec label="Ano" value={String(car.year)} />
                <Spec label="Quilometragem" value={`${car.km.toLocaleString("pt-BR")} km`} />
                <Spec label="Cidade" value={`${car.city}/${car.state}`} />
                <Spec label="Tipo" value={car.type === "venda" ? "À venda" : "Aluguel"} />
              </dl>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-md border border-border bg-card p-6">
              <span className="inline-block rounded bg-primary px-2 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
                {car.type === "venda" ? "À venda" : "Para aluguel"}
              </span>
              <h1 className="mt-3 font-serif text-3xl font-bold leading-tight">{car.title}</h1>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{car.year}</span>
                <span className="flex items-center gap-1"><Gauge className="h-4 w-4" />{car.km.toLocaleString("pt-BR")} km</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{car.city}/{car.state}</span>
              </div>
              <div className="mt-5 border-t border-border pt-5">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {car.type === "aluguel" ? "Diária a partir de" : "Valor"}
                </div>
                <div className="font-serif text-4xl font-bold text-primary">
                  {formatPrice(car.price)}
                  {car.type === "aluguel" && <span className="text-base font-normal text-muted-foreground"> /dia</span>}
                </div>
              </div>
            </div>

            <div className="rounded-md border border-border bg-card p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Anunciante</div>
              <div className="mt-1 font-serif text-xl font-bold">{car.seller}</div>
              <a
                href={`tel:+5511999999999`}
                className="mt-4 flex items-center justify-center gap-2 rounded bg-primary px-4 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Phone className="h-4 w-4" /> Ligar para o vendedor
              </a>
              <a
                href={`mailto:contato@garagemclassica.com.br?subject=Interesse em ${encodeURIComponent(car.title)}`}
                className="mt-3 flex items-center justify-center gap-2 rounded border border-input bg-background px-4 py-3 font-semibold hover:bg-muted"
              >
                <Mail className="h-4 w-4" /> Enviar mensagem
              </a>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border bg-background p-3">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}