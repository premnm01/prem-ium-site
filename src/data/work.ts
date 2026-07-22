export interface SiteEntry {
  business: string;
  city: string;
  category: string;
  renderUrl: string;
}

/** Curated subset of real, live client sites — same shape as the existing
 *  prem-ium-inc portfolio.html SITES array. Hand-picked, not fetched. */
export const work: SiteEntry[] = [
  { business: 'Cal Plumbing & Fire Suppression Inc.', city: 'Blue Lake, CA', category: 'Plumbing / HVAC', renderUrl: 'https://prem-ium-inc-client-portal.onrender.com/live/fgpmte' },
  { business: "Celina's Alterations", city: 'Merced, CA', category: 'Alterations', renderUrl: 'https://prem-ium-inc-client-portal.onrender.com/live/kng0mz' },
  { business: 'Seva Science', city: 'San Diego, CA', category: 'Tech', renderUrl: 'https://prem-ium-inc-client-portal.onrender.com/live/8dxvb0' },
  { business: 'Castlewood Upholstery Studio', city: 'Chico, CA', category: 'Auto', renderUrl: 'https://prem-ium-inc-client-portal.onrender.com/live/fgogv2' },
  { business: "Saldana's Exhaust and Muffler", city: 'Hanford, CA', category: 'Auto', renderUrl: 'https://prem-ium-inc-client-portal.onrender.com/live/is1f0b' },
  { business: 'Quintana Auto Detailing', city: 'Visalia, CA', category: 'Auto', renderUrl: 'https://prem-ium-inc-client-portal.onrender.com/live/le73rr' },
  { business: 'Mission Alterations', city: 'Fresno, CA', category: 'Alterations', renderUrl: 'https://prem-ium-inc-client-portal.onrender.com/live/r1q447' },
];
