export type MenuCategoryType = 
  | 'all' 
  | 'espresso' 
  | 'signature' 
  | 'cold-brew' 
  | 'tea-matcha' 
  | 'bakery' 
  | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategoryType;
  description: string;
  price: string;
  priceInr: number;
  origin?: string;
  notes: string[];
  process?: string;
  elevation?: string;
  image: string;
  badge?: string;
  temperature?: 'Hot' | 'Iced' | 'Both';
  span?: 'normal' | 'tall' | 'wide';
}

export interface CartItem {
  product: MenuItem;
  quantity: number;
  notes?: string;
}

export interface SeasonalSpecial {
  id: string;
  title: string;
  subtitle: string;
  edition: string;
  description: string;
  notes: string[];
  price: string;
  priceInr: number;
  harvest: string;
  flavorProfile: {
    acidity: number;
    sweetness: number;
    body: number;
  };
  image: string;
}

export interface ExperienceStep {
  number: string;
  title: string;
  caption: string;
  description: string;
  image: string;
  detail: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  location: string;
  category: string;
  aspect: 'portrait' | 'landscape' | 'square';
  src: string;
  alt: string;
}
