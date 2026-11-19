import React from 'react';
import { Users, Map, Sprout, Building, CheckCircle } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { label: 'Administrative Kebeles', value: '24', icon: Map },
    { label: 'Estimated Population', value: '115,000+', icon: Users },
    { label: 'Highland Coffee & Crop Land', value: '78%', icon: Sprout },
    { label: 'Public Service Centers', value: '32', icon: Building },
  ];

  const pillars = [
    'Transparent, accountable, and citizen-centered local governance',
    'Modernization of organic Arabica coffee and highland crop farming',
    'Expansion of rural roads, clean water supply, and primary healthcare',
    'Youth entrepreneurship, digital literacy, and quality education',
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center hover:border-emerald-600 transition"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-950 text-amber-400 flex items-center justify-center mb-3">
                  <Icon size={24} />
                </div>
                <div className="text-3xl font-extrabold text-slate-900">{item.value}</div>
                <div className="text-sm text-slate-600 font-medium mt-1">{item.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main About Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-amber-600 font-semibold uppercase tracking-wider text-sm">
              About Our Woreda
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 leading-tight">
              A Highland Hub of Culture, Agriculture, and Progress
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Located in the fertile highlands of West Wollega Zone, Oromia Regional State,{' '}
              <strong className="text-slate-800">Genjii Woreda</strong> is renowned for its lush landscapes, rich cultural heritage, and thriving agricultural economy.
            </p>
            <p className="text-slate-600 mt-3 leading-relaxed">
              Our administration works closely with local communities, cooperatives, and development partners to deliver efficient public services and sustainable infrastructure across both urban and rural kebeles.
            </p>

            <ul className="mt-6 space-y-3">
              {pillars.map((pillar, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="text-emerald-700 shrink-0 mt-0.5" size={18} />
                  <span>{pillar}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900&q=80"
              alt="Genjii Woreda Highland Landscape"
              className="rounded-2xl shadow-lg w-full h-96 object-cover"
            />
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 bg-emerald-950 text-white p-6 rounded-xl shadow-xl max-w-xs border border-emerald-800">
              <div className="text-amber-400 font-bold text-sm uppercase tracking-wider">
                Our Vision
              </div>
              <p className="text-xs text-slate-200 mt-1.5 leading-relaxed">
                To build a prosperous, self-reliant, and model woreda driven by modern agriculture, good governance, and empowered citizens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}