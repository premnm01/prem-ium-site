export interface CharityEntry {
  business: string;
  city: string;
  category: string;
  renderUrl: string;
  whyFree: string;
}

/** Hand-picked, built-but-never-outreached sites from the fleet's own
 *  records (no owner/phone/email on file yet). Offered free instead of
 *  going to waste. Static for v1 — no dynamic /api/sites wiring. */
export const charity: CharityEntry[] = [
  { business: 'Redline Barbershop', city: 'Fresno, CA', category: 'Barbershop', renderUrl: 'https://preview-donrff-wph6.onrender.com', whyFree: 'Built during a fleet run, never reached out to the owner — offered here free instead.' },
  { business: 'TLC Grooming', city: 'Visalia, CA', category: 'Pet Grooming', renderUrl: 'https://preview-n85tjg-lkjr.onrender.com', whyFree: 'A full site sitting unclaimed. If this is your shop, it is yours — no charge.' },
  { business: 'M & B Lock And Door Repair', city: 'Bakersfield, CA', category: 'Locksmith', renderUrl: 'https://preview-y9hcyn-nhof.onrender.com', whyFree: 'Already designed and deployed. We just never got around to sending it.' },
  { business: 'Tapiceria Rivera', city: 'Stockton, CA', category: 'Upholstery', renderUrl: 'https://preview-9bn8a1-6y5z.onrender.com', whyFree: 'Built, live, and waiting for its business to claim it.' },
  { business: "Gilian's Watch & Jewelry Service", city: 'Sacramento, CA', category: 'Jewelry', renderUrl: 'https://prem-ium-inc-client-portal.onrender.com/live/1ywa4m', whyFree: 'One of the first sites we built and forgot to send. Free, permanently.' },
];
