import React, { useState, useEffect } from 'react';
import { usePortal } from '../context/PortalContext';
import {
  Landmark, Menu, X, ChevronLeft, ChevronRight, MapPin, Users, Sprout,
  Building, CheckCircle, Briefcase, Calendar, Heart, Stethoscope, Trophy,
  Compass, Wheat, BookOpen, Phone, Mail, Clock, Send, Lock, ShieldCheck, Eye
} from 'lucide-react';

export default function PublicPortal({ onOpenLogin }) {
  const { data, isAdmin, setViewMode } = usePortal();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [selectedNews, setSelectedNews] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [contactSent, setContactSent] = useState(false);

  // Auto-play Hero Slideshow
  useEffect(() => {
    if (!data.heroSlides.length) return;
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % data.heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [data.heroSlides.length]);

  const currentSlide = data.heroSlides[slideIdx] || data.heroSlides[0];

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Leaders', href: '#leaders' },
    { label: 'Services', href: '#services' },
    { label: 'News', href: '#news' },
    { label: 'Charity', href: '#charity' },
    { label: 'Hospital', href: '#hospital' },
    { label: 'Football', href: '#football' },
    { label: 'Tourism', href: '#tourism' },
    { label: 'Farming', href: '#farming' },
    { label: 'Biography', href: '#biography' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Admin Quick Bar if Logged In */}
      {isAdmin && (
        <div className="bg-amber-500 text-emerald-950 px-4 py-2 text-xs font-bold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={16} /> Admin Mode Active — Viewing Live Public Website
          </span>
          <button
            onClick={() => setViewMode('admin')}
            className="bg-emerald-950 text-white px-3 py-1 rounded-md hover:bg-emerald-900 transition"
          >
            Open Admin Dashboard
          </button>
        </div>
      )}

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-emerald-950/95 backdrop-blur text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 font-bold text-lg">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <Landmark className="text-amber-400" size={20} />
            </div>
            <span>Genjii Woreda</span>
          </a>

          <nav className="hidden xl:flex items-center gap-4 text-xs font-medium text-slate-200">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-amber-400 transition">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => (isAdmin ? setViewMode('admin') : onOpenLogin())}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-emerald-950 px-3.5 py-2 rounded-lg transition"
            >
              <Lock size={14} /> {isAdmin ? 'Admin Panel' : 'Admin Login'}
            </button>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="xl:hidden p-2 rounded-lg hover:bg-emerald-900"
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="xl:hidden bg-emerald-900 px-4 py-3 grid grid-cols-2 gap-2 border-t border-emerald-800">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenu(false)}
                className="py-1.5 text-sm text-slate-100 hover:text-amber-400"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* 1. HERO SLIDESHOW */}
      {currentSlide && (
        <section className="relative h-[82vh] min-h-[520px] bg-emerald-950 text-white overflow-hidden flex items-center">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/60 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl animate-fadeIn">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-5">
                <MapPin size={14} /> {currentSlide.badge}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                {currentSlide.title}
              </h1>
              <p className="mt-5 text-lg text-slate-200 leading-relaxed">
                {currentSlide.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#services"
                  className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-6 py-3 rounded-lg transition"
                >
                  Explore Public Services
                </a>
                <a
                  href="#news"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/20 transition"
                >
                  Latest Updates
                </a>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          {data.heroSlides.length > 1 && (
            <>
              <button
                onClick={() =>
                  setSlideIdx((prev) => (prev - 1 + data.heroSlides.length) % data.heroSlides.length)
                }
                className="absolute left-4 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white transition"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => setSlideIdx((prev) => (prev + 1) % data.heroSlides.length)}
                className="absolute right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white transition"
              >
                <ChevronRight size={22} />
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {data.heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIdx(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === slideIdx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {data.about.stats.map((st, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:-translate-y-1 hover:shadow-md transition duration-300"
              >
                <div className="text-3xl font-extrabold text-emerald-900">{st.value}</div>
                <div className="text-sm text-slate-600 font-medium mt-1">{st.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-600 font-bold uppercase tracking-wider text-xs">
                About Genjii Woreda
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">{data.about.heading}</h2>
              <p className="text-slate-600 mt-4 leading-relaxed">{data.about.description}</p>
              <p className="text-slate-600 mt-3 leading-relaxed">{data.about.history}</p>
            </div>
            <div>
              <img
                src={data.about.image}
                alt="About Genjii Woreda"
                className="rounded-2xl shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. LEADERS */}
      <section id="leaders" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-600 font-bold uppercase tracking-wider text-xs">
              Administration Leadership
            </span>
            <h2 className="text-3xl font-bold mt-2">Sector Leaders</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.leaders.map((leader) => (
              <div
                key={leader.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-lg transition duration-300"
              >
                <img
                  src={leader.photo}
                  alt={leader.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <span className="text-xs font-bold uppercase text-amber-600">{leader.role}</span>
                  <h3 className="text-xl font-bold mt-1">{leader.name}</h3>
                  <p className="text-sm text-slate-600 mt-2">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section id="services" className="py-20 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-xs">
              Citizen Charter
            </span>
            <h2 className="text-3xl font-bold mt-2">Government Public Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.services.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-2xl bg-emerald-900/70 border border-emerald-800 hover:border-amber-400 transition duration-300"
              >
                <Briefcase className="text-amber-400 mb-4" size={26} />
                <div className="text-xs text-amber-300 font-semibold">{srv.office}</div>
                <h3 className="text-lg font-bold mt-1">{srv.title}</h3>
                <p className="text-sm text-slate-300 mt-2">{srv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NEWS & ANNOUNCEMENTS */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-600 font-bold uppercase tracking-wider text-xs">
              Press & Updates
            </span>
            <h2 className="text-3xl font-bold mt-2">News & Announcements</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.news.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 hover:shadow-lg transition duration-300 flex flex-col"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-bold text-emerald-800">{post.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} /> {post.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 flex-1">{post.summary}</p>
                  <button
                    onClick={() => setSelectedNews(post)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-amber-600"
                  >
                    <Eye size={16} /> Read Full Article & Gallery ({post.gallery?.length || 1} photos)
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CHARITY SECTION */}
      <section id="charity" className="py-20 bg-amber-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-amber-700 font-bold uppercase tracking-wider text-xs">
            <Heart size={16} /> Community Solidarity
          </div>
          <h2 className="text-3xl font-bold mt-2 mb-8">Charity & Humanitarian Initiatives</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.charityPhotos.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImg(item)}
                className="cursor-pointer group bg-white rounded-2xl overflow-hidden shadow-sm border border-amber-200/70 hover:shadow-lg transition"
              >
                <div className="overflow-hidden h-60">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOSPITAL SECTION */}
      <section id="hospital" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-emerald-700 font-bold uppercase tracking-wider text-xs">
            <Stethoscope size={16} /> Healthcare Infrastructure
          </div>
          <h2 className="text-3xl font-bold mt-2 mb-8">Genjii Primary Hospital & Health Centers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.hospitalPhotos.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImg(item)}
                className="cursor-pointer group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 hover:shadow-lg transition"
              >
                <div className="overflow-hidden h-60">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOOTBALL CHAMPIONSHIP */}
      <section id="football" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-xs">
            <Trophy size={16} /> Youth & Sports
          </div>
          <h2 className="text-3xl font-bold mt-2 mb-8">Genjii Woreda Football Championship</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.footballPhotos.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImg(item)}
                className="cursor-pointer group rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-amber-400 transition"
              >
                <div className="overflow-hidden h-60">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-slate-300 mt-1">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TOURISM */}
      <section id="tourism" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-emerald-700 font-bold uppercase tracking-wider text-xs">
            <Compass size={16} /> Discover Genjii
          </div>
          <h2 className="text-3xl font-bold mt-2 mb-8">Tourism & Cultural Attractions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.tourism.map((spot) => (
              <div
                key={spot.id}
                className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 hover:shadow-lg transition"
              >
                <img src={spot.image} alt={spot.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{spot.title}</h3>
                  <p className="text-sm text-slate-600 mt-2">{spot.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {spot.features.map((f, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FARMING */}
      <section id="farming" className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-emerald-800 font-bold uppercase tracking-wider text-xs">
            <Wheat size={16} /> Highland Economy
          </div>
          <h2 className="text-3xl font-bold mt-2 mb-8">Agricultural Products Showcase</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.farming.map((crop) => (
              <div
                key={crop.id}
                className="bg-white rounded-2xl overflow-hidden border border-emerald-200/70 shadow-sm hover:-translate-y-1 transition"
              >
                <img src={crop.image} alt={crop.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <span className="text-xs font-bold text-amber-600 uppercase">{crop.season}</span>
                  <h3 className="text-xl font-bold mt-1">{crop.title}</h3>
                  <p className="text-sm text-slate-600 mt-2">{crop.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. BIOGRAPHY */}
      <section id="biography" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-950 text-white rounded-3xl overflow-hidden shadow-xl grid md:grid-cols-5">
            <img
              src={data.biography.image}
              alt={data.biography.name}
              className="md:col-span-2 w-full h-full min-h-[280px] object-cover"
            />
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <BookOpen size={15} /> {data.biography.era}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">{data.biography.name}</h2>
              <div className="text-sm text-emerald-300 mt-1">{data.biography.title}</div>
              <blockquote className="mt-5 pl-4 border-l-2 border-amber-400 italic text-amber-200 text-sm">
                {data.biography.quote}
              </blockquote>
              <p className="mt-4 text-sm text-slate-200 leading-relaxed">{data.biography.story}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CONTACT */}
      <section id="contact" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-amber-600 font-bold uppercase tracking-wider text-xs">
              Get In Touch
            </span>
            <h2 className="text-3xl font-bold mt-2">Contact Genjii Woreda Office</h2>
            <p className="text-slate-600 mt-3">
              Reach out for public inquiries, investment opportunities, or community feedback.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="text-emerald-800" size={20} />
                <span>{data.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-emerald-800" size={20} />
                <span>{data.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-emerald-800" size={20} />
                <span>{data.contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-emerald-800" size={20} />
                <span>{data.contact.officeHours}</span>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setContactSent(true);
            }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4"
          >
            <h3 className="text-xl font-bold">Send a Message</h3>
            {contactSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-900 text-sm font-medium">
                Thank you! Your message has been received by the Genjii Woreda Public Relations Office.
              </div>
            ) : (
              <>
                <input
                  required
                  placeholder="Full Name"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Email or Phone Number"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist you?"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-semibold px-6 py-3 rounded-lg text-sm transition"
                >
                  <Send size={16} /> Submit Inquiry
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-slate-300 py-8 text-center text-xs">
        © {new Date().getFullYear()} Genjii Woreda Administration — West Wollega Zone, Oromia. All rights reserved.
      </footer>

      {/* News Article & Gallery Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200"
            >
              <X size={20} />
            </button>
            <span className="text-xs font-bold text-amber-600 uppercase">{selectedNews.category}</span>
            <h2 className="text-2xl font-bold mt-1">{selectedNews.title}</h2>
            <p className="text-xs text-slate-500 mt-1">{selectedNews.date}</p>
            <p className="mt-4 text-slate-700 leading-relaxed">{selectedNews.content}</p>
            <h4 className="font-bold text-sm mt-6 mb-3">Event Photo Gallery</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {(selectedNews.gallery || [selectedNews.coverImage]).map((img, i) => (
                <img key={i} src={img} alt="" className="rounded-xl w-full h-48 object-cover" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Charity / Hospital / Football Photos */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
        >
          <div className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden">
            <img src={lightboxImg.image} alt={lightboxImg.title} className="w-full max-h-[70vh] object-cover" />
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">{lightboxImg.title}</h3>
                <p className="text-sm text-slate-600">{lightboxImg.caption}</p>
              </div>
              <button
                onClick={() => setLightboxImg(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}