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
  { business: 'Redline Barbershop', city: 'Fresno, CA', category: 'Barbershop', renderUrl: 'https://portal.prem-ium.online/live/donrff-wph6', whyFree: 'Built during a fleet run, never reached out to the owner — offered here free instead.' },
  { business: 'TLC Grooming', city: 'Visalia, CA', category: 'Pet Grooming', renderUrl: 'https://portal.prem-ium.online/live/n85tjg-lkjr', whyFree: 'A full site sitting unclaimed. If this is your shop, it is yours — no charge.' },
  { business: 'M & B Lock And Door Repair', city: 'Bakersfield, CA', category: 'Locksmith', renderUrl: 'https://portal.prem-ium.online/live/y9hcyn-nhof', whyFree: 'Already designed and deployed. We just never got around to sending it.' },
  { business: 'Tapiceria Rivera', city: 'Stockton, CA', category: 'Upholstery', renderUrl: 'https://portal.prem-ium.online/live/9bn8a1-6y5z', whyFree: 'Built, live, and waiting for its business to claim it.' },
  { business: "Gilian's Watch & Jewelry Service", city: 'Sacramento, CA', category: 'Jewelry', renderUrl: 'https://portal.prem-ium.online/live/1ywa4m', whyFree: 'One of the first sites we built and forgot to send. Free, permanently.' },
];
