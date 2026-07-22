export interface AllSite {
  business: string;
  category: string;
  city: string;
  slug: string; // portal /live/<slug>
}

/** Every site built to date (270), pulled from the portal's public /api/sites.
 *  Links resolve through the /live/<slug> route (served from GitHub, so they
 *  work even when a disposable preview host has been evicted). To refresh:
 *  curl https://portal.prem-ium.online/api/sites and regen. */
export const LIVE_BASE = 'https://portal.prem-ium.online/live';

export const allSites: AllSite[] = [
  {
    "business": "Bob's Shoe Repair",
    "category": "Shoe Repair",
    "city": "Turlock, CA",
    "slug": "uee4d4"
  },
  {
    "business": "Cal Plumbing & Fire Suppression Inc.",
    "category": "Plumbing",
    "city": "Blue Lake, CA",
    "slug": "fgpmte"
  },
  {
    "business": "Castlewood Upholstery Studio",
    "category": "Upholstery",
    "city": "Chico, CA",
    "slug": "fgogv2"
  },
  {
    "business": "Celina's Alterations",
    "category": "Alterations",
    "city": "Merced, CA",
    "slug": "kng0mz"
  },
  {
    "business": "Central Plumbing & Sewers",
    "category": "Plumbing",
    "city": "Alameda, CA",
    "slug": "m3kp7x"
  },
  {
    "business": "Coleman Plumbing",
    "category": "Plumbing",
    "city": "Redwood Valley, CA",
    "slug": "vbbr9o"
  },
  {
    "business": "Constantini's Heating & Air Conditioning",
    "category": "HVAC",
    "city": "Santa Rosa, CA",
    "slug": "t39zoh"
  },
  {
    "business": "Darzi Alteration & Seamstress",
    "category": "Alterations",
    "city": "Modesto, CA",
    "slug": "jsq05s-wph6"
  },
  {
    "business": "Fowler's Auto Upholstery Shop",
    "category": "Auto Upholstery",
    "city": "Stockton, CA",
    "slug": "cilr7a-wxd2"
  },
  {
    "business": "Gilian's Watch & Jewelry Service",
    "category": "Jewelry",
    "city": "Sacramento, CA",
    "slug": "1ywa4m"
  },
  {
    "business": "Go2 Upholstery",
    "category": "Upholstery",
    "city": "Lodi, CA",
    "slug": "0fsmj5-2f30"
  },
  {
    "business": "Hoffman Alterations and Embroidery",
    "category": "Alterations",
    "city": "Modesto, CA",
    "slug": "ehxw2s-jnx2"
  },
  {
    "business": "M & B Lock And Door Repair",
    "category": "Locksmith",
    "city": "Bakersfield, CA",
    "slug": "y9hcyn-nhof"
  },
  {
    "business": "Mission Alterations",
    "category": "Alterations",
    "city": "Fresno, CA",
    "slug": "r1q447"
  },
  {
    "business": "North Bay Plumbing",
    "category": "Plumbing",
    "city": "Fairfield, CA",
    "slug": "ld0y59"
  },
  {
    "business": "Ocean Alterations & Tailor Service",
    "category": "Alterations",
    "city": "Surfside Beach, TX",
    "slug": "vk1b2p"
  },
  {
    "business": "Poochie's Pet Club Pet Grooming",
    "category": "Pet Grooming",
    "city": "Visalia, CA",
    "slug": "zw0omc-gn0d"
  },
  {
    "business": "QueSnack",
    "category": "Fast Food",
    "city": "Hyderabad",
    "slug": "quesnack"
  },
  {
    "business": "Quintana Auto Detailing",
    "category": "Auto Detailing",
    "city": "Visalia, CA",
    "slug": "le73rr"
  },
  {
    "business": "Rafaela's Alterations",
    "category": "Alterations",
    "city": "Porterville, CA",
    "slug": "h760o7"
  },
  {
    "business": "Saldana's Exhaust and Muffler",
    "category": "Auto Repair",
    "city": "Hanford, CA",
    "slug": "is1f0b"
  },
  {
    "business": "Seva Science",
    "category": "Health Equity",
    "city": "San Diego, CA",
    "slug": "8dxvb0"
  },
  {
    "business": "Tapiceria Rivera",
    "category": "Upholstery",
    "city": "Stockton, CA",
    "slug": "9bn8a1-6y5z"
  },
  {
    "business": "TLC Grooming",
    "category": "Pet Grooming",
    "city": "Visalia, CA",
    "slug": "n85tjg-lkjr"
  },
  {
    "business": "32 Creations Dental Clinic Andheri",
    "category": "Website",
    "city": "",
    "slug": "32-creations-dental-clinic-andheri"
  },
  {
    "business": "A C P Communication Chaaru Mobiles T Nagar",
    "category": "Website",
    "city": "",
    "slug": "a-c-p-communication-chaaru-mobiles-t-nagar"
  },
  {
    "business": "A1 Beauty Parlour Mumbai",
    "category": "Website",
    "city": "",
    "slug": "a1-beauty-parlour-mumbai"
  },
  {
    "business": "Aadarsh Namkeen Bhopal",
    "category": "Website",
    "city": "",
    "slug": "aadarsh-namkeen-bhopal"
  },
  {
    "business": "Aarambh Clinic Bhopal",
    "category": "Website",
    "city": "",
    "slug": "aarambh-clinic-bhopal"
  },
  {
    "business": "Aatman Tattoos Bangalore Banashankari Bangalore",
    "category": "Website",
    "city": "",
    "slug": "aatman-tattoos-bangalore-banashankari-bangalore"
  },
  {
    "business": "Aayushman Physiotherapy Clinic Navimumbai",
    "category": "Website",
    "city": "",
    "slug": "aayushman-physiotherapy-clinic-navimumbai"
  },
  {
    "business": "Advance Dental Care Clinic Indore",
    "category": "Website",
    "city": "",
    "slug": "advance-dental-care-clinic-indore"
  },
  {
    "business": "AL Latif Caterers Pune",
    "category": "Website",
    "city": "",
    "slug": "al-latif-caterers-pune"
  },
  {
    "business": "Amar Tailors Vadodara",
    "category": "Website",
    "city": "",
    "slug": "amar-tailors-vadodara"
  },
  {
    "business": "Anbu Dental Implant Maxillofacial Clinic Anna Nagar",
    "category": "Website",
    "city": "",
    "slug": "anbu-dental-implant-maxillofacial-clinic-anna-nagar"
  },
  {
    "business": "Angel S Basket Lajpat Nagar",
    "category": "Website",
    "city": "",
    "slug": "angel-s-basket-lajpat-nagar"
  },
  {
    "business": "Ankur Maternity Home Navi Mumba",
    "category": "Website",
    "city": "",
    "slug": "ankur-maternity-home-navi-mumba"
  },
  {
    "business": "Ansari Fashion Hub Nagpur",
    "category": "Website",
    "city": "",
    "slug": "ansari-fashion-hub-nagpur"
  },
  {
    "business": "Anu Naagar Studio Lajpat Nagar",
    "category": "Website",
    "city": "",
    "slug": "anu-naagar-studio-lajpat-nagar"
  },
  {
    "business": "Anuja Beauty Makeover Wagholi Pune",
    "category": "Website",
    "city": "",
    "slug": "anuja-beauty-makeover-wagholi-pune"
  },
  {
    "business": "Archana S Beauty Parlour Institure Hinjewadi",
    "category": "Website",
    "city": "",
    "slug": "archana-s-beauty-parlour-institure-hinjewadi"
  },
  {
    "business": "Archana S Beauty Parlour Institure Kothrud",
    "category": "Website",
    "city": "",
    "slug": "archana-s-beauty-parlour-institure-kothrud"
  },
  {
    "business": "Arslan Shawarma King Mumbai",
    "category": "Website",
    "city": "",
    "slug": "arslan-shawarma-king-mumbai"
  },
  {
    "business": "Artysto Salon Coimbatore",
    "category": "Website",
    "city": "",
    "slug": "artysto-salon-coimbatore"
  },
  {
    "business": "Aruvi Natural Restaurant Kochi",
    "category": "Website",
    "city": "",
    "slug": "aruvi-natural-restaurant-kochi"
  },
  {
    "business": "Arya Beauty Parlour Kothrud",
    "category": "Website",
    "city": "",
    "slug": "arya-beauty-parlour-kothrud"
  },
  {
    "business": "Ashish Motors Andheri",
    "category": "Website",
    "city": "",
    "slug": "ashish-motors-andheri"
  },
  {
    "business": "Aura Gym Ludhiana Ludhiana",
    "category": "Website",
    "city": "",
    "slug": "aura-gym-ludhiana-ludhiana"
  },
  {
    "business": "Autozone BY Batra Car Care Gurgaon",
    "category": "Website",
    "city": "",
    "slug": "autozone-by-batra-car-care-gurgaon"
  },
  {
    "business": "Ayulife Ayurveda Panchkarma 15 Gurgaon",
    "category": "Website",
    "city": "",
    "slug": "ayulife-ayurveda-panchkarma-15-gurgaon"
  },
  {
    "business": "B L Enterprises Laptop Repair Jaipur",
    "category": "Website",
    "city": "",
    "slug": "b-l-enterprises-laptop-repair-jaipur"
  },
  {
    "business": "Bawarchi Hyderabad",
    "category": "Website",
    "city": "",
    "slug": "bawarchi-hyderabad"
  },
  {
    "business": "Beauty Adore by Mahi",
    "category": "Website",
    "city": "",
    "slug": "beauty-adore-by-mahi"
  },
  {
    "business": "Bellam & Kaaram",
    "category": "Website",
    "city": "",
    "slug": "bellam-kaaram"
  },
  {
    "business": "Belle 32 Andheri",
    "category": "Website",
    "city": "",
    "slug": "belle-32-andheri"
  },
  {
    "business": "Best Opticians And Eye Clinic Bangalore",
    "category": "Website",
    "city": "",
    "slug": "best-opticians-and-eye-clinic-bangalore"
  },
  {
    "business": "Beyond Smiles Indiranagar",
    "category": "Website",
    "city": "",
    "slug": "beyond-smiles-indiranagar"
  },
  {
    "business": "Birdy S Bakery And Patisserie Mumbai",
    "category": "Website",
    "city": "",
    "slug": "birdy-s-bakery-and-patisserie-mumbai"
  },
  {
    "business": "BK Ent Care Chennai",
    "category": "Website",
    "city": "",
    "slug": "bk-ent-care-chennai"
  },
  {
    "business": "Blue Cat Computer Shoppee Kothrud",
    "category": "Website",
    "city": "",
    "slug": "blue-cat-computer-shoppee-kothrud"
  },
  {
    "business": "Blue Planet Event Management Mumbai",
    "category": "Website",
    "city": "",
    "slug": "blue-planet-event-management-mumbai"
  },
  {
    "business": "Blush Beauty Studio Demo",
    "category": "Website",
    "city": "",
    "slug": "blush-beauty-studio-demo"
  },
  {
    "business": "Brilliant Academy Whitefield",
    "category": "Website",
    "city": "",
    "slug": "brilliant-academy-whitefield"
  },
  {
    "business": "Bulesh Bakery Borivali",
    "category": "Website",
    "city": "",
    "slug": "bulesh-bakery-borivali"
  },
  {
    "business": "Caf Delight Mysore",
    "category": "Website",
    "city": "",
    "slug": "caf-delight-mysore"
  },
  {
    "business": "California Barber Shop",
    "category": "Website",
    "city": "",
    "slug": "california-barber-shop"
  },
  {
    "business": "Carves Bhopal",
    "category": "Website",
    "city": "",
    "slug": "carves-bhopal"
  },
  {
    "business": "Cauvery Opthalmic Optician Bangalore",
    "category": "Website",
    "city": "",
    "slug": "cauvery-opthalmic-optician-bangalore"
  },
  {
    "business": "Champion Physiotherapy Coimbatore",
    "category": "Website",
    "city": "",
    "slug": "champion-physiotherapy-coimbatore"
  },
  {
    "business": "Champion Unisex Gym Karol Bagh",
    "category": "Website",
    "city": "",
    "slug": "champion-unisex-gym-karol-bagh"
  },
  {
    "business": "Chandan Electricals Hardware Koramangala",
    "category": "Website",
    "city": "",
    "slug": "chandan-electricals-hardware-koramangala"
  },
  {
    "business": "Cityfix Repair Demo",
    "category": "Website",
    "city": "",
    "slug": "cityfix-repair-demo"
  },
  {
    "business": "Classic Men Salon Lajpat Nagar",
    "category": "Website",
    "city": "",
    "slug": "classic-men-salon-lajpat-nagar"
  },
  {
    "business": "Cosmocare Bhopal",
    "category": "Website",
    "city": "",
    "slug": "cosmocare-bhopal"
  },
  {
    "business": "Crom Chennai",
    "category": "Website",
    "city": "",
    "slug": "crom-chennai"
  },
  {
    "business": "Crown Dental Clinic Andheri",
    "category": "Website",
    "city": "",
    "slug": "crown-dental-clinic-andheri"
  },
  {
    "business": "Crystal Lifestyles Pune",
    "category": "Website",
    "city": "",
    "slug": "crystal-lifestyles-pune"
  },
  {
    "business": "Cure N Care Homoeopathic Clinic Whitefield",
    "category": "Website",
    "city": "",
    "slug": "cure-n-care-homoeopathic-clinic-whitefield"
  },
  {
    "business": "Daksha Dental Care Coimbatore",
    "category": "Website",
    "city": "",
    "slug": "daksha-dental-care-coimbatore"
  },
  {
    "business": "Deepak Electronics And Electricals Kothrud",
    "category": "Website",
    "city": "",
    "slug": "deepak-electronics-and-electricals-kothrud"
  },
  {
    "business": "Demo Dark Luxe Gym",
    "category": "Website",
    "city": "",
    "slug": "demo-dark-luxe-gym"
  },
  {
    "business": "Demo Editorial Warm Bakery",
    "category": "Website",
    "city": "",
    "slug": "demo-editorial-warm-bakery"
  },
  {
    "business": "Demo Minimal Pro Clinic",
    "category": "Website",
    "city": "",
    "slug": "demo-minimal-pro-clinic"
  },
  {
    "business": "Demo Vibrant Play Academy",
    "category": "Website",
    "city": "",
    "slug": "demo-vibrant-play-academy"
  },
  {
    "business": "Dey Brother S Jewellers Salt Lake",
    "category": "Website",
    "city": "",
    "slug": "dey-brother-s-jewellers-salt-lake"
  },
  {
    "business": "Dgd Bamnoli Dwarka",
    "category": "Website",
    "city": "",
    "slug": "dgd-bamnoli-dwarka"
  },
  {
    "business": "Dgd Dindarpur Dwarka",
    "category": "Website",
    "city": "",
    "slug": "dgd-dindarpur-dwarka"
  },
  {
    "business": "Dgd Hiran Kudna Dwarka",
    "category": "Website",
    "city": "",
    "slug": "dgd-hiran-kudna-dwarka"
  },
  {
    "business": "Dgd Jwala Puri Dwarka",
    "category": "Website",
    "city": "",
    "slug": "dgd-jwala-puri-dwarka"
  },
  {
    "business": "Dgd Khyala Dwarka",
    "category": "Website",
    "city": "",
    "slug": "dgd-khyala-dwarka"
  },
  {
    "business": "Dgd Nangli Sakrawati Dwarka",
    "category": "Website",
    "city": "",
    "slug": "dgd-nangli-sakrawati-dwarka"
  },
  {
    "business": "Dgd Ram Dutt Enclave Dwarka",
    "category": "Website",
    "city": "",
    "slug": "dgd-ram-dutt-enclave-dwarka"
  },
  {
    "business": "Dgd Sec 19 Dwarka Dwarka",
    "category": "Website",
    "city": "",
    "slug": "dgd-sec-19-dwarka-dwarka"
  },
  {
    "business": "Dgd Tikri Kalan Dwarka",
    "category": "Website",
    "city": "",
    "slug": "dgd-tikri-kalan-dwarka"
  },
  {
    "business": "Diamond Bakery Pune",
    "category": "Website",
    "city": "",
    "slug": "diamond-bakery-pune"
  },
  {
    "business": "Divine And Healthy Smiles DR Tarun And Pushpa Verma Indore",
    "category": "Website",
    "city": "",
    "slug": "divine-and-healthy-smiles-dr-tarun-and-pushpa-verma-indore"
  },
  {
    "business": "DJ Ink Tattoo Studio Lajpat Nagar",
    "category": "Website",
    "city": "",
    "slug": "dj-ink-tattoo-studio-lajpat-nagar"
  },
  {
    "business": "Doctor Dubey S Dental Clinic Noida",
    "category": "Website",
    "city": "",
    "slug": "doctor-dubey-s-dental-clinic-noida"
  },
  {
    "business": "Donie's Art",
    "category": "Website",
    "city": "",
    "slug": "donie-s-art"
  },
  {
    "business": "DR D A Tapia Bandra Mumbai",
    "category": "Website",
    "city": "",
    "slug": "dr-d-a-tapia-bandra-mumbai"
  },
  {
    "business": "DR Jain S Clinic Dwarka",
    "category": "Website",
    "city": "",
    "slug": "dr-jain-s-clinic-dwarka"
  },
  {
    "business": "DR Ram S Diabetes Endocrine Clinic Anna Nagar",
    "category": "Website",
    "city": "",
    "slug": "dr-ram-s-diabetes-endocrine-clinic-anna-nagar"
  },
  {
    "business": "DR S K Jain S Clinic Dwarka",
    "category": "Website",
    "city": "",
    "slug": "dr-s-k-jain-s-clinic-dwarka"
  },
  {
    "business": "DR Umesh Trivedi Bandra Mumbai",
    "category": "Website",
    "city": "",
    "slug": "dr-umesh-trivedi-bandra-mumbai"
  },
  {
    "business": "Dream Girl Fashion Hinjewadi",
    "category": "Website",
    "city": "",
    "slug": "dream-girl-fashion-hinjewadi"
  },
  {
    "business": "Elite Images Digital Colour Lab Bandra",
    "category": "Website",
    "city": "",
    "slug": "elite-images-digital-colour-lab-bandra"
  },
  {
    "business": "Enlightiq Bengaluru",
    "category": "Website",
    "city": "",
    "slug": "enlightiq-bengaluru"
  },
  {
    "business": "Family Dental Care Bengaluru",
    "category": "Website",
    "city": "",
    "slug": "family-dental-care-bengaluru"
  },
  {
    "business": "Fit Life Gym Bengaluru",
    "category": "Website",
    "city": "",
    "slug": "fit-life-gym-bengaluru"
  },
  {
    "business": "Fitness Fury Bengaluru",
    "category": "Website",
    "city": "",
    "slug": "fitness-fury-bengaluru"
  },
  {
    "business": "Florista Bandra",
    "category": "Website",
    "city": "",
    "slug": "florista-bandra"
  },
  {
    "business": "Focus Gym Noida",
    "category": "Website",
    "city": "",
    "slug": "focus-gym-noida"
  },
  {
    "business": "Fonix Events Kochi",
    "category": "Website",
    "city": "",
    "slug": "fonix-events-kochi"
  },
  {
    "business": "Furrbites Mumbai",
    "category": "Website",
    "city": "",
    "slug": "furrbites-mumbai"
  },
  {
    "business": "G Force Gym Fitness T Nagar",
    "category": "Website",
    "city": "",
    "slug": "g-force-gym-fitness-t-nagar"
  },
  {
    "business": "Ganga Sweets T Nagar",
    "category": "Website",
    "city": "",
    "slug": "ganga-sweets-t-nagar"
  },
  {
    "business": "Gift Gallery Hinjewadi",
    "category": "Website",
    "city": "",
    "slug": "gift-gallery-hinjewadi"
  },
  {
    "business": "Glowdent Clinic Kothrud",
    "category": "Website",
    "city": "",
    "slug": "glowdent-clinic-kothrud"
  },
  {
    "business": "Golden Bliss Thai Foot Spa Navi Mumbai",
    "category": "Website",
    "city": "",
    "slug": "golden-bliss-thai-foot-spa-navi-mumbai"
  },
  {
    "business": "Golden Scissor Secunderabad",
    "category": "Website",
    "city": "",
    "slug": "golden-scissor-secunderabad"
  },
  {
    "business": "Good Looks Unisex Salon Wagholi Pune",
    "category": "Website",
    "city": "",
    "slug": "good-looks-unisex-salon-wagholi-pune"
  },
  {
    "business": "Good Luck Restaurant Mumbai",
    "category": "Website",
    "city": "",
    "slug": "good-luck-restaurant-mumbai"
  },
  {
    "business": "Gowtham Plantain Leaf Koramangala",
    "category": "Website",
    "city": "",
    "slug": "gowtham-plantain-leaf-koramangala"
  },
  {
    "business": "H P Poddar Memorial Clinic And Nursing Home New Town",
    "category": "Website",
    "city": "",
    "slug": "h-p-poddar-memorial-clinic-and-nursing-home-new-town"
  },
  {
    "business": "Hakim S Aalim Hair Lounge Mumbai",
    "category": "Website",
    "city": "",
    "slug": "hakim-s-aalim-hair-lounge-mumbai"
  },
  {
    "business": "HDT Technologies",
    "category": "Website",
    "city": "",
    "slug": "lzg0s3"
  },
  {
    "business": "Health India Lajpat Nagar",
    "category": "Website",
    "city": "",
    "slug": "health-india-lajpat-nagar"
  },
  {
    "business": "Hindustan Bakery Vadodara",
    "category": "Website",
    "city": "",
    "slug": "hindustan-bakery-vadodara"
  },
  {
    "business": "Hot Chips Farsan Borivali",
    "category": "Website",
    "city": "",
    "slug": "hot-chips-farsan-borivali"
  },
  {
    "business": "Hotel Shadab Hyderabad",
    "category": "Website",
    "city": "",
    "slug": "hotel-shadab-hyderabad"
  },
  {
    "business": "Hyderabad Dental Hospital Banjara Hills",
    "category": "Website",
    "city": "",
    "slug": "hyderabad-dental-hospital-banjara-hills"
  },
  {
    "business": "Icon Fitness Club Mangalore",
    "category": "Website",
    "city": "",
    "slug": "icon-fitness-club-mangalore"
  },
  {
    "business": "Indian Combat Sports Academy Bangalore",
    "category": "Website",
    "city": "",
    "slug": "indian-combat-sports-academy-bangalore"
  },
  {
    "business": "Inkkme Tattoo Studio Indore",
    "category": "Website",
    "city": "",
    "slug": "inkkme-tattoo-studio-indore"
  },
  {
    "business": "Jeff Caterers Mumbai",
    "category": "Website",
    "city": "",
    "slug": "jeff-caterers-mumbai"
  },
  {
    "business": "Jockey Chennai",
    "category": "Website",
    "city": "",
    "slug": "jockey-chennai"
  },
  {
    "business": "K R Market Bangalore",
    "category": "Website",
    "city": "",
    "slug": "k-r-market-bangalore"
  },
  {
    "business": "Kamini Beauty Parlor Lajpat Nagar",
    "category": "Website",
    "city": "",
    "slug": "kamini-beauty-parlor-lajpat-nagar"
  },
  {
    "business": "Karthik Mens Beauty Salon Secunderabad",
    "category": "Website",
    "city": "",
    "slug": "karthik-mens-beauty-salon-secunderabad"
  },
  {
    "business": "Kdc Dental Clinic Bengaluru",
    "category": "Website",
    "city": "",
    "slug": "kdc-dental-clinic-bengaluru"
  },
  {
    "business": "Khaira Nursing Home Ludhiana",
    "category": "Website",
    "city": "",
    "slug": "khaira-nursing-home-ludhiana"
  },
  {
    "business": "Kon RK BE GA RU",
    "category": "Website",
    "city": "",
    "slug": "kon-rk-be-ga-ru"
  },
  {
    "business": "Kongdor Dental Clinic Mangalore",
    "category": "Website",
    "city": "",
    "slug": "kongdor-dental-clinic-mangalore"
  },
  {
    "business": "Latha Ladies Tailor Vijayawada",
    "category": "Website",
    "city": "",
    "slug": "latha-ladies-tailor-vijayawada"
  },
  {
    "business": "Laxmi Tirumala Hair Style Secunderabad",
    "category": "Website",
    "city": "",
    "slug": "laxmi-tirumala-hair-style-secunderabad"
  },
  {
    "business": "Lazeez Biryani House Demo",
    "category": "Website",
    "city": "",
    "slug": "lazeez-biryani-house-demo"
  },
  {
    "business": "Leena Beauty Parlour Nagpur",
    "category": "Website",
    "city": "",
    "slug": "leena-beauty-parlour-nagpur"
  },
  {
    "business": "Little Krishna Kids Dental Care Coimbatore",
    "category": "Website",
    "city": "",
    "slug": "little-krishna-kids-dental-care-coimbatore"
  },
  {
    "business": "Local Eatery Mumbai",
    "category": "Website",
    "city": "",
    "slug": "local-eatery-mumbai"
  },
  {
    "business": "Lotus Hospital Mumbai",
    "category": "Website",
    "city": "",
    "slug": "lotus-hospital-mumbai"
  },
  {
    "business": "Lucky Biryani Borivali",
    "category": "Website",
    "city": "",
    "slug": "lucky-biryani-borivali"
  },
  {
    "business": "M Fit Gym Lajpat Nagar",
    "category": "Website",
    "city": "",
    "slug": "m-fit-gym-lajpat-nagar"
  },
  {
    "business": "M M Trading Company Koramangala",
    "category": "Website",
    "city": "",
    "slug": "m-m-trading-company-koramangala"
  },
  {
    "business": "Madurai",
    "category": "Website",
    "city": "",
    "slug": "madurai"
  },
  {
    "business": "Magadh Oro Dental DR Abhishek Kumar Dentist Implantologist I",
    "category": "Website",
    "city": "",
    "slug": "magadh-oro-dental-dr-abhishek-kumar-dentist-implantologist-i"
  },
  {
    "business": "Mahaveer Studio Mangalore",
    "category": "Website",
    "city": "",
    "slug": "mahaveer-studio-mangalore"
  },
  {
    "business": "Mane A Secunderabad",
    "category": "Website",
    "city": "",
    "slug": "mane-a-secunderabad"
  },
  {
    "business": "Mane Holige",
    "category": "Website",
    "city": "",
    "slug": "mane-holige"
  },
  {
    "business": "Mani-Pedi Spa",
    "category": "Website",
    "city": "",
    "slug": "mani-pedi-spa"
  },
  {
    "business": "Manisha S Innovation Hinjewadi",
    "category": "Website",
    "city": "",
    "slug": "manisha-s-innovation-hinjewadi"
  },
  {
    "business": "Menz Code Salon Lajpat Nagar",
    "category": "Website",
    "city": "",
    "slug": "menz-code-salon-lajpat-nagar"
  },
  {
    "business": "Merwans Borivali",
    "category": "Website",
    "city": "",
    "slug": "merwans-borivali"
  },
  {
    "business": "Metro Dhaba Noida",
    "category": "Website",
    "city": "",
    "slug": "metro-dhaba-noida"
  },
  {
    "business": "Ministry OF Club Dehradun",
    "category": "Website",
    "city": "",
    "slug": "ministry-of-club-dehradun"
  },
  {
    "business": "Miwi Salon Spa Secunnderabad",
    "category": "Website",
    "city": "",
    "slug": "miwi-salon-spa-secunnderabad"
  },
  {
    "business": "Modern Homeo Hall Dwarka",
    "category": "Website",
    "city": "",
    "slug": "modern-homeo-hall-dwarka"
  },
  {
    "business": "Modern Martial Arts Fitness Centre Kothrud",
    "category": "Website",
    "city": "",
    "slug": "modern-martial-arts-fitness-centre-kothrud"
  },
  {
    "business": "Mogli Fitness Gym Delhi",
    "category": "Website",
    "city": "",
    "slug": "mogli-fitness-gym-delhi"
  },
  {
    "business": "Monte Carlo Exclusive Showroom Ahmedabad",
    "category": "Website",
    "city": "",
    "slug": "monte-carlo-exclusive-showroom-ahmedabad"
  },
  {
    "business": "MP Birla Eye Clinic Park Street",
    "category": "Website",
    "city": "",
    "slug": "mp-birla-eye-clinic-park-street"
  },
  {
    "business": "MP Birla Eye Clinic Salt Lake",
    "category": "Website",
    "city": "",
    "slug": "mp-birla-eye-clinic-salt-lake"
  },
  {
    "business": "Namrata Electronics Pune",
    "category": "Website",
    "city": "",
    "slug": "namrata-electronics-pune"
  },
  {
    "business": "Nanking Restaurant Dehradun",
    "category": "Website",
    "city": "",
    "slug": "nanking-restaurant-dehradun"
  },
  {
    "business": "Naresh Gym Vijayawada",
    "category": "Website",
    "city": "",
    "slug": "naresh-gym-vijayawada"
  },
  {
    "business": "New Ganesh Cafe Chennai",
    "category": "Website",
    "city": "",
    "slug": "new-ganesh-cafe-chennai"
  },
  {
    "business": "New Welcome Bakery Borivali",
    "category": "Website",
    "city": "",
    "slug": "new-welcome-bakery-borivali"
  },
  {
    "business": "Nias Marikar Photography Ernakulam",
    "category": "Website",
    "city": "",
    "slug": "nias-marikar-photography-ernakulam"
  },
  {
    "business": "Nirvana Borivali",
    "category": "Website",
    "city": "",
    "slug": "nirvana-borivali"
  },
  {
    "business": "Odin Fitness Club Noida",
    "category": "Website",
    "city": "",
    "slug": "odin-fitness-club-noida"
  },
  {
    "business": "Old Pal Dhaba Chandigarh",
    "category": "Website",
    "city": "",
    "slug": "old-pal-dhaba-chandigarh"
  },
  {
    "business": "Olympia Restaurant Kathi Kebabs Viman Nagar",
    "category": "Website",
    "city": "",
    "slug": "olympia-restaurant-kathi-kebabs-viman-nagar"
  },
  {
    "business": "Page3 Events Bangalore",
    "category": "Website",
    "city": "",
    "slug": "page3-events-bangalore"
  },
  {
    "business": "Parimal S Tutorials Whitefield",
    "category": "Website",
    "city": "",
    "slug": "parimal-s-tutorials-whitefield"
  },
  {
    "business": "Passion Fitness Pune",
    "category": "Website",
    "city": "",
    "slug": "passion-fitness-pune"
  },
  {
    "business": "Patanjali Yoga Training And Research Centre Elamakkara",
    "category": "Website",
    "city": "",
    "slug": "patanjali-yoga-training-and-research-centre-elamakkara"
  },
  {
    "business": "Pawar Fast Food Mumbai",
    "category": "Website",
    "city": "",
    "slug": "pawar-fast-food-mumbai"
  },
  {
    "business": "Perfect Dry Cleaners",
    "category": "Website",
    "city": "",
    "slug": "perfect-dry-cleaners"
  },
  {
    "business": "Perfect Smile Dental Care Implant Center S Rat",
    "category": "Website",
    "city": "",
    "slug": "perfect-smile-dental-care-implant-center-s-rat"
  },
  {
    "business": "Petal Vine Florist Demo",
    "category": "Website",
    "city": "",
    "slug": "petal-vine-florist-demo"
  },
  {
    "business": "Physio Fit Physiotherapy Clinic Coimbatore",
    "category": "Website",
    "city": "",
    "slug": "physio-fit-physiotherapy-clinic-coimbatore"
  },
  {
    "business": "Piles And Fistula Clinic Bangalore",
    "category": "Website",
    "city": "",
    "slug": "piles-and-fistula-clinic-bangalore"
  },
  {
    "business": "Pooja S Flower Art Bandra",
    "category": "Website",
    "city": "",
    "slug": "pooja-s-flower-art-bandra"
  },
  {
    "business": "Popeye Fitness Pune",
    "category": "Website",
    "city": "",
    "slug": "popeye-fitness-pune"
  },
  {
    "business": "Pradeep Men S Parlour Kothrud",
    "category": "Website",
    "city": "",
    "slug": "pradeep-men-s-parlour-kothrud"
  },
  {
    "business": "Prashanth Opticians Bangalore",
    "category": "Website",
    "city": "",
    "slug": "prashanth-opticians-bangalore"
  },
  {
    "business": "Praveen Opticians Bangalore",
    "category": "Website",
    "city": "",
    "slug": "praveen-opticians-bangalore"
  },
  {
    "business": "Purvika Auto Electrical Vijayawada",
    "category": "Website",
    "city": "",
    "slug": "purvika-auto-electrical-vijayawada"
  },
  {
    "business": "R D Jindal Charitable Clinic New Delhi",
    "category": "Website",
    "city": "",
    "slug": "r-d-jindal-charitable-clinic-new-delhi"
  },
  {
    "business": "Rama Photo Studio Amritsar",
    "category": "Website",
    "city": "",
    "slug": "rama-photo-studio-amritsar"
  },
  {
    "business": "Rao Sudhindra S Doctor Mangalore",
    "category": "Website",
    "city": "",
    "slug": "rao-sudhindra-s-doctor-mangalore"
  },
  {
    "business": "Rashmi Dental Clinic Indore",
    "category": "Website",
    "city": "",
    "slug": "rashmi-dental-clinic-indore"
  },
  {
    "business": "RB Academy Indiranagar",
    "category": "Website",
    "city": "",
    "slug": "rb-academy-indiranagar"
  },
  {
    "business": "Rini S Family Saloon Visakhapatnam",
    "category": "Website",
    "city": "",
    "slug": "rini-s-family-saloon-visakhapatnam"
  },
  {
    "business": "Roopali Jewellers Chennai",
    "category": "Website",
    "city": "",
    "slug": "roopali-jewellers-chennai"
  },
  {
    "business": "Royal Bakery Jaipur",
    "category": "Website",
    "city": "",
    "slug": "royal-bakery-jaipur"
  },
  {
    "business": "Royal Dental Clinic Dental Clinic IN Mumbai Mumbai",
    "category": "Website",
    "city": "",
    "slug": "royal-dental-clinic-dental-clinic-in-mumbai-mumbai"
  },
  {
    "business": "Royal Fitness Club Kothrud",
    "category": "Website",
    "city": "",
    "slug": "royal-fitness-club-kothrud"
  },
  {
    "business": "RS Power Fitness Bengaluru",
    "category": "Website",
    "city": "",
    "slug": "rs-power-fitness-bengaluru"
  },
  {
    "business": "Rupal Hospital",
    "category": "Website",
    "city": "",
    "slug": "rupal-hospital"
  },
  {
    "business": "Sagar Optician Pune",
    "category": "Website",
    "city": "",
    "slug": "sagar-optician-pune"
  },
  {
    "business": "Sai Planet Hair And Beauty Lajpat Nagar",
    "category": "Website",
    "city": "",
    "slug": "sai-planet-hair-and-beauty-lajpat-nagar"
  },
  {
    "business": "Sai Swarup Auto Works Vijayawada",
    "category": "Website",
    "city": "",
    "slug": "sai-swarup-auto-works-vijayawada"
  },
  {
    "business": "Sathya Veda Super Speciality Clinic Banjara Hills",
    "category": "Website",
    "city": "",
    "slug": "sathya-veda-super-speciality-clinic-banjara-hills"
  },
  {
    "business": "See Eyewear Opticals Eye Clinic Hyderabad",
    "category": "Website",
    "city": "",
    "slug": "see-eyewear-opticals-eye-clinic-hyderabad"
  },
  {
    "business": "Seeds OF Life Mumbai",
    "category": "Website",
    "city": "",
    "slug": "seeds-of-life-mumbai"
  },
  {
    "business": "Seema S Hair Skin Clinique Ladies Beauty Parlour And Nail SA",
    "category": "Website",
    "city": "",
    "slug": "seema-s-hair-skin-clinique-ladies-beauty-parlour-and-nail-sa"
  },
  {
    "business": "Shakthi Gold Gym Secunderabad",
    "category": "Website",
    "city": "",
    "slug": "shakthi-gold-gym-secunderabad"
  },
  {
    "business": "Shanghai Kitchen Noida",
    "category": "Website",
    "city": "",
    "slug": "shanghai-kitchen-noida"
  },
  {
    "business": "Sharp Shooters Films Jaipur",
    "category": "Website",
    "city": "",
    "slug": "sharp-shooters-films-jaipur"
  },
  {
    "business": "Shiloh Hair Styles Vijayawada",
    "category": "Website",
    "city": "",
    "slug": "shiloh-hair-styles-vijayawada"
  },
  {
    "business": "Shree Jagannath Gajak Bhandar Jaipur",
    "category": "Website",
    "city": "",
    "slug": "shree-jagannath-gajak-bhandar-jaipur"
  },
  {
    "business": "Shri Ram Bakery Dwarka",
    "category": "Website",
    "city": "",
    "slug": "shri-ram-bakery-dwarka"
  },
  {
    "business": "Shri Sagar Formerly Ctr Bangalore",
    "category": "Website",
    "city": "",
    "slug": "shri-sagar-formerly-ctr-bangalore"
  },
  {
    "business": "Shusrusha Nursing Home Kolkata New Town",
    "category": "Website",
    "city": "",
    "slug": "shusrusha-nursing-home-kolkata-new-town"
  },
  {
    "business": "Smiles ON Whitefield",
    "category": "Website",
    "city": "",
    "slug": "smiles-on-whitefield"
  },
  {
    "business": "Smit Family Salon Rajkot",
    "category": "Website",
    "city": "",
    "slug": "smit-family-salon-rajkot"
  },
  {
    "business": "Snazzy Snaps Madurai",
    "category": "Website",
    "city": "",
    "slug": "snazzy-snaps-madurai"
  },
  {
    "business": "Softbuzz Computer Classes Surat",
    "category": "Website",
    "city": "",
    "slug": "softbuzz-computer-classes-surat"
  },
  {
    "business": "Sokhi Boutique Nagpur",
    "category": "Website",
    "city": "",
    "slug": "sokhi-boutique-nagpur"
  },
  {
    "business": "Sosha Garden Cafe Dehradun",
    "category": "Website",
    "city": "",
    "slug": "sosha-garden-cafe-dehradun"
  },
  {
    "business": "Special Classes For Students Vijayawada",
    "category": "Website",
    "city": "",
    "slug": "special-classes-for-students-vijayawada"
  },
  {
    "business": "Speciality Dental Clinic Navi Mumbai",
    "category": "Website",
    "city": "",
    "slug": "speciality-dental-clinic-navi-mumbai"
  },
  {
    "business": "Spices And Sauces Park Street",
    "category": "Website",
    "city": "",
    "slug": "spices-and-sauces-park-street"
  },
  {
    "business": "Spices And Sauces Salt Lake",
    "category": "Website",
    "city": "",
    "slug": "spices-and-sauces-salt-lake"
  },
  {
    "business": "Sree K K Dry Cleaners Anna Nagar",
    "category": "Website",
    "city": "",
    "slug": "sree-k-k-dry-cleaners-anna-nagar"
  },
  {
    "business": "Sree Raju S Polyclinic Secunderabad",
    "category": "Website",
    "city": "",
    "slug": "sree-raju-s-polyclinic-secunderabad"
  },
  {
    "business": "Sree Swagath Mens Parlour Secunderabad",
    "category": "Website",
    "city": "",
    "slug": "sree-swagath-mens-parlour-secunderabad"
  },
  {
    "business": "Sri Bhavani Jewellers Hyderabad",
    "category": "Website",
    "city": "",
    "slug": "sri-bhavani-jewellers-hyderabad"
  },
  {
    "business": "Sri Hari Dental Clinic Pune",
    "category": "Website",
    "city": "",
    "slug": "sri-hari-dental-clinic-pune"
  },
  {
    "business": "Sri Nandishwara Hair Style Secunderabad",
    "category": "Website",
    "city": "",
    "slug": "sri-nandishwara-hair-style-secunderabad"
  },
  {
    "business": "Sri Venkataswara Arogya Nilayam Hyderabad",
    "category": "Website",
    "city": "",
    "slug": "sri-venkataswara-arogya-nilayam-hyderabad"
  },
  {
    "business": "Sudershan Jewellers",
    "category": "Website",
    "city": "",
    "slug": "sudershan-jewellers"
  },
  {
    "business": "Sudha Jewellers Madurai",
    "category": "Website",
    "city": "",
    "slug": "sudha-jewellers-madurai"
  },
  {
    "business": "Sugardough",
    "category": "Website",
    "city": "",
    "slug": "sugardough"
  },
  {
    "business": "Surana Dental Clinic Indore",
    "category": "Website",
    "city": "",
    "slug": "surana-dental-clinic-indore"
  },
  {
    "business": "Svt Infotech Vijayawada",
    "category": "Website",
    "city": "",
    "slug": "svt-infotech-vijayawada"
  },
  {
    "business": "Swagath Mens Hair Saloon Secunderabad",
    "category": "Website",
    "city": "",
    "slug": "swagath-mens-hair-saloon-secunderabad"
  },
  {
    "business": "Swastik Acting Modeling Institute Salt Lake",
    "category": "Website",
    "city": "",
    "slug": "swastik-acting-modeling-institute-salt-lake"
  },
  {
    "business": "Sweet Bengal Mumbai",
    "category": "Website",
    "city": "",
    "slug": "sweet-bengal-mumbai"
  },
  {
    "business": "Talisman A Tattoo Boutique Chennai",
    "category": "Website",
    "city": "",
    "slug": "talisman-a-tattoo-boutique-chennai"
  },
  {
    "business": "Target Fitness Kukatpally",
    "category": "Website",
    "city": "",
    "slug": "target-fitness-kukatpally"
  },
  {
    "business": "Tea Villa Cafe Borivali",
    "category": "Website",
    "city": "",
    "slug": "tea-villa-cafe-borivali"
  },
  {
    "business": "The Body Zone Gym Bangalore",
    "category": "Website",
    "city": "",
    "slug": "the-body-zone-gym-bangalore"
  },
  {
    "business": "The Cake Love Vadodara",
    "category": "Website",
    "city": "",
    "slug": "the-cake-love-vadodara"
  },
  {
    "business": "The Root Academy Hsr Layout",
    "category": "Website",
    "city": "",
    "slug": "the-root-academy-hsr-layout"
  },
  {
    "business": "Tokyo Bakery Hinjewadi",
    "category": "Website",
    "city": "",
    "slug": "tokyo-bakery-hinjewadi"
  },
  {
    "business": "Tokyo Beauty Parlour Mumbai",
    "category": "Website",
    "city": "",
    "slug": "tokyo-beauty-parlour-mumbai"
  },
  {
    "business": "Tooth Town Dental Clinic S Rat",
    "category": "Website",
    "city": "",
    "slug": "tooth-town-dental-clinic-s-rat"
  },
  {
    "business": "Toppers Mumbai",
    "category": "Website",
    "city": "",
    "slug": "toppers-mumbai"
  },
  {
    "business": "Uday Studio Indiranagar",
    "category": "Website",
    "city": "",
    "slug": "uday-studio-indiranagar"
  },
  {
    "business": "V L Care Bangalore",
    "category": "Website",
    "city": "",
    "slug": "v-l-care-bangalore"
  },
  {
    "business": "Vandhya Academy Jayanagar",
    "category": "Website",
    "city": "",
    "slug": "vandhya-academy-jayanagar"
  },
  {
    "business": "Vanesha Beauty Studio Lajpat Nagar",
    "category": "Website",
    "city": "",
    "slug": "vanesha-beauty-studio-lajpat-nagar"
  },
  {
    "business": "Vasireddy Swagruha Foods - Ruchi Caterers",
    "category": "Website",
    "city": "",
    "slug": "vasireddy-swagruha-foods-ruchi-caterers"
  },
  {
    "business": "Vidha Jayanagar",
    "category": "Website",
    "city": "",
    "slug": "vidha-jayanagar"
  },
  {
    "business": "Vigour Fitness Bangalore",
    "category": "Website",
    "city": "",
    "slug": "vigour-fitness-bangalore"
  },
  {
    "business": "Wellness Skin Clinic Hamam Spa Kolkata",
    "category": "Website",
    "city": "",
    "slug": "wellness-skin-clinic-hamam-spa-kolkata"
  },
  {
    "business": "Wonder Color Photo Lab Mumbai",
    "category": "Website",
    "city": "",
    "slug": "wonder-color-photo-lab-mumbai"
  },
  {
    "business": "Yogita Restaurant Mumbai",
    "category": "Website",
    "city": "",
    "slug": "yogita-restaurant-mumbai"
  },
  {
    "business": "Yokoso Hinjewadi",
    "category": "Website",
    "city": "",
    "slug": "yokoso-hinjewadi"
  }
];
