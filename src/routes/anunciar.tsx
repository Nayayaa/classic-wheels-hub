import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/anunciar")({
  head: () => ({
    meta: [
      { title: "Anuncie seu carro antigo — Garagem Clássica" },
      { name: "description", content: "Anuncie gratuitamente seu carro clássico para colecionadores em todo o Brasil." },
      { property: "og:title", content: "Anuncie seu clássico" },
      { property: "og:description", content: "Cadastre seu carro antigo para venda ou aluguel." },
    ],
  }),
  component: Anunciar,
});

function Anunciar() {
  const [sent, setSent] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-secondary py-10 text-secondary-foreground">
          <div className="mx-auto max-w-3xl px-4">
            <h1 className="font-serif text-3xl font-bold md:text-4xl">Anuncie seu clássico</h1>
            <p className="mt-2 opacity-90">Cadastro gratuito. Seu anúncio é exibido em até 24h após a verificação.</p>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-4 py-10">
          {sent ? (
            <div className="rounded-md border border-border bg-card p-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-4 font-serif text-2xl font-bold">Anúncio enviado!</h2>
              <p className="mt-2 text-muted-foreground">
                Recebemos suas informações. Em breve nossa equipe entrará em contato para concluir a publicação.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid gap-4 rounded-md border border-border bg-card p-6"
            >
              <Field label="Seu nome">
                <input required className="input" placeholder="Nome completo" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Telefone / WhatsApp">
                  <input required className="input" placeholder="(11) 99999-9999" />
                </Field>
                <Field label="E-mail">
                  <input required type="email" className="input" placeholder="seu@email.com" />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Marca">
                  <input required className="input" placeholder="Ex: Chevrolet" />
                </Field>
                <Field label="Modelo">
                  <input required className="input" placeholder="Ex: Opala" />
                </Field>
                <Field label="Ano">
                  <input required type="number" className="input" placeholder="1976" />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Tipo de anúncio">
                  <select required className="input">
                    <option value="venda">Venda</option>
                    <option value="aluguel">Aluguel</option>
                  </select>
                </Field>
                <Field label="Valor (R$)">
                  <input required type="number" className="input" placeholder="80000" />
                </Field>
              </div>
              <Field label="Descrição do veículo">
                <textarea required rows={5} className="input" placeholder="Conte detalhes da restauração, histórico, originalidade..." />
              </Field>
              <button type="submit" className="mt-2 rounded bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
                Enviar anúncio
              </button>
            </form>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}