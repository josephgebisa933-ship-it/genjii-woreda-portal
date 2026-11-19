import React, { createContext, useContext, useState, useEffect } from 'react';

const PortalContext = createContext();

const INITIAL_DATA = {
  heroSlides: [
    {
      id: 'h1',
      title: 'Welcome to Genjii Woreda Administration',
      subtitle: 'Transparent governance, sustainable highland agriculture, and inclusive community development across all 24 kebeles.',
      badge: 'West Wollega Zone, Oromia',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    },
    {
      id: 'h2',
      title: 'Organic Highland Coffee & Modern Farming',
      subtitle: 'Supporting local farmers with improved seedlings, irrigation, and international market access.',
      badge: 'Agricultural Excellence',
      image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1600&q=80',
    },
  ],
  about: {
    heading: 'A Highland Hub of Culture, Agriculture, and Progress',
    description:
      'Located in the fertile highlands of West Wollega Zone, Oromia Regional State, Genjii Woreda is renowned for its lush landscapes, rich cultural heritage, and thriving agricultural economy.',
    history:
      'Established as an administrative district to bring public services closer to rural and urban communities, Genjii Woreda has grown into a model center for cooperative coffee production, community-led infrastructure, and youth education.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900&q=80',
    stats: [
      { label: 'Administrative Kebeles', value: '24' },
      { label: 'Estimated Population', value: '115,000+' },
      { label: 'Coffee & Crop Land', value: '78%' },
      { label: 'Public Service Centers', value: '32' },
    ],
  },
  leaders: [
    {
      id: 'l1',
      name: 'Obbo Bekele Tadesse',
      role: 'Chief Woreda Administrator',
      bio: 'Leading district-wide development, public accountability, and infrastructure modernization.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'l2',
      name: 'Adde Chaltu Gemechu',
      role: 'Head of Agriculture & Natural Resources',
      bio: 'Spearheading organic Arabica coffee certification and watershed conservation programs.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'l3',
      name: 'Dr. Dawit Olana',
      role: 'Head of Woreda Health Office',
      bio: 'Expanding maternal healthcare, hospital facilities, and rural health extension access.',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    },
  ],
  services: [
    {
      id: 's1',
      title: 'Civil Registration & Vital Records',
      office: 'Administrative Affairs Office',
      description: 'Birth, marriage, residence ID cards, and official kebele certification services.',
    },
    {
      id: 's2',
      title: 'Trade & Business Licensing',
      office: 'Trade & Market Development',
      description: 'New business registration, annual license renewal, and cooperative permits.',
    },
    {
      id: 's3',
      title: 'Land Administration & Urban Planning',
      office: 'Land Management Office',
      description: 'Rural land holding certificates, boundary verification, and construction permits.',
    },
    {
      id: 's4',
      title: 'Agricultural Extension & Inputs',
      office: 'Agriculture Office',
      description: 'Distribution of improved coffee seedlings, fertilizers, and veterinary support.',
    },
  ],
  news: [
    {
      id: 'n1',
      title: 'New Rural Road & Bridge Project Completed Across 4 Kebeles',
      date: 'November 12, 2026',
      category: 'Infrastructure',
      summary: 'All-weather feeder roads now connect highland coffee farmers directly to Genjii central market.',
      content:
        'The Genjii Woreda Administration, in partnership with local community contributors, has officially inaugurated 18 kilometers of upgraded rural road and two concrete bridges, reducing transport time by over 60%.',
      coverImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
      ],
    },
  ],
  charityPhotos: [
    {
      id: 'c1',
      title: 'School Materials & Uniform Support for Orphans',
      caption: 'Annual community charity drive supporting 450 students across Genjii primary schools.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'c2',
      title: 'Community Housing Renovation for Elders',
      caption: 'Youth volunteers rebuilding homes for elderly residents in rural kebeles.',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    },
  ],
  hospitalPhotos: [
    {
      id: 'hp1',
      title: 'Genjii Primary Hospital — Main Outpatient Wing',
      caption: '24/7 emergency, maternal care, and diagnostic laboratory services.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'hp2',
      title: 'Modern Maternal & Child Health Ward',
      caption: 'Newly equipped delivery and neonatal care unit serving the entire district.',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    },
  ],
  footballPhotos: [
    {
      id: 'fb1',
      title: 'Genjii Woreda Cup — Opening Ceremony',
      caption: '24 kebele teams competing in the annual youth football championship.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'fb2',
      title: 'Championship Final Match at Genjii Stadium',
      caption: 'Thousands of supporters celebrating youth sportsmanship and unity.',
      image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=800&q=80',
    },
  ],
  tourism: [
    {
      id: 't1',
      title: 'Genjii Highland Forest & Waterfall Trail',
      description: 'Lush indigenous forest reserve with scenic waterfalls and endemic birdlife.',
      features: ['Guided Eco-Trails', 'Panoramic Viewpoints', 'Indigenous Flora'],
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 't2',
      title: 'Traditional Oromo Cultural Heritage Center',
      description: 'Showcasing Gadaa heritage, traditional artifacts, music, and hospitality.',
      features: ['Cultural Museum', 'Coffee Ceremony', 'Local Handicrafts'],
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
    },
  ],
  farming: [
    {
      id: 'f1',
      title: 'Organic Washed Arabica Coffee',
      season: 'Oct – Jan Harvest',
      description: 'High-altitude shade-grown coffee prized for its floral aroma and bright acidity.',
      image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'f2',
      title: 'Highland Honey & Apiculture',
      season: 'Year-Round',
      description: 'Pure forest white and golden honey produced by modern frame-hive cooperatives.',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'f3',
      title: 'Maize, Teff & Horticultural Crops',
      season: 'Meher & Belg Seasons',
      description: 'Staple grain and organic vegetable production sustaining regional food security.',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    },
  ],
  biography: {
    name: 'Abba Gadaa & Pioneer Elders of Genjii',
    title: 'Founders of Community Unity & Land Stewardship',
    era: 'Historical Heritage Profile',
    quote: '“When the community stands together like the roots of the Oda tree, no storm can shake our land.”',
    story:
      'Generations of respected elders, educators, and community builders in Genjii Woreda laid the foundation for peaceful coexistence, environmental protection, and collective self-help (Dabo and Jigii) that continues to guide the district today.',
    image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=800&q=80',
  },
  contact: {
    address: 'Genjii Town, West Wollega Zone, Oromia, Ethiopia',
    phone: '+251 57 771 0000',
    email: 'info@genjiiworeda.gov.et',
    officeHours: 'Monday – Friday: 8:30 AM – 5:30 PM',
    facebook: 'https://facebook.com',
    telegram: 'https://t.me',
  },
  mediaLibrary: [],
};

export function PortalProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('genjii_portal_data_v1');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('genjii_admin_session') === 'true';
  });

  const [viewMode, setViewMode] = useState('public'); // 'public' | 'admin'

  useEffect(() => {
    try {
      localStorage.setItem('genjii_portal_data_v1', JSON.stringify(data));
    } catch (e) {
      console.warn('Storage quota warning:', e);
    }
  }, [data]);

  const loginAdmin = (username, password) => {
    if (username === 'admin' && password === 'genjii2026') {
      sessionStorage.setItem('genjii_admin_session', 'true');
      setIsAdmin(true);
      setViewMode('admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    sessionStorage.removeItem('genjii_admin_session');
    setIsAdmin(false);
    setViewMode('public');
  };

  // Helper to convert uploaded file to Base64 & log in Media Library
  const processImageUpload = (file, sectionLabel = 'General') => {
    return new Promise((resolve, reject) => {
      if (!file) return reject('No file selected');
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        const mediaItem = {
          id: 'm_' + Date.now() + Math.random().toString(36).slice(2, 6),
          name: file.name,
          section: sectionLabel,
          url: base64,
          uploadedAt: new Date().toLocaleString(),
        };
        setData((prev) => ({
          ...prev,
          mediaLibrary: [mediaItem, ...(prev.mediaLibrary || [])],
        }));
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const resetToDefault = () => {
    localStorage.removeItem('genjii_portal_data_v1');
    setData(INITIAL_DATA);
  };

  return (
    <PortalContext.Provider
      value={{
        data,
        setData,
        isAdmin,
        viewMode,
        setViewMode,
        loginAdmin,
        logoutAdmin,
        processImageUpload,
        resetToDefault,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export const usePortal = () => useContext(PortalContext);