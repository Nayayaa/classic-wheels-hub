import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { SearchBar } from "@/components/SearchBar";
import { CarCard } from "@/components/CarCard";
import { cars } from "@/data/cars";

const searchSchema = z.object({
  q: z.string().optional(),
  brand: z.string().optional(),
  type: z.enum(["venda", "aluguel"]).optional(),
  minYear: z.number().optional(),
  maxYear: z.number().optional(),
});

export const Route = createFileRoute("/busca")({
  validateSearch: (input: Record<string, unknown>) => searchSchema.parse(input),
  head: () => ({
    meta: [
      { title: "Buscar carros antigos — Garagem Clássica" },
      { name: "description", content: "Encontre clássicos para comprar ou alugar. Filtre por marca, ano e tipo." },
      { property: "og:title", content: "Buscar carros antigos" },
      { property: "og:description", content: "Filtre clássicos por marca, ano e cidade." },
    ],
  }),
  component: BuscaPage,
});

function BuscaPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [sort, setSort] = useState<"recentes" | "menor" | "maior" | "antigos">("recentes");

  const results = useMemo(() => {
    let list = cars.slice();
    if (search.q) {
      const q = search.q.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q),
      );
    }
    if (search.brand) list = list.filter((c) => c.brand === search.brand);
    if (search.type) list = list.filter((c) => c.type === search.type);
    if (search.minYear) list = list.filter((c) => c.year >= search.minYear!);
    if (search.maxYear) list = list.filter((c) => c.year <= search.maxYear!);
    if (sort === "menor") list.sort((a, b) => a.price - b.price);
    if (sort === "maior") list.sort((a, b) => b.price - a.price);
    if (sort === "antigos") list.sort((a, b) => a.year - b.year);
    return list;
  }, [search, sort]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-secondary py-8 text-secondary-foreground">
          <div className="mx-auto max-w-6xl px-4">
            <h1 className="font-serif text-3xl font-bold">Buscar carros</h1>
            <p className="mt-1 opacity-90">Filtre entre os clássicos disponíveis</p>
            <div className="mt-6">
              <SearchBar initialQ={search.q ?? ""} initialBrand={search.brand ?? ""} initialType={search.type ?? ""} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{results.length}</span> {results.length === 1 ? "anúncio encontrado" : "anúncios encontrados"}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <label className="text-muted-foreground">Ordenar por:</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="rounded border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="recentes">Mais recentes</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
                <option value="antigos">Ano mais antigo</option>
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="rounded border border-border bg-card p-10 text-center">
              <p className="font-serif text-xl">Nenhum carro encontrado</p>
              <p className="mt-2 text-sm text-muted-foreground">Tente ajustar os filtros da sua busca.</p>
              <button
                onClick={() => navigate({ to: "/busca", search: {} })}
                className="mt-4 rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((c) => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}