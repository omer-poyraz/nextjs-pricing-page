"use client";
import { useState } from "react";
import { Check, Minus, Github, ArrowRight, Sparkles } from "lucide-react";

const BUNDLE = "https://omerpoyraz.gumroad.com/l/nextjs-admin-bundle";

type Plan = {
  name: string; tagline: string;
  monthly: number; yearly: number;
  featured?: boolean; cta: string;
  features: string[];
};

const PLANS: Plan[] = [
  { name: "Starter", tagline: "For side projects", monthly: 0, yearly: 0, cta: "Start free",
    features: ["1 project", "Up to 3 members", "Community support", "1 GB storage"] },
  { name: "Pro", tagline: "For growing teams", monthly: 24, yearly: 19, featured: true, cta: "Get Pro",
    features: ["Unlimited projects", "Up to 20 members", "Priority support", "50 GB storage", "Advanced analytics"] },
  { name: "Business", tagline: "For scale", monthly: 59, yearly: 49, cta: "Contact sales",
    features: ["Everything in Pro", "Unlimited members", "SSO & SAML", "500 GB storage", "SLA & dedicated manager"] },
];

const COMPARE: { label: string; vals: (boolean | string)[] }[] = [
  { label: "Projects", vals: ["1", "Unlimited", "Unlimited"] },
  { label: "Team members", vals: ["3", "20", "Unlimited"] },
  { label: "Storage", vals: ["1 GB", "50 GB", "500 GB"] },
  { label: "Analytics dashboard", vals: [false, true, true] },
  { label: "SSO / SAML", vals: [false, false, true] },
  { label: "Priority support", vals: [false, true, true] },
  { label: "SLA", vals: [false, false, true] },
];

export default function Home() {
  const [yearly, setYearly] = useState(true);

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center gap-2">
          <span className="font-display font-bold">Price<span className="text-[var(--brand)]">Kit</span></span>
          <a href="https://github.com/omer-poyraz/nextjs-pricing-page" className="ml-auto inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[var(--border)] text-sm hover:bg-[var(--surface-2)]"><Github size={16} /> Star</a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-16">
        <div className="text-center max-w-xl mx-auto">
          <span className="pill" style={{ background: "var(--brand-soft)", color: "var(--brand)" }}><Sparkles size={13} /> Simple, transparent pricing</span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mt-4">Pricing that scales with you</h1>
          <p className="text-[var(--muted)] mt-4">Start free, upgrade when you grow. No credit card required.</p>

          <div className="inline-flex items-center gap-1 p-1 mt-7 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
            <button onClick={() => setYearly(false)} className={`h-9 px-4 rounded-lg text-sm font-medium ${!yearly ? "bg-[var(--surface)] shadow-sm" : "text-[var(--muted)]"}`}>Monthly</button>
            <button onClick={() => setYearly(true)} className={`h-9 px-4 rounded-lg text-sm font-medium inline-flex items-center gap-2 ${yearly ? "bg-[var(--surface)] shadow-sm" : "text-[var(--muted)]"}`}>
              Yearly <span className="pill text-[11px]" style={{ background: "var(--brand-soft)", color: "var(--brand)" }}>-20%</span>
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {PLANS.map((p) => (
            <div key={p.name} className={`card p-6 flex flex-col ${p.featured ? "ring-2 ring-[var(--brand)] relative" : ""}`}>
              {p.featured && <span className="pill absolute -top-3 left-1/2 -translate-x-1/2" style={{ background: "var(--brand)", color: "#04120b" }}>Most popular</span>}
              <div className="font-display text-lg font-bold">{p.name}</div>
              <div className="text-sm text-[var(--muted)]">{p.tagline}</div>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">${yearly ? p.yearly : p.monthly}</span>
                <span className="text-[var(--muted)] text-sm">/mo</span>
              </div>
              {yearly && p.yearly > 0 && <div className="text-xs text-[var(--muted)] mt-1">billed ${p.yearly * 12}/year</div>}
              {(!yearly || p.yearly === 0) && <div className="text-xs text-[var(--muted)] mt-1">&nbsp;</div>}
              <button className={`btn mt-5 ${p.featured ? "btn-brand" : ""}`}>{p.cta}</button>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid place-items-center w-4 h-4 rounded-full" style={{ background: "var(--brand-soft)", color: "var(--brand)" }}><Check size={12} strokeWidth={3} /></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* COMPARE TABLE */}
        <div className="mt-16 overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[560px]">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left font-medium text-[var(--muted)] py-3 pr-4">Compare plans</th>
                {PLANS.map((p) => <th key={p.name} className="font-display font-semibold py-3 px-4 text-center">{p.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row) => (
                <tr key={row.label} className="border-b border-[var(--border)]">
                  <td className="py-3 pr-4 text-[var(--muted)]">{row.label}</td>
                  {row.vals.map((v, i) => (
                    <td key={i} className="py-3 px-4 text-center">
                      {v === true ? <Check size={16} className="inline text-[var(--brand)]" strokeWidth={3} />
                        : v === false ? <Minus size={16} className="inline text-[var(--muted)] opacity-40" />
                        : <span className="font-medium">{v}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BUNDLE CTA */}
        <div className="card p-8 mt-16 text-center" style={{ background: "var(--brand-soft)" }}>
          <h2 className="font-display text-2xl font-bold">Building the whole SaaS?</h2>
          <p className="text-[var(--muted)] mt-2 max-w-lg mx-auto">Six production-ready Next.js admin dashboards — billing, metrics, CRM and more, ready to ship.</p>
          <a href={BUNDLE} className="inline-flex items-center gap-2 mt-5 h-11 px-6 rounded-xl bg-[var(--brand)] text-[#04120b] font-semibold">Get all 6 for $99 <ArrowRight size={17} /></a>
        </div>

        <footer className="mt-12 pt-8 border-t border-[var(--border)] text-sm text-[var(--muted)] flex justify-between">
          <span>MIT © Ömer Poyraz</span>
          <a href="https://github.com/omer-poyraz/nextjs-pricing-page" className="hover:text-[var(--fg)]">GitHub</a>
        </footer>
      </main>
    </div>
  );
}
