export type TripType = 'one-way' | 'round-trip' | 'local' | 'airport';

export interface Vehicle {
  id: string;
  name: string;
  tagline: string;
  category: 'sedan' | 'suv' | 'luxury' | 'tempo';
  image: string;
  seats: number;
  luggage: number;
  ratePerKm: number;
  minKmPerDay: number;
  driverAllowancePerDay: number;
  oneWayStartingPrice: number;
  /** Optional fixed local package, typically 8 hours / 80 km. */
  localStartingPrice?: number;
  imageCreditLabel?: string;
  imageCreditUrl?: string;
  features: string[];
  description: string;
  popularFor: string;
  isPopular?: boolean;
  /** Shown under the "Premium" fleet filter (captain seats, executive chauffeur). */
  isPremium?: boolean;
  /** Seating variants offered for the same vehicle class (e.g. Tempo Traveller 14 / 17 / 20 / 26). */
  seatVariants?: string;
}

export type RouteCategory = 'intercity' | 'airport' | 'pilgrimage' | 'hill-station' | 'coastal';

export interface PopularRoute {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  duration: string;
  startingPrice: number;
  featuredCar: string;
  routeType: 'one-way' | 'round-trip';
  category: RouteCategory;
  tag?: string;
  description: string;
}

/** One hub city and every destination we regularly drive to from it (route directory). */
export interface RouteHub {
  hub: string;
  destinations: string[];
}

export type PackageCategory =
  | 'Pilgrimage'
  | 'Jyotirlinga'
  | 'Hill Station'
  | 'Coastal'
  | 'Heritage'
  | 'Inter-State'
  | 'Adventure';

export interface TourPackage {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  startingPrice: number;
  image: string;
  category: PackageCategory;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    details: string;
  }[];
  /** Vehicle classes offered for this package. */
  vehicleOptions?: string[];
  /** All inter-state / district permits and tolls handled by us. */
  permitsReady?: boolean;
  /** Temple-wait, wheelchair and slow-pace assistance for elders. */
  seniorFriendly?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  bestFor: string[];
  /** Approximate road distance in km from our Nashik base (0 = local city package). */
  distanceFromNashik: number;
  bestSeason: string;
  accent: 'amber' | 'emerald' | 'blue' | 'rose' | 'purple' | 'teal' | 'orange' | 'indigo';
  icon: 'Waves' | 'Palmtree' | 'Grape' | 'Building2' | 'Landmark' | 'Church' | 'Mountain' | 'Sun' | 'Castle' | 'Flower2';
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  benefits: string[];
  startingPriceTag: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  route: string;
  rating: number;
  date: string;
  comment: string;
  carTaken: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'booking' | 'pricing' | 'service';
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  discountLabel: string;
  validTill: string;
  appliesTo: string;
  terms: string[];
  accent: 'amber' | 'emerald' | 'blue' | 'rose' | 'purple';
  isFeatured?: boolean;
}

export interface TravelGuide {
  id: string;
  title: string;
  excerpt: string;
  category: 'Pilgrimage' | 'Hill Station' | 'Travel Tips' | 'Road Trip';
  readTime: string;
  image: string;
  tips: string[];
  bestTime: string;
  suggestedCab: string;
}

export interface BookingFormData {
  bookingRef?: string;
  /** false when the booking API could not deliver the request and the traveller must send it on WhatsApp. */
  emailSent?: boolean;
  tripType: TripType;
  pickupCity: string;
  dropCity: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  selectedCarId: string;
  passengers: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupAddress?: string;
  specialRequirements?: string;
  estimatedFare?: number;
}
