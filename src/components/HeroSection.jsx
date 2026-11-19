import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-emerald-950 text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <MapPin size={14} /> West Wollega Zone, Oromia
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Welcome to <span className="text-amber-400">Genjii Woreda</span> Administration
          </h1>
          <p className="mt-6 text-lg text-slate-200 leading-relaxed">
            Committed to transparent governance, sustainable highland agriculture, quality public services, and inclusive community development across all 24 kebeles.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#services"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-6 py-3 rounded-lg transition"
            >
              Explore Public Services <ArrowRight size={18} />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/20 transition"
            >
              About Genjii
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}