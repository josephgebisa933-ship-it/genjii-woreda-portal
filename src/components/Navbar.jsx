import React, { useState } from 'react';
import { Landmark, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Leadership', href: '#leaders' },
    { label: 'Services', href: '#services' },
    { label: 'News', href: '#news' },
    { label: 'Tourism & Farming', href: '#tourism' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-emerald-950 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
            <Landmark className="text-amber-400" size={20} />
          </div>
          <span>Genjii Woreda</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-200">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-amber-400 transition">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-slate-200 hover:bg-emerald-900"
          aria-label="Toggle Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-emerald-900 px-4 pt-2 pb-4 space-y-2 border-t border-emerald-800">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-slate-100 hover:text-amber-400"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
