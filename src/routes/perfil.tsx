import { createFileRoute, Link } from "@tanstack/react-router";
import { UserCircle2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — Garagem Clássica" },
      { name: "description", content: "Gerencie seu perfil e seus anúncios." },
    ],
  }),
  component: PerfilPage,
});

function PerfilPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 text-center">
        <UserCircle2 className="mx-auto h-16 w-16 text-primary" strokeWidth={1.5} />
        <h1 className="mt-4 font-serif text-3xl font-bold">Meu perfil</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Em breve você poderá criar sua conta para acompanhar seus anúncios, favoritos e mensagens.
        </p>
        <Link
          to="/anunciar"
          className="mt-8 inline-block rounded bg-accent px-6 py-3 text-base font-semibold text-accent-foreground hover:opacity-90"
        >
          Anunciar um carro
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
