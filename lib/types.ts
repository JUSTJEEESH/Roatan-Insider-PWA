export type Category =
  | 'eat'
  | 'drink'
  | 'dive'
  | 'tours'
  | 'shop'
  | 'stay'
  | 'rentals'
  | 'transport'
  | 'beaches';

export type Area =
  | 'west_bay'
  | 'west_end'
  | 'sandy_bay'
  | 'coxen_hole'
  | 'flowers_bay'
  | 'french_harbour'
  | 'oak_ridge'
  | 'punta_gorda'
  | 'port_royal'
  | 'camp_bay';

export type PriceRange = 1 | 2 | 3 | 4;

export type BusinessStatus = 'active' | 'paused' | 'closed';

export interface DayHours {
  open: string;
  close: string;
}

export interface BusinessHours {
  monday: DayHours | null;
  tuesday: DayHours | null;
  wednesday: DayHours | null;
  thursday: DayHours | null;
  friday: DayHours | null;
  saturday: DayHours | null;
  sunday: DayHours | null;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  description: string;
  insiderTip: string | null;
  category: Category;
  subcategory: string;
  area: Area;
  latitude: number;
  longitude: number;
  addressDescription: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  priceRange: PriceRange;
  hours: BusinessHours;
  features: string[];
  images: string[];
  isVerified: boolean;
  isFeatured: boolean;
  verifiedAt: string | null;
  status: BusinessStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInfo {
  name: string;
  slug: Category;
  icon: string;
  color: string;
  description: string;
  subcategories: string[];
}

export interface AreaInfo {
  name: string;
  slug: Area;
  description: string;
  vibe: string;
  bestFor: string;
  latitude: number;
  longitude: number;
  zoomLevel: number;
}
