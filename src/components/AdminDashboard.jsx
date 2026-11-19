import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import {
  LayoutDashboard, Images, FileText, Users, Briefcase, Wheat, Compass,
  Newspaper, Heart, Stethoscope, Trophy, Phone, FolderOpen, LogOut,
  Eye, Plus, Trash2, Upload, RotateCcw, Building2
} from 'lucide-react';

export default function AdminDashboard() {
  const { data, setData, setViewMode, logoutAdmin, processImageUpload, resetToDefault } = usePortal();
  const [tab, setTab] = useState('overview');
  const [dragIdx, setDragIdx] = useState(null);

  const cabinets = data.cabinets || [];

  const menu = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'cabinets', label: 'Cabinet Names', icon: Building2 },
    { id: 'hero', label: 'Hero Slides', icon: Images },
    { id: 'pages', label: 'Page Sections (About/Bio)', icon: FileText },
    { id: 'leaders', label: 'Leaders (Drag Reorder)', icon: Users },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'charity', label: 'Charity Photos', icon: Heart },
    { id: 'hospital', label: 'Hospital Photos', icon: Stethoscope },
    { id: 'football', label: 'Football Gallery', icon: Trophy },
    { id: 'news', label: 'News & Multi-Gallery', icon: Newspaper },
    { id: 'tourism', label: 'Tourism Attractions', icon: Compass },
    { id: 'farming', label: 'Farming Items', icon: Wheat },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'media', label: 'Media Library', icon: FolderOpen },
  ];

  // Reusable Photo Gallery Manager (Charity, Hospital, Football, Tourism, Farming)
  const renderPhotoGalleryManager = (keyName, title, badgeColor) => {
    const items = data[keyName] || [];

    const handleAddPhoto = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const base64 = await processImageUpload(file, title);
      const newItem = {
        id: keyName + '_' + Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        caption: 'Uploaded work showcase in Genjii Woreda.',
        description: 'Uploaded work showcase in Genjii Woreda.',
        season: 'Current Season',
        features: ['Community Impact', 'Genjii Woreda'],
        image: base64,
      };
      setData((prev) => ({ ...prev, [keyName]: [newItem, ...(prev[keyName] || [])] }));
    };

    const handleReplacePhoto = async (id, e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const base64 = await processImageUpload(file, title);
      setData((prev) => ({
        ...prev,
        [keyName]: (prev[keyName] || []).map((it) =>
          it.id === id ? { ...it, image: base64 } : it
        ),
      }));
    };

    const handleUpdateField = (id, field, val) => {
      setData((prev) => ({
        ...prev,
        [keyName]: (prev[keyName] || []).map((it) =>
          it.id === id ? { ...it, [field]: val } : it
        ),
      }));
    };

    const handleDelete = (id) => {
      setData((prev) => ({
        ...prev,
        [keyName]: (prev[keyName] || []).filter((it) => it.id !== id),
      }));
    };

    return (
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded ${badgeColor}`}>
              Live Synced with Public Website
            </span>
            <h2 className="text-2xl font-bold mt-2">{title}</h2>
            <p className="text-sm text-slate-500">
              Upload new photos, replace existing images, edit text, or delete items.
            </p>
          </div>
          <label className="cursor-pointer inline-flex items-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-semibold px-4 py-2.5 rounded-xl text-sm">
            <Upload size={16} /> Upload New Photo
            <input type="file" accept="image/*" className="hidden" onChange={handleAddPhoto} />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <div className="relative h-48 bg-slate-100">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <label className="cursor-pointer absolute bottom-2 right-2 bg-black/75 hover:bg-black text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
                  <Upload size={13} /> Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleReplacePhoto(item.id, e)}
                  />
                </label>
              </div>
              <div className="p-4 space-y-2.5">
                <input
                  value={item.title || ''}
                  onChange={(e) => handleUpdateField(item.id, 'title', e.target.value)}
                  className="w-full font-bold text-sm px-3 py-1.5 rounded-lg border border-slate-200"
                  placeholder="Title"
                />
                <textarea
                  rows={2}
                  value={item.caption ?? item.description ?? ''}
                  onChange={(e) => {
                    handleUpdateField(item.id, 'caption', e.target.value);
                    handleUpdateField(item.id, 'description', e.target.value);
                  }}
                  className="w-full text-xs text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200"
                  placeholder="Caption / Description"
                />
                <button
                  onClick={() => handleDelete(item.id)}
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 py-2 rounded-lg border border-red-200 transition"
                >
                  <Trash2 size={14} /> Delete Item
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-68 bg-emerald-950 text-white p-4 flex flex-col justify-between shrink-0">
        <div>
          <div className="px-2 py-3 border-b border-emerald-800 mb-4">
            <div className="text-xs uppercase text-amber-400 font-bold">Genjii Woreda CMS</div>
            <div className="font-bold text-lg">Admin Control Panel</div>
          </div>
          <nav className="space-y-1">
            {menu.map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setTab(m.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    tab === m.id
                      ? 'bg-amber-500 text-emerald-950'
                      : 'text-slate-200 hover:bg-emerald-900'
                  }`}
                >
                  <Icon size={16} /> {m.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 mt-6 border-t border-emerald-800 space-y-2">
          <button
            onClick={() => setViewMode('public')}
            className="w-full flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl"
          >
            <Eye size={15} /> View Public Website
          </button>
          <button
            onClick={logoutAdmin}
            className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white text-xs font-bold py-2.5 rounded-xl transition"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold">Portal Content Overview</h1>
                <p className="text-sm text-slate-500">
                  Any cabinet name, photo uploaded, or text edited here updates the public website immediately.
                </p>
              </div>
              <button
                onClick={resetToDefault}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
              >
                <RotateCcw size={14} /> Reset Default Demo Data
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Woreda Cabinets', count: cabinets.length, go: 'cabinets' },
                { label: 'Hero Slides', count: (data.heroSlides || []).length, go: 'hero' },
                { label: 'Sector Leaders', count: (data.leaders || []).length, go: 'leaders' },
                { label: 'Public Services', count: (data.services || []).length, go: 'services' },
                { label: 'News Posts', count: (data.news || []).length, go: 'news' },
                { label: 'Charity Photos', count: (data.charityPhotos || []).length, go: 'charity' },
                { label: 'Hospital Photos', count: (data.hospitalPhotos || []).length, go: 'hospital' },
                { label: 'Football Photos', count: (data.footballPhotos || []).length, go: 'football' },
              ].map((card, i) => (
                <button
                  key={i}
                  onClick={() => setTab(card.go)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 text-left hover:border-emerald-700 transition"
                >
                  <div className="text-2xl font-extrabold text-emerald-950">{card.count}</div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">{card.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CABINET NAMES MANAGER */}
        {tab === 'cabinets' && (
          <div className="max-w-3xl">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Woreda Cabinet & Sector Names</h2>
                <p className="text-sm text-slate-500">
                  Rename cabinets anytime—changes immediately update the public website.
                </p>
              </div>
              <button
                onClick={() =>
                  setData((p) => ({
                    ...p,
                    cabinets: [
                      ...(p.cabinets || []),
                      { id: 'cab_' + Date.now(), name: 'New Woreda Cabinet', head: 'Cabinet Head' },
                    ],
                  }))
                }
                className="bg-emerald-950 hover:bg-emerald-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <Plus size={16} /> Add Cabinet
              </button>
            </div>

            <div className="space-y-3">
              {cabinets.map((cab) => (
                <div
                  key={cab.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center"
                >
                  <input
                    value={cab.name}
                    onChange={(e) =>
                      setData((p) => ({
                        ...p,
                        cabinets: (p.cabinets || []).map((c) =>
                          c.id === cab.id ? { ...c, name: e.target.value } : c
                        ),
                      }))
                    }
                    className="flex-1 w-full font-bold text-sm px-3 py-2 border rounded-lg"
                    placeholder="Cabinet Name"
                  />
                  <input
                    value={cab.head}
                    onChange={(e) =>
                      setData((p) => ({
                        ...p,
                        cabinets: (p.cabinets || []).map((c) =>
                          c.id === cab.id ? { ...c, head: e.target.value } : c
                        ),
                      }))
                    }
                    className="sm:w-56 w-full text-sm px-3 py-2 border rounded-lg"
                    placeholder="Cabinet Head"
                  />
                  <button
                    onClick={() =>
                      setData((p) => ({
                        ...p,
                        cabinets: (p.cabinets || []).filter((c) => c.id !== cab.id),
                      }))
                    }
                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                    title="Delete Cabinet"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HERO SLIDES */}
        {tab === 'hero' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Hero Slideshow Manager</h2>
              <label className="cursor-pointer inline-flex items-center gap-2 bg-emerald-950 text-white px-4 py-2.5 rounded-xl text-sm font-semibold">
                <Plus size={16} /> Add Slide with Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const img = await processImageUpload(file, 'Hero Slides');
                    setData((p) => ({
                      ...p,
                      heroSlides: [
                        ...(p.heroSlides || []),
                        {
                          id: 'h_' + Date.now(),
                          title: 'New Genjii Woreda Initiative',
                          subtitle: 'Describe the development work here.',
                          badge: 'Genjii Woreda',
                          image: img,
                        },
                      ],
                    }));
                  }}
                />
              </label>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {(data.heroSlides || []).map((slide) => (
                <div key={slide.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="relative h-48">
                    <img src={slide.image} alt="" className="w-full h-full object-cover" />
                    <label className="cursor-pointer absolute bottom-2 right-2 bg-black/75 text-white text-xs px-3 py-1.5 rounded-lg">
                      Replace Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const img = await processImageUpload(file, 'Hero Slides');
                          setData((p) => ({
                            ...p,
                            heroSlides: (p.heroSlides || []).map((s) =>
                              s.id === slide.id ? { ...s, image: img } : s
                            ),
                          }));
                        }}
                      />
                    </label>
                  </div>
                  <div className="p-4 space-y-2">
                    <input
                      value={slide.badge}
                      onChange={(e) =>
                        setData((p) => ({
                          ...p,
                          heroSlides: (p.heroSlides || []).map((s) =>
                            s.id === slide.id ? { ...s, badge: e.target.value } : s
                          ),
                        }))
                      }
                      className="w-full text-xs font-bold px-3 py-1.5 border rounded-lg"
                    />
                    <input
                      value={slide.title}
                      onChange={(e) =>
                        setData((p) => ({
                          ...p,
                          heroSlides: (p.heroSlides || []).map((s) =>
                            s.id === slide.id ? { ...s, title: e.target.value } : s
                          ),
                        }))
                      }
                      className="w-full font-bold text-sm px-3 py-1.5 border rounded-lg"
                    />
                    <textarea
                      rows={2}
                      value={slide.subtitle}
                      onChange={(e) =>
                        setData((p) => ({
                          ...p,
                          heroSlides: (p.heroSlides || []).map((s) =>
                            s.id === slide.id ? { ...s, subtitle: e.target.value } : s
                          ),
                        }))
                      }
                      className="w-full text-xs px-3 py-1.5 border rounded-lg"
                    />
                    <button
                      onClick={() =>
                        setData((p) => ({
                          ...p,
                          heroSlides: (p.heroSlides || []).filter((s) => s.id !== slide.id),
                        }))
                      }
                      className="text-xs text-red-600 font-bold flex items-center gap-1 pt-1"
                    >
                      <Trash2 size={14} /> Remove Slide
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE SECTIONS (ABOUT & BIOGRAPHY) */}
        {tab === 'pages' && (
          <div className="space-y-8 max-w-3xl">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold">About Section Text & Photo</h2>
              <div className="flex items-center gap-4">
                <img src={data.about?.image} alt="" className="w-32 h-24 rounded-xl object-cover" />
                <label className="cursor-pointer bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg">
                  Change About Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const img = await processImageUpload(file, 'About Section');
                      setData((p) => ({ ...p, about: { ...p.about, image: img } }));
                    }}
                  />
                </label>
              </div>
              <input
                value={data.about?.heading || ''}
                onChange={(e) =>
                  setData((p) => ({ ...p, about: { ...p.about, heading: e.target.value } }))
                }
                className="w-full font-bold text-sm px-3 py-2 border rounded-lg"
              />
              <textarea
                rows={3}
                value={data.about?.description || ''}
                onChange={(e) =>
                  setData((p) => ({ ...p, about: { ...p.about, description: e.target.value } }))
                }
                className="w-full text-sm px-3 py-2 border rounded-lg"
              />
              <textarea
                rows={3}
                value={data.about?.history || ''}
                onChange={(e) =>
                  setData((p) => ({ ...p, about: { ...p.about, history: e.target.value } }))
                }
                className="w-full text-sm px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold">Historical Biography Profile</h2>
              <div className="flex items-center gap-4">
                <img src={data.biography?.image} alt="" className="w-24 h-24 rounded-xl object-cover" />
                <label className="cursor-pointer bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg">
                  Change Portrait Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const img = await processImageUpload(file, 'Biography');
                      setData((p) => ({ ...p, biography: { ...p.biography, image: img } }));
                    }}
                  />
                </label>
              </div>
              <input
                value={data.biography?.name || ''}
                onChange={(e) =>
                  setData((p) => ({ ...p, biography: { ...p.biography, name: e.target.value } }))
                }
                className="w-full font-bold text-sm px-3 py-2 border rounded-lg"
              />
              <textarea
                rows={3}
                value={data.biography?.story || ''}
                onChange={(e) =>
                  setData((p) => ({ ...p, biography: { ...p.biography, story: e.target.value } }))
                }
                className="w-full text-sm px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        )}

        {/* LEADERS (DRAG-TO-REORDER + PHOTO UPLOAD + CABINET PICKER) */}
        {tab === 'leaders' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Sector Leaders (Drag Cards to Reorder)</h2>
              </div>
              <button
                onClick={() =>
                  setData((p) => ({
                    ...p,
                    leaders: [
                      ...(p.leaders || []),
                      {
                        id: 'l_' + Date.now(),
                        name: 'New Sector Head',
                        role: cabinets[0]?.name || 'Office Head',
                        bio: 'Sector responsibilities description.',
                        photo:
                          'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
                      },
                    ],
                  }))
                }
                className="inline-flex items-center gap-1.5 bg-emerald-950 text-white text-sm font-semibold px-4 py-2.5 rounded-xl"
              >
                <Plus size={16} /> Add Leader
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {(data.leaders || []).map((leader, idx) => (
                <div
                  key={leader.id}
                  draggable
                  onDragStart={() => setDragIdx(idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (dragIdx === null || dragIdx === idx) return;
                    const updated = [...(data.leaders || [])];
                    const [moved] = updated.splice(dragIdx, 1);
                    updated.splice(idx, 0, moved);
                    setData((p) => ({ ...p, leaders: updated }));
                    setDragIdx(null);
                  }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-move"
                >
                  <div className="relative h-48">
                    <img src={leader.photo} alt="" className="w-full h-full object-cover" />
                    <label className="cursor-pointer absolute bottom-2 right-2 bg-black/75 text-white text-xs px-3 py-1.5 rounded-lg">
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const img = await processImageUpload(file, 'Leaders');
                          setData((p) => ({
                            ...p,
                            leaders: (p.leaders || []).map((l) =>
                              l.id === leader.id ? { ...l, photo: img } : l
                            ),
                          }));
                        }}
                      />
                    </label>
                  </div>
                  <div className="p-4 space-y-2">
                    <input
                      value={leader.name}
                      onChange={(e) =>
                        setData((p) => ({
                          ...p,
                          leaders: (p.leaders || []).map((l) =>
                            l.id === leader.id ? { ...l, name: e.target.value } : l
                          ),
                        }))
                      }
                      className="w-full font-bold text-sm px-3 py-1.5 border rounded-lg"
                    />
                    <input
                      value={leader.role}
                      onChange={(e) =>
                        setData((p) => ({
                          ...p,
                          leaders: (p.leaders || []).map((l) =>
                            l.id === leader.id ? { ...l, role: e.target.value } : l
                          ),
                        }))
                      }
                      placeholder="Cabinet / Role Title"
                      className="w-full text-xs text-amber-700 font-semibold px-3 py-1.5 border rounded-lg"
                    />
                    {cabinets.length > 0 && (
                      <select
                        value=""
                        onChange={(e) => {
                          if (!e.target.value) return;
                          setData((p) => ({
                            ...p,
                            leaders: (p.leaders || []).map((l) =>
                              l.id === leader.id ? { ...l, role: e.target.value } : l
                            ),
                          }));
                        }}
                        className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 text-slate-700"
                      >
                        <option value="">-- Pick from Cabinet Names --</option>
                        {cabinets.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    )}
                    <textarea
                      rows={2}
                      value={leader.bio}
                      onChange={(e) =>
                        setData((p) => ({
                          ...p,
                          leaders: (p.leaders || []).map((l) =>
                            l.id === leader.id ? { ...l, bio: e.target.value } : l
                          ),
                        }))
                      }
                      className="w-full text-xs px-3 py-1.5 border rounded-lg"
                    />
                    <button
                      onClick={() =>
                        setData((p) => ({
                          ...p,
                          leaders: (p.leaders || []).filter((l) => l.id !== leader.id),
                        }))
                      }
                      className="text-xs text-red-600 font-bold flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES */}
        {tab === 'services' && (
          <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Public Services CRUD</h2>
              <button
                onClick={() =>
                  setData((p) => ({
                    ...p,
                    services: [
                      ...(p.services || []),
                      {
                        id: 's_' + Date.now(),
                        title: 'New Public Service',
                        office: cabinets[0]?.name || 'Woreda Office',
                        description: 'Requirements and service delivery timeline.',
                      },
                    ],
                  }))
                }
                className="bg-emerald-950 text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Plus size={16} /> Add Service
              </button>
            </div>
            <div className="space-y-4">
              {(data.services || []).map((srv) => (
                <div key={srv.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      value={srv.title}
                      onChange={(e) =>
                        setData((p) => ({
                          ...p,
                          services: (p.services || []).map((s) =>
                            s.id === srv.id ? { ...s, title: e.target.value } : s
                          ),
                        }))
                      }
                      className="font-bold text-sm px-3 py-2 border rounded-lg"
                    />
                    <input
                      value={srv.office}
                      onChange={(e) =>
                        setData((p) => ({
                          ...p,
                          services: (p.services || []).map((s) =>
                            s.id === srv.id ? { ...s, office: e.target.value } : s
                          ),
                        }))
                      }
                      className="text-sm px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={srv.description}
                    onChange={(e) =>
                      setData((p) => ({
                        ...p,
                        services: (p.services || []).map((s) =>
                          s.id === srv.id ? { ...s, description: e.target.value } : s
                        ),
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                  <button
                    onClick={() =>
                      setData((p) => ({
                        ...p,
                        services: (p.services || []).filter((s) => s.id !== srv.id),
                      }))
                    }
                    className="text-xs text-red-600 font-bold flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete Service
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHARITY, HOSPITAL, FOOTBALL GALLERIES */}
        {tab === 'charity' &&
          renderPhotoGalleryManager(
            'charityPhotos',
            'Charity & Community Service Photos',
            'bg-amber-100 text-amber-800'
          )}
        {tab === 'hospital' &&
          renderPhotoGalleryManager(
            'hospitalPhotos',
            'Hospital Facilities Photos',
            'bg-emerald-100 text-emerald-800'
          )}
        {tab === 'football' &&
          renderPhotoGalleryManager(
            'footballPhotos',
            'Football Championship Gallery',
            'bg-slate-200 text-slate-800'
          )}

        {/* NEWS & MULTI-PHOTO GALLERY */}
        {tab === 'news' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">News & Multi-Photo Galleries</h2>
              <button
                onClick={() =>
                  setData((p) => ({
                    ...p,
                    news: [
                      {
                        id: 'n_' + Date.now(),
                        title: 'New Genjii Woreda Announcement',
                        date: new Date().toLocaleDateString(),
                        category: 'Development',
                        summary: 'Short summary for the news card.',
                        content: 'Full detailed report of work done in Genjii Woreda.',
                        coverImage:
                          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
                        gallery: [],
                      },
                      ...(p.news || []),
                    ],
                  }))
                }
                className="bg-emerald-950 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <Plus size={16} /> Create News Post
              </button>
            </div>

            <div className="space-y-6">
              {(data.news || []).map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex flex-wrap gap-4 items-center">
                    <img src={post.coverImage} alt="" className="w-36 h-24 rounded-xl object-cover" />
                    <label className="cursor-pointer bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-lg">
                      Change Cover Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const img = await processImageUpload(file, 'News Cover');
                          setData((p) => ({
                            ...p,
                            news: (p.news || []).map((n) =>
                              n.id === post.id ? { ...n, coverImage: img } : n
                            ),
                          }));
                        }}
                      />
                    </label>
                    <label className="cursor-pointer bg-amber-500 text-emerald-950 text-xs font-bold px-3.5 py-2 rounded-lg">
                      + Upload Extra Gallery Photos
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={async (e) => {
                          const files = Array.from(e.target.files || []);
                          const uploaded = await Promise.all(
                            files.map((f) => processImageUpload(f, 'News Gallery'))
                          );
                          setData((p) => ({
                            ...p,
                            news: (p.news || []).map((n) =>
                              n.id === post.id
                                ? { ...n, gallery: [...(n.gallery || []), ...uploaded] }
                                : n
                            ),
                          }));
                        }}
                      />
                    </label>
                  </div>

                  <input
                    value={post.title}
                    onChange={(e) =>
                      setData((p) => ({
                        ...p,
                        news: (p.news || []).map((n) =>
                          n.id === post.id ? { ...n, title: e.target.value } : n
                        ),
                      }))
                    }
                    className="w-full font-bold text-base px-3 py-2 border rounded-lg"
                  />
                  <textarea
                    rows={2}
                    value={post.summary}
                    onChange={(e) =>
                      setData((p) => ({
                        ...p,
                        news: (p.news || []).map((n) =>
                          n.id === post.id ? { ...n, summary: e.target.value } : n
                        ),
                      }))
                    }
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                  <textarea
                    rows={3}
                    value={post.content}
                    onChange={(e) =>
                      setData((p) => ({
                        ...p,
                        news: (p.news || []).map((n) =>
                          n.id === post.id ? { ...n, content: e.target.value } : n
                        ),
                      }))
                    }
                    className="w-full text-sm px-3 py-2 border rounded-lg"
                  />

                  {post.gallery?.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {post.gallery.map((gImg, gi) => (
                        <div key={gi} className="relative w-24 h-20">
                          <img src={gImg} alt="" className="w-full h-full object-cover rounded-lg" />
                          <button
                            onClick={() =>
                              setData((p) => ({
                                ...p,
                                news: (p.news || []).map((n) =>
                                  n.id === post.id
                                    ? { ...n, gallery: n.gallery.filter((_, idx) => idx !== gi) }
                                    : n
                                ),
                              }))
                            }
                            className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-1"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() =>
                      setData((p) => ({
                        ...p,
                        news: (p.news || []).filter((n) => n.id !== post.id),
                      }))
                    }
                    className="text-xs text-red-600 font-bold flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete Post
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TOURISM & FARMING */}
        {(tab === 'tourism' || tab === 'farming') &&
          renderPhotoGalleryManager(
            tab,
            tab === 'tourism' ? 'Tourism Attractions' : 'Farming & Agricultural Items',
            'bg-emerald-100 text-emerald-900'
          )}

        {/* CONTACT INFO */}
        {tab === 'contact' && (
          <div className="max-w-xl bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h2 className="text-xl font-bold">Woreda Contact Information</h2>
            {['address', 'phone', 'email', 'officeHours'].map((field) => (
              <div key={field}>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  {field}
                </label>
                <input
                  value={data.contact?.[field] || ''}
                  onChange={(e) =>
                    setData((p) => ({ ...p, contact: { ...p.contact, [field]: e.target.value } }))
                  }
                  className="w-full text-sm px-3 py-2 border rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        {/* MEDIA LIBRARY */}
        {tab === 'media' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Uploaded Media Library</h2>
                <p className="text-sm text-slate-500">
                  All photos uploaded across any section of Genjii Woreda.
                </p>
              </div>
              <label className="cursor-pointer bg-emerald-950 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2">
                <Upload size={16} /> Upload to Library
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files?.[0] && processImageUpload(e.target.files[0], 'Media Library')
                  }
                />
              </label>
            </div>
            {(data.mediaLibrary || []).length === 0 ? (
              <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-sm text-slate-500">
                No custom files uploaded yet. Upload a photo in Charity, Hospital, Hero, or here to see it listed.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(data.mediaLibrary || []).map((m) => (
                  <div key={m.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <img src={m.url} alt={m.name} className="w-full h-36 object-cover" />
                    <div className="p-3">
                      <div className="text-xs font-bold truncate">{m.name}</div>
                      <div className="text-[11px] text-emerald-700 font-semibold">{m.section}</div>
                      <button
                        onClick={() =>
                          setData((p) => ({
                            ...p,
                            mediaLibrary: (p.mediaLibrary || []).filter((item) => item.id !== m.id),
                          }))
                        }
                        className="mt-2 text-[11px] text-red-600 font-bold"
                      >
                        Remove Record
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}