import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { brands } from "@/data/cars";

export function SearchBar({
  initialQ = "",
  initialBrand = "",
  initialType = "",
  initialBlackPlate = false,
}: {
  initialQ?: string;
  initialBrand?: string;
  initialType?: string;
  initialBlackPlate?: boolean;
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState(initialQ);
  const [brand, setBrand] = useState(initialBrand);
  const [type, setType] = useState(initialType);
  const [blackPlate, setBlackPlate] = useState(initialBlackPlate);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({
          to: "/busca",
          search: {
            q: q || undefined,
            brand: brand || undefined,
            type: type || undefined,
            blackPlate: blackPlate ? true : undefined,
          } as any,
        });
      }}
      className="grid grid-cols-1 gap-3 rounded-md border border-border bg-card p-4 shadow-md md:grid-cols-[minmax(0,1fr)_minmax(0,180px)_minmax(0,220px)_minmax(0,160px)_auto]"
    >
      <div className="min-w-0 flex items-center gap-2 rounded border border-input bg-background px-3">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ex: Fusca, Opala, Maverick..."
          className="w-full bg-transparent py-3 text-base text-foreground placeholder:text-muted-foreground outline-none"
        />
      </div>
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="min-w-0 w-full rounded border border-input bg-background px-3 py-3 text-base text-foreground outline-none"
      >
        <option value="">Todas as marcas</option>
        {brands.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="min-w-0 w-full rounded border border-input bg-background px-3 py-3 text-base text-foreground outline-none"
      >
        <option value="">Comprar ou alugar</option>
        <option value="venda">Comprar</option>
        <option value="aluguel">Alugar</option>
      </select>
      <label className="min-w-0 w-full flex items-center gap-2 rounded border border-input bg-background px-3 py-3 text-sm font-medium text-foreground">
        <input
          type="checkbox"
          checked={blackPlate}
          onChange={(e) => setBlackPlate(e.target.checked)}
          className="h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-primary/50"
        />
        Placa preta
      </label>
      <button
        type="submit"
        className="rounded bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        Buscar
      </button>
    </form>
  );
}