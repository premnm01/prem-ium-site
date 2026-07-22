export interface GalleryShot {
  img: string;        // screenshot in /public/portfolio
  business: string;
  category: string;
  url: string;        // live site (served via portal /live/, bypasses evicted hosts)
  featured?: boolean;
}

/** Real sites, captured as hero-fold screenshots. Featured pair first.
 *  Live URLs use the portal's /live/ route so they resolve from GitHub even
 *  when the disposable preview-*.onrender.com host has been evicted. */
export const gallery: GalleryShot[] = [
  { img: '/portfolio/quesnack.jpg', business: 'QueSnack', category: 'Cloud Kitchen · Hyderabad', url: 'https://prem-ium-inc-client-portal.onrender.com/live/quesnack', featured: true },
  { img: '/portfolio/bellam-kaaram.jpg', business: 'Bellam & Kaaram', category: 'Cloud Kitchen · Secunderabad', url: 'https://prem-ium-inc-client-portal.onrender.com/live/bellam-kaaram', featured: true },
  { img: '/portfolio/seva-science.jpg', business: 'Seva Science', category: 'Health Equity · San Diego', url: 'https://prem-ium-inc-client-portal.onrender.com/live/8dxvb0' },
  { img: '/portfolio/quintana-auto.jpg', business: 'Quintana Auto Detailing', category: 'Auto · Visalia', url: 'https://prem-ium-inc-client-portal.onrender.com/live/le73rr' },
  { img: '/portfolio/celina-alterations.jpg', business: "Celina's Alterations", category: 'Tailoring · Merced', url: 'https://prem-ium-inc-client-portal.onrender.com/live/kng0mz' },
  { img: '/portfolio/castlewood-upholstery.jpg', business: 'Castlewood Upholstery', category: 'Upholstery · Chico', url: 'https://prem-ium-inc-client-portal.onrender.com/live/fgogv2' },
  { img: '/portfolio/cal-plumbing.jpg', business: 'Cal Plumbing & Fire', category: 'Plumbing · Blue Lake', url: 'https://prem-ium-inc-client-portal.onrender.com/live/fgpmte' },
  { img: '/portfolio/saldana-exhaust.jpg', business: "Saldana's Exhaust", category: 'Auto · Hanford', url: 'https://prem-ium-inc-client-portal.onrender.com/live/is1f0b' },
];
