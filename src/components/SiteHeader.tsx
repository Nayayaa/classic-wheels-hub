import { Link } from "@tanstack/react-router";
import { Search, Car } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="mx-auto flex max-w-5xl items-center justify-center gap-2 px-4 py-4 text-lg font-medium md:gap-8">
        <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-accent" }} className="px-2 py-1 hover:text-accent">
          Início
        </Link>
        <span className="opacity-40">|</span>
        <Link to="/anunciar" activeProps={{ className: "text-accent" }} className="px-2 py-1 hover:text-accent">
          Anunciar
        </Link>
        <span className="opacity-40">|</span>
        <Link to="/favoritos" activeProps={{ className: "text-accent" }} className="px-2 py-1 hover:text-accent">
          Favoritos
        </Link>
        <span className="opacity-40">|</span>
        <Link to="/perfil" activeProps={{ className: "text-accent" }} className="px-2 py-1 hover:text-accent">
          Perfil
        </Link>
        <span className="opacity-40">|</span>
        <Link to="/sobre" activeProps={{ className: "text-accent" }} className="px-2 py-1 hover:text-accent">
          Sobre
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-6 py-5 text-base">
        <span>Contatos: contato@lasanhatracker.com.br</span>
        <span className="opacity-80">© {new Date().getFullYear()} Lasanha Tracker</span>
      </div>
    </footer>
  );
}

export function BrandMark({ size = "md" }: { size?: "md" | "lg" }) {
  const big = size === "lg";

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-flex items-center justify-center">
    
        <img
          src="/img/icon_sem_fundo.png"
          alt="Lasanha Tracker Logo"
          className={big ? "h-50 w-auto" : "h-12 w-auto"}
        />
      </div>
      <div
        className={
          big
            ? "mt-3 font-serif text-4xl font-bold text-primary"
            : "mt-1 font-serif text-xl font-bold text-primary"
        }
      >
        {/* Antigo nome escrito Lasanha Tracker */}
      </div>
    </div>
  );
}