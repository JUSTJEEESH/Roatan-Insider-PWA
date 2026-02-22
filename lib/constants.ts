import type { CategoryInfo, AreaInfo } from './types';

export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'Eat',
    slug: 'eat',
    icon: 'UtensilsCrossed',
    color: '#E85D4A',
    description: 'Restaurants, cafes, food trucks, and local baleada stands',
    subcategories: ['Fine Dining', 'Casual', 'Seafood', 'Local/Baleadas', 'International', 'Cafes', 'Food Trucks'],
  },
  {
    name: 'Drink',
    slug: 'drink',
    icon: 'Wine',
    color: '#9B59B6',
    description: 'Beach bars, sports bars, cocktail lounges, and breweries',
    subcategories: ['Beach Bars', 'Sports Bars', 'Cocktail Lounges', 'Breweries', 'Happy Hours'],
  },
  {
    name: 'Dive & Snorkel',
    slug: 'dive',
    icon: 'Waves',
    color: '#2196F3',
    description: 'PADI centers, snorkel tours, freediving, and equipment rental',
    subcategories: ['PADI Centers', 'Snorkel Tours', 'Freediving', 'Equipment Rental'],
  },
  {
    name: 'Tours & Activities',
    slug: 'tours',
    icon: 'Compass',
    color: '#4CAF50',
    description: 'Island tours, boat trips, zip-lining, ATV, fishing, and more',
    subcategories: ['Island Tours', 'Boat Tours', 'Zip-lining', 'ATV', 'Cultural', 'Wildlife', 'Fishing'],
  },
  {
    name: 'Shop',
    slug: 'shop',
    icon: 'ShoppingBag',
    color: '#FF9800',
    description: 'Souvenirs, local crafts, art galleries, groceries, and cigars',
    subcategories: ['Souvenirs', 'Local Crafts', 'Art Galleries', 'Groceries', 'Cigars'],
  },
  {
    name: 'Stay',
    slug: 'stay',
    icon: 'Bed',
    color: '#795548',
    description: 'Resorts, hotels, vacation rentals, hostels, and eco-lodges',
    subcategories: ['Resorts', 'Hotels', 'Vacation Rentals', 'Hostels', 'Eco-Lodges'],
  },
  {
    name: 'Rentals',
    slug: 'rentals',
    icon: 'Key',
    color: '#607D8B',
    description: 'Cars, scooters, ATVs, golf carts, kayaks, and paddleboards',
    subcategories: ['Cars', 'Scooters', 'ATVs', 'Golf Carts', 'Kayaks', 'Paddleboards'],
  },
  {
    name: 'Transport',
    slug: 'transport',
    icon: 'Car',
    color: '#FFC107',
    description: 'Taxis, water taxis, tuk-tuks, airport shuttles, and ferries',
    subcategories: ['Taxis', 'Water Taxis', 'Tuk-Tuks', 'Airport Shuttles', 'Ferries'],
  },
  {
    name: 'Beaches',
    slug: 'beaches',
    icon: 'Umbrella',
    color: '#00BCD4',
    description: 'Public beaches, private beaches, snorkel spots, and hidden gems',
    subcategories: ['Public Beaches', 'Private Beaches', 'Snorkel Beaches', 'Hidden Gems'],
  },
];

export const AREAS: AreaInfo[] = [
  {
    name: 'West Bay',
    slug: 'west_bay',
    description: 'Home to Roatán\'s most famous white-sand beach and upscale resorts. The main tourist destination with crystal-clear water and excellent snorkeling right off the beach.',
    vibe: 'Premium beach resort area',
    bestFor: 'Beaches, snorkeling, resort dining, families',
    latitude: 16.2940,
    longitude: -86.6180,
    zoomLevel: 15,
  },
  {
    name: 'West End',
    slug: 'west_end',
    description: 'A bohemian village and the dive capital of Roatán. Narrow streets lined with dive shops, hostels, bars, and restaurants. The most walkable area on the island.',
    vibe: 'Bohemian dive/backpacker hub',
    bestFor: 'Diving, nightlife, budget dining, hostels',
    latitude: 16.2985,
    longitude: -86.6110,
    zoomLevel: 15,
  },
  {
    name: 'Sandy Bay',
    slug: 'sandy_bay',
    description: 'A quiet residential area between West End and Coxen Hole. Home to the Roatán Institute for Marine Sciences and Carambola Botanical Gardens.',
    vibe: 'Quiet residential',
    bestFor: 'Institute for Marine Sciences, relaxation',
    latitude: 16.3150,
    longitude: -86.5850,
    zoomLevel: 14,
  },
  {
    name: 'Coxen Hole',
    slug: 'coxen_hole',
    description: 'The capital and commercial center of Roatán. Where locals shop, bank, and handle business. Home to the Town Center cruise port and main municipal market.',
    vibe: 'Main town, commercial center',
    bestFor: 'Shopping, banking, local food, port access',
    latitude: 16.3040,
    longitude: -86.5560,
    zoomLevel: 14,
  },
  {
    name: 'Flowers Bay',
    slug: 'flowers_bay',
    description: 'A local neighborhood near the airport. Less touristy with authentic island life and a few hidden restaurants frequented by residents.',
    vibe: 'Airport adjacent',
    bestFor: 'Convenience, local neighborhoods',
    latitude: 16.3200,
    longitude: -86.5400,
    zoomLevel: 14,
  },
  {
    name: 'French Harbour',
    slug: 'french_harbour',
    description: 'The commercial fishing hub of Roatán, known for the best seafood restaurants on the island. Home to the famous Arch\'s Iguana Farm and several marinas.',
    vibe: 'Commercial/residential',
    bestFor: 'Seafood restaurants, iguana farm, local life',
    latitude: 16.3350,
    longitude: -86.4600,
    zoomLevel: 14,
  },
  {
    name: 'Oak Ridge',
    slug: 'oak_ridge',
    description: 'A picturesque fishing village built over the water on the island\'s south shore. Traditional stilted homes, mangrove tours, and untouched Caribbean charm.',
    vibe: 'Traditional fishing village',
    bestFor: 'Authentic experience, boat tours, mangroves',
    latitude: 16.3670,
    longitude: -86.3690,
    zoomLevel: 14,
  },
  {
    name: 'Punta Gorda',
    slug: 'punta_gorda',
    description: 'The oldest settlement on Roatán and cultural heart of the Garifuna community. Experience traditional drumming, dance, and cassava bread-making.',
    vibe: 'Garifuna cultural center',
    bestFor: 'Cultural tours, traditional food, drumming',
    latitude: 16.3730,
    longitude: -86.3420,
    zoomLevel: 14,
  },
  {
    name: 'Port Royal',
    slug: 'port_royal',
    description: 'A remote area on the eastern tip steeped in pirate history. Site of an old English fort and archaeological ruins. Accessible by boat or rough road.',
    vibe: 'Historical significance',
    bestFor: 'Archaeology, history, remote exploration',
    latitude: 16.4050,
    longitude: -86.3200,
    zoomLevel: 13,
  },
  {
    name: 'Camp Bay',
    slug: 'camp_bay',
    description: 'The undeveloped eastern end of Roatán with pristine, empty beaches and dense jungle. A true off-the-beaten-path destination for adventurers.',
    vibe: 'Remote and undeveloped',
    bestFor: 'Untouched beaches, nature, solitude',
    latitude: 16.4200,
    longitude: -86.2900,
    zoomLevel: 13,
  },
];

export const EXCHANGE_RATE_USD_TO_HNL = 24.85;

export const PRICE_RANGE_LABELS: Record<number, string> = {
  1: '$',
  2: '$$',
  3: '$$$',
  4: '$$$$',
};

export const MAP_CENTER = {
  lat: 16.3200,
  lng: -86.5500,
};

export const MAP_DEFAULT_ZOOM = 12;
export const MAP_MIN_ZOOM = 10;
export const MAP_MAX_ZOOM = 18;

export const MAP_BOUNDS = {
  north: 16.44,
  south: 16.22,
  east: -86.27,
  west: -86.72,
};
