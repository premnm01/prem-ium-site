export interface AllSite {
  business: string;
  category: string;
  city: string;
  slug: string; // portal /live/<slug>
}

/** Every site built to date. Links resolve through the portal's /live/ route
 *  (served from GitHub, so they work even when a disposable preview host has
 *  been evicted). Sourced from the portal's data/sites.json. */
export const LIVE_BASE = 'https://prem-ium-inc-client-portal.onrender.com/live';

export const allSites: AllSite[] = [
  { business: 'QueSnack', category: 'Fast Food', city: 'Hyderabad', slug: 'quesnack' },
  { business: 'Bellam & Kaaram', category: 'Cloud Kitchen', city: 'Secunderabad', slug: 'bellam-kaaram' },
  { business: 'Seva Science', category: 'Health Equity', city: 'San Diego, CA', slug: '8dxvb0' },
  { business: 'Redline Barbershop', category: 'Barbershop', city: 'Fresno, CA', slug: 'donrff-wph6' },
  { business: 'TLC Grooming', category: 'Pet Grooming', city: 'Visalia, CA', slug: 'n85tjg-lkjr' },
  { business: "Poochie's Pet Club", category: 'Pet Grooming', city: 'Visalia, CA', slug: 'zw0omc-gn0d' },
  { business: 'Quintana Auto Detailing', category: 'Auto Detailing', city: 'Visalia, CA', slug: 'le73rr' },
  { business: "Saldana's Exhaust and Muffler", category: 'Auto Repair', city: 'Hanford, CA', slug: 'is1f0b' },
  { business: 'Castlewood Upholstery Studio', category: 'Upholstery', city: 'Chico, CA', slug: 'fgogv2' },
  { business: 'Tapiceria Rivera', category: 'Upholstery', city: 'Stockton, CA', slug: '9bn8a1-6y5z' },
  { business: 'Go2 Upholstery', category: 'Upholstery', city: 'Lodi, CA', slug: '0fsmj5-2f30' },
  { business: "Fowler's Auto Upholstery Shop", category: 'Auto Upholstery', city: 'Stockton, CA', slug: 'cilr7a-wxd2' },
  { business: "Celina's Alterations", category: 'Alterations', city: 'Merced, CA', slug: 'kng0mz' },
  { business: 'Mission Alterations', category: 'Alterations', city: 'Fresno, CA', slug: 'r1q447' },
  { business: "Rafaela's Alterations", category: 'Alterations', city: 'Porterville, CA', slug: 'h760o7' },
  { business: 'Darzi Alteration & Seamstress', category: 'Alterations', city: 'Modesto, CA', slug: 'jsq05s-wph6' },
  { business: 'Hoffman Alterations and Embroidery', category: 'Alterations', city: 'Modesto, CA', slug: 'ehxw2s-jnx2' },
  { business: 'Ocean Alterations & Tailor Service', category: 'Alterations', city: 'Surfside Beach, TX', slug: 'vk1b2p' },
  { business: 'Cal Plumbing & Fire Suppression Inc.', category: 'Plumbing', city: 'Blue Lake, CA', slug: 'fgpmte' },
  { business: 'Central Plumbing & Sewers', category: 'Plumbing', city: 'Alameda, CA', slug: 'm3kp7x' },
  { business: 'North Bay Plumbing', category: 'Plumbing', city: 'Fairfield, CA', slug: 'ld0y59' },
  { business: 'Coleman Plumbing', category: 'Plumbing', city: 'Redwood Valley, CA', slug: 'vbbr9o' },
  { business: 'CBS Plumbing & Heating, Inc.', category: 'Plumbing', city: 'Santa Rosa, CA', slug: '52gos3' },
  { business: "Constantini's Heating & Air Conditioning", category: 'HVAC', city: 'Santa Rosa, CA', slug: 't39zoh' },
  { business: "Gilian's Watch & Jewelry Service", category: 'Jewelry', city: 'Sacramento, CA', slug: '1ywa4m' },
  { business: 'M & B Lock And Door Repair', category: 'Locksmith', city: 'Bakersfield, CA', slug: 'y9hcyn-nhof' },
  { business: "Bob's Shoe Repair", category: 'Shoe Repair', city: 'Turlock, CA', slug: 'uee4d4' },
  { business: 'HDT Technologies', category: 'Technology', city: 'California', slug: 'lzg0s3' },
];
