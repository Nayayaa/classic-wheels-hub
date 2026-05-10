import { Link } from "@tanstack/react-router";
import { Car } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Car className="h-7 w-7 text-accent" />
          <div className="leading-tight">
            <div className="font-serif text-xl font-bold tracking-wide">Garagem Clássica</div>
            <div className="text-[11px] uppercase tracking-widest text-accent">
              compre · venda · alugue
            </div>
          </div>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-accent" }} className="hover:text-accent">
            Início
          </Link>
          <Link to="/busca" activeProps={{ className: "text-accent" }} className="hover:text-accent">
            Buscar carros
          </Link>
          <Link to="/anunciar" activeProps={{ className: "text-accent" }} className="hover:text-accent">
            Anunciar
          </Link>
          <Link to="/sobre" activeProps={{ className: "text-accent" }} className="hover:text-accent">
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="font-serif text-lg font-bold">Garagem Clássica</div>
          <p className="mt-2 text-sm opacity-80">
            O ponto de encontro de colecionadores e entusiastas de automóveis antigos no Brasil.
          </p>
        </div>
        <div className="text-sm">
          <div className="mb-2 font-semibold text-accent">Atendimento</div>
          <p>Seg a Sex · 9h às 18h</p>
          <p>contato@garagemclassica.com.br</p>
        </div>
        <div className="text-sm">
          <div className="mb-2 font-semibold text-accent">Categorias</div>
          <p>Anos 50 · 60 · 70 · 80</p>
          <p>Nacionais e importados</p>
        </div>
      </div>
      <div className="border-t border-border/40 py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Garagem Clássica — Todos os direitos reservados
      </div>
    </footer>
  );
}