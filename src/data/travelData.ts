import {
  Vehicle,
  PopularRoute,
  RouteHub,
  TourPackage,
  ServiceItem,
  Review,
  FaqItem,
  Offer,
  TravelGuide,
  Destination,
} from '../types/travel';

import swiftDzireImage from '../assets/images/swift_dzire_sedan_1792438497353.webp';
import auraImage from '../assets/images/hyundai-aura-user-choice.webp';
import ertigaImage from '../assets/images/ertiga_family_cab_1792438496951.webp';
import innovaImage from '../assets/images/innova_crysta_cab_1792438495834.webp';
import tempoImage from '../assets/images/tempo_traveller_coach_1792438498356.webp';
import urbaniaImage from '../assets/images/force-urbania-user-choice.webp';
import shirdiImage from '../assets/images/shirdi-sai-temple.webp';
import trimbakeshwarImage from '../assets/images/trimbakeshwar-temple.webp';
import morgaonImage from '../assets/images/morgaon-temple.webp';
import mahableshwarImage from '../assets/images/mahabaleshwar.webp';
import alibaugImage from '../assets/images/alibaug-beach.webp';
import goaImage from '../assets/images/goa-beach.webp';
import nashikImage from '../assets/images/nashik-ramkund.webp';
import tuljaImage from '../assets/images/tulja-bhavani.webp';

export const COMPANY_INFO = {
  name: "Swaraj Tours and Travels",
  marathiName: "स्वराज टूर्स अँड ट्रॅव्हल्स",
  tagline: "Your Road to Comfort - Safe, Punctual & Affordable Travel across Maharashtra & Pan-India",
  primaryPhone: "+91 98607 07287",
  rawPhone: "+919860707287",
  whatsappNumber: "919860707287",
  email: "shivrajtravels1@gmail.com",
  secondaryEmail: "booking@shivrajtravel.com",
  mainAddress: "Plot No. 114, Survey No. 193, Room No. 1, Shivajinagar, Near Mahanubhav Shree Krishna Mandir, Satpur, Nashik, Maharashtra 422007",
  /** Every trip starts from Nashik; these are the cities we drop to most often. */
  baseCity: "Nashik",
  serviceCities: ["Mumbai", "Pune", "Shirdi", "Trimbakeshwar", "Chhatrapati Sambhajinagar", "Mahabaleshwar", "Goa", "Surat"],
  experienceYears: 12,
  completedTrips: "15,000+",
  activeFleet: "65+",
  googleRating: 4.9,
  reviewsCount: "1,850+",
  supportHours: "24 Hours / 7 Days Available",
  /** Google Business Profile "write a review" short link (https://g.page/r/XXXX/review). Leave empty until the profile is live. */
  googleReviewUrl: "",
  /** Google Maps share link of the listing (https://maps.app.goo.gl/XXXX). Leave empty until the profile is live. */
  googleMapsUrl: "",
};

export const POPULAR_CITIES = [
  "Mumbai",
  "Pune",
  "Shirdi",
  "Mahabaleshwar",
  "Lonavala",
  "Trimbakeshwar",
  "Chhatrapati Sambhajinagar (Aurangabad)",
  "Kolhapur",
  "Goa",
  "Alibaug",
  "Lavasa",
  "Solapur",
  "Ahmednagar",
  "Thane",
  "Navi Mumbai"
];

export const VEHICLES: Vehicle[] = [
  {
    id: "dzire",
    name: "Maruti Suzuki Swift Dzire",
    tagline: "Most Affordable & Comfortable Sedan for Small Families",
    category: "sedan",
    image: swiftDzireImage,
    seats: 4,
    luggage: 2,
    ratePerKm: 13,
    minKmPerDay: 300,
    driverAllowancePerDay: 350,
    oneWayStartingPrice: 2799,
    features: [
      "AC with Climate Control",
      "Spacious Boot Space (2 Large Bags)",
      "Bluetooth & Music System",
      "Clean & Sanitized Interiors",
      "Complementary Mineral Water Bottle",
      "Fastag Enabled Cab"
    ],
    description: "The classic choice for budget-conscious solo travelers, couples, and small families. Unmatched fuel efficiency and nimble handling for both smooth expressways and city streets.",
    popularFor: "Nashik-Mumbai drops, Airport Transfers, Shirdi day trips",
    isPopular: true
  },
  {
    id: "aura",
    name: "Hyundai Aura",
    tagline: "Comfortable Sedan for City and Highway Trips",
    category: "sedan",
    image: auraImage,
    seats: 4,
    luggage: 2,
    ratePerKm: 13,
    minKmPerDay: 250,
    driverAllowancePerDay: 300,
    oneWayStartingPrice: 2799,
    features: [
      "Air-conditioned cabin",
      "Comfortable seating for four passengers",
      "Boot space for two large bags",
      "Bluetooth music system",
      "Clean and sanitized interiors",
      "Fastag enabled"
    ],
    description: "A comfortable compact sedan for airport transfers, one-way drops and small-family trips.",
    popularFor: "Nashik-Mumbai drops, airport transfers, small families",
    isPopular: true
  },
  {
    id: "etios",
    name: "Toyota Etios",
    tagline: "Roomy Highway Sedan with the Biggest Boot in its Class",
    category: "sedan",
    image: swiftDzireImage,
    seats: 4,
    luggage: 3,
    ratePerKm: 13,
    minKmPerDay: 300,
    driverAllowancePerDay: 350,
    oneWayStartingPrice: 2599,
    features: [
      "Extra Rear Legroom for Long Drives",
      "Large Boot for 3 Suitcases",
      "Powerful AC for Summer Highway Runs",
      "Dual Front Airbags & ABS",
      "USB Charging & Aux Music",
      "Toll Fastag Pre-loaded"
    ],
    description: "A favourite with frequent Nashik-Mumbai and Nashik-Pune travellers who carry luggage. Sturdy suspension, generous cabin space and a proven reliability record on Maharashtra highways.",
    popularFor: "Airport runs with luggage, Corporate transfers, Daily intercity drops"
  },
  {
    id: "ertiga",
    name: "Maruti Suzuki Ertiga",
    tagline: "India's Best Value 7-Seater Family MUV",
    category: "suv",
    image: ertigaImage,
    seats: 6,
    luggage: 3,
    ratePerKm: 15,
    minKmPerDay: 300,
    driverAllowancePerDay: 400,
    oneWayStartingPrice: 3200,
    features: [
      "Dual AC Vents (Rear Rows)",
      "Flexible 3-Row Seating",
      "Mobile Fast Charging Points",
      "Ample Legroom & Headroom",
      "Experienced Hill Highway Driver",
      "Roof Carrier on Request"
    ],
    description: "Perfect blend of space, comfort, and economy. Accommodates 5 to 6 passengers comfortably with medium luggage, making it the top pick for family outstation trips.",
    popularFor: "Shirdi Pilgrimages, Mahabaleshwar Weekend tours, Family Outstation",
    isPopular: true
  },
  {
    id: "rumion",
    name: "Toyota Rumion",
    tagline: "Toyota-Backed 7-Seater MPV with Roof-Mounted Rear AC",
    category: "suv",
    image: ertigaImage,
    seats: 6,
    luggage: 3,
    ratePerKm: 15,
    minKmPerDay: 300,
    driverAllowancePerDay: 400,
    oneWayStartingPrice: 3300,
    features: [
      "Roof-Mounted Rear AC with Separate Controls",
      "Flexible 3-Row Seating (fold flat for luggage)",
      "Rear Charging Ports for Every Row",
      "Smooth Petrol-CNG Highway Engine",
      "Cruise Control for Expressway Comfort",
      "Reverse Camera & Parking Sensors"
    ],
    description: "Same footprint as an Ertiga with Toyota's build quality. Ideal for families of five or six with weekend luggage heading to hill stations or temple circuits.",
    popularFor: "Family weekend tours, Bhimashankar & Shirdi darshan, Small office groups"
  },
  {
    id: "carens",
    name: "Kia Carens",
    tagline: "Modern 6+1 SUV with Individual Row AC Vents",
    category: "suv",
    image: ertigaImage,
    seats: 6,
    luggage: 3,
    ratePerKm: 16,
    minKmPerDay: 300,
    driverAllowancePerDay: 400,
    oneWayStartingPrice: 3499,
    features: [
      "AC Vents for Each Row of Seats",
      "One-Touch Tumble Middle Row for Easy Entry",
      "Six Airbags as Standard",
      "Ventilated Front Seats & Sunroof",
      "Rear Window Sunshades",
      "Type-C Fast Charging in All Rows"
    ],
    description: "A newer-generation family SUV with a quieter cabin and easier third-row access, making it a comfortable pick for elders and kids on long highway days.",
    popularFor: "Senior citizen pilgrimages, Goa & Konkan trips, Premium family outings"
  },
  {
    id: "crysta",
    name: "Toyota Innova Crysta",
    tagline: "The Gold Standard for Premium Long-Distance Travel",
    category: "suv",
    image: innovaImage,
    seats: 7,
    luggage: 4,
    ratePerKm: 20,
    minKmPerDay: 300,
    driverAllowancePerDay: 500,
    oneWayStartingPrice: 4200,
    features: [
      "Captain Seats Available",
      "Ultra-Smooth Suspension & Ride Quality",
      "Automatic Rear AC Temperature",
      "Large Boot + Roof Carrier Option",
      "Top-tier Safety with 7 Airbags & ABS",
      "Executive Chauffeur in Uniform"
    ],
    description: "Renowned for its unmatched highway comfort and reliability. Whether taking parents to Shirdi or doing a Goa holiday with friends, Innova Crysta ensures zero fatigue.",
    popularFor: "VIP Corporate, Jyotirlinga Yatras, Goa Road Trips, Wedding Guests",
    isPopular: true,
    isPremium: true
  },
  {
    id: "tempo17",
    name: "Force Tempo Traveller (13/17 Seater)",
    tagline: "Luxury Push-Back AC Coach for Family & Group Tours",
    category: "tempo",
    image: tempoImage,
    seatVariants: "14 / 17 / 20 / 26 seats available",
    seats: 17,
    luggage: 10,
    ratePerKm: 25,
    minKmPerDay: 300,
    driverAllowancePerDay: 600,
    oneWayStartingPrice: 8500,
    features: [
      "1x1 / 2x1 Push-Back Maharaja Seats",
      "Individual AC Vents & Reading Lights",
      "LED TV & High-Power Sound System",
      "Heavy Luggage Carrier with Waterproof Cover",
      "Wide Panoramic Windows for Sightseeing",
      "Trained Commercial Tourist Permit Driver"
    ],
    description: "The ideal group solution! Keeps your entire family or office group together with entertainment, reclining comfort, and luggage space.",
    popularFor: "Ashtavinayak Yatras, Wedding Guest Shuttles, Office Offsites, Picnic Groups",
    isPopular: true
  },
  {
    id: "tempo26",
    name: "Force Tempo Traveller (20/26 Seater)",
    tagline: "Big-Group Coach with PA System for Yatra Mandals & Companies",
    category: "tempo",
    image: tempoImage,
    seatVariants: "20 / 26 seats",
    seats: 26,
    luggage: 16,
    ratePerKm: 32,
    minKmPerDay: 300,
    driverAllowancePerDay: 700,
    oneWayStartingPrice: 11500,
    features: [
      "2x2 Push-Back Seats with Armrests",
      "Microphone & PA System for Guides and Bhajans",
      "Roof AC Ducting with Vent per Seat",
      "Large Rear Luggage Cabin + Roof Carrier",
      "LED Screens & Surround Audio",
      "Two Drivers on Multi-Day Yatras"
    ],
    description: "When a whole society, bhajan mandal or company team travels together. Spacious aisles, high-back seats and a PA system keep long yatras comfortable and organised.",
    popularFor: "5 Jyotirlinga group yatras, School & college trips, Corporate offsites"
  },
  {
    id: "urbania",
    name: "Force Urbania (16/17 Seater)",
    tagline: "Premium Group Van with a Spacious, Modern Cabin",
    category: "tempo",
    image: urbaniaImage,
    imageCreditLabel: "Photo: CarDekho",
    imageCreditUrl: "https://buses.cardekho.com/buses/force/urbania",
    seatVariants: "17-seater luxury AC; 16-seater variant available on request",
    seats: 17,
    luggage: 10,
    ratePerKm: 38,
    minKmPerDay: 250,
    driverAllowancePerDay: 900,
    oneWayStartingPrice: 10400,
    localStartingPrice: 8500,
    features: [
      "Premium reclining passenger seats",
      "Air-conditioned cabin with individual vents",
      "Spacious aisle and passenger legroom",
      "Large luggage storage area",
      "Comfortable option for long group journeys",
      "Experienced commercial-tourist-vehicle driver"
    ],
    description: "Premium group travel for family tours, pilgrimages, weddings and corporate trips. Available in multiple seating layouts; confirm the exact variant and fare when booking.",
    popularFor: "Premium pilgrimage tours, weddings, corporate group travel",
    isPopular: true,
    isPremium: true
  }
];

export const POPULAR_ROUTES: PopularRoute[] = [
  {
    id: "nashik-mumbai",
    from: "Nashik",
    to: "Mumbai",
    distanceKm: 165,
    duration: "3.5 - 4 Hours",
    startingPrice: 2799,
    featuredCar: "Dzire base fare; larger cars quoted separately",
    routeType: "one-way",
    category: "intercity",
    tag: "Most Popular",
    description: "Via Kasara Ghat and NH-160 to Dadar, Andheri, Thane or Navi Mumbai with early-morning doorstep pickup. Toll and parking charges are extra and payable separately."
  },
  {
    id: "nashik-mumbai-airport",
    from: "Nashik",
    to: "Mumbai Airport (T1 / T2)",
    distanceKm: 175,
    duration: "3.5 - 4 Hours",
    startingPrice: 2999,
    featuredCar: "Dzire / Etios base fare; larger cars quoted separately",
    routeType: "one-way",
    category: "airport",
    tag: "Flight-Safe Timing",
    description: "We plan the departure around your check-in time, with a buffer for Kasara Ghat traffic and Thane bottlenecks."
  },
  {
    id: "nashik-pune",
    from: "Nashik",
    to: "Pune",
    distanceKm: 215,
    duration: "4.5 - 5 Hours",
    startingPrice: 3499,
    featuredCar: "Dzire base fare; larger cars quoted separately",
    routeType: "one-way",
    category: "intercity",
    tag: "Daily Route",
    description: "Via Sangamner and Narayangaon with clean food halts; drops to Hinjewadi, Kothrud, Hadapsar and Pune Station."
  },
  {
    id: "nashik-pune-airport",
    from: "Nashik",
    to: "Pune Airport (Lohegaon)",
    distanceKm: 225,
    duration: "4.5 - 5 Hours",
    startingPrice: 3599,
    featuredCar: "Dzire base fare; larger cars quoted separately",
    routeType: "one-way",
    category: "airport",
    tag: "24x7 Airport Taxi",
    description: "Night and early-morning departures for Pune flights; name-board pickup on your return."
  },
  {
    id: "nashik-thane",
    from: "Nashik",
    to: "Thane / Navi Mumbai",
    distanceKm: 140,
    duration: "3 - 3.5 Hours",
    startingPrice: 2799,
    featuredCar: "Dzire base fare; Etios quoted separately",
    routeType: "one-way",
    category: "intercity",
    tag: "Quick Drop",
    description: "Shorter than the full Mumbai run; drops to Thane, Kalyan, Vashi, Panvel and Kharghar."
  },
  {
    id: "nashik-shirdi",
    from: "Nashik",
    to: "Shirdi",
    distanceKm: 90,
    duration: "2 Hours",
    startingPrice: 4799,
    featuredCar: "Dzire base fare; larger cars quoted separately",
    routeType: "round-trip",
    category: "pilgrimage",
    tag: "Same-Day Darshan",
    description: "Leave after breakfast, finish Samadhi Mandir darshan and return by evening with the cab waiting at the gate. Toll and parking charges are extra."
  },
  {
    id: "nashik-shirdi-shani",
    from: "Nashik",
    to: "Shirdi & Shani Shingnapur",
    distanceKm: 160,
    duration: "Full Day Circuit",
    startingPrice: 4799,
    featuredCar: "Dzire base fare; Ertiga / Crysta quoted separately",
    routeType: "round-trip",
    category: "pilgrimage",
    tag: "Two Temples, One Day",
    description: "Sai Baba darshan in the morning, Shani Shingnapur after lunch, back in Nashik for dinner. Toll and parking charges are extra."
  },
  {
    id: "nashik-trimbakeshwar",
    from: "Nashik",
    to: "Trimbakeshwar & Panchavati",
    distanceKm: 30,
    duration: "Half / Full Day",
    startingPrice: 2799,
    featuredCar: "Dzire base fare; Ertiga quoted separately",
    routeType: "round-trip",
    category: "pilgrimage",
    tag: "Jyotirlinga Special",
    description: "Kushavarta Kund, Trimbakeshwar Mandir, then Kalaram, Sita Gufa and Muktidham back in the city. Final fare depends on half-day or full-day duration."
  },
  {
    id: "nashik-saptashrungi",
    from: "Nashik",
    to: "Saptashrungi Gad (Vani)",
    distanceKm: 65,
    duration: "1.5 Hours",
    startingPrice: 4799,
    featuredCar: "Dzire base fare; larger cars quoted separately",
    routeType: "round-trip",
    category: "pilgrimage",
    tag: "Shaktipeeth",
    description: "Ropeway or steps to the Devi temple; Navratri group bookings in Tempo Travellers available. Toll and parking charges are extra."
  },
  {
    id: "nashik-bhimashankar",
    from: "Nashik",
    to: "Bhimashankar Jyotirlinga",
    distanceKm: 210,
    duration: "5 - 5.5 Hours",
    startingPrice: 10900,
    featuredCar: "Ertiga base fare; Crysta quoted separately",
    routeType: "round-trip",
    category: "pilgrimage",
    tag: "Sahyadri Forest Temple",
    description: "Via Sangamner and Manchar into the wildlife sanctuary; best as an overnight trip in monsoon."
  },
  {
    id: "nashik-sambhajinagar",
    from: "Nashik",
    to: "Chhatrapati Sambhajinagar (Aurangabad)",
    distanceKm: 185,
    duration: "3.5 - 4 Hours",
    startingPrice: 3499,
    featuredCar: "Dzire base fare; larger cars quoted separately",
    routeType: "one-way",
    category: "intercity",
    tag: "Ellora & Grishneshwar",
    description: "Straight run on the Samruddhi Mahamarg; ask for the Ellora Caves and Grishneshwar add-on halt."
  },
  {
    id: "nashik-mahabaleshwar",
    from: "Nashik",
    to: "Mahabaleshwar & Panchgani",
    distanceKm: 330,
    duration: "6.5 - 7 Hours",
    startingPrice: 10900,
    featuredCar: "Ertiga base fare; Crysta / Tempo quoted separately",
    routeType: "round-trip",
    category: "hill-station",
    tag: "2-Day Getaway",
    description: "Via Pune bypass and Pasarni Ghat; two-day package covers all viewpoints and strawberry farms."
  },
  {
    id: "nashik-lonavala",
    from: "Nashik",
    to: "Lonavala & Khandala",
    distanceKm: 220,
    duration: "4.5 Hours",
    startingPrice: 9499,
    featuredCar: "Dzire base fare; Ertiga quoted separately",
    routeType: "round-trip",
    category: "hill-station",
    tag: "Weekend Break",
    description: "Tiger Point, Bhushi Dam, Karla Caves and chikki shopping; overnight stay recommended."
  },
  {
    id: "nashik-saputara",
    from: "Nashik",
    to: "Saputara (Gujarat)",
    distanceKm: 80,
    duration: "2 Hours",
    startingPrice: 4799,
    featuredCar: "Dzire base fare; larger cars quoted separately",
    routeType: "round-trip",
    category: "hill-station",
    tag: "Closest Hill Station",
    description: "Sunset Point, Saputara Lake and the ropeway; same-day return or overnight, Gujarat permit included."
  },
  {
    id: "nashik-goa",
    from: "Nashik",
    to: "Goa (North / South)",
    distanceKm: 650,
    duration: "12 - 13 Hours",
    startingPrice: 14999,
    featuredCar: "Innova Crysta base fare; Tempo Traveller quoted separately",
    routeType: "one-way",
    category: "coastal",
    tag: "Holiday Road Trip",
    description: "Via Pune, Satara and Kolhapur on NH-48 with a planned halt; luggage carrier and full AC throughout."
  },
  {
    id: "nashik-alibaug",
    from: "Nashik",
    to: "Alibaug & Kashid",
    distanceKm: 260,
    duration: "5.5 - 6 Hours",
    startingPrice: 10900,
    featuredCar: "Ertiga base fare; Crysta quoted separately",
    routeType: "round-trip",
    category: "coastal",
    tag: "Beach Weekend",
    description: "Via Thane and Pen to the Konkan coast; stops at Nagaon, Kashid and the Murud Janjira jetty."
  },
  {
    id: "nashik-surat",
    from: "Nashik",
    to: "Surat",
    distanceKm: 230,
    duration: "4.5 Hours",
    startingPrice: 3999,
    featuredCar: "Dzire base fare; larger cars quoted separately",
    routeType: "one-way",
    category: "intercity",
    tag: "Gujarat Business Route",
    description: "Via Saputara ghat or the Vapi highway; popular with textile and diamond traders."
  }
];

/**
 * Route directory: every destination we regularly drive to from our Nashik base.
 * Clicking any destination pre-fills the booking box with Nashik as the pickup.
 */
export const ROUTE_HUBS: RouteHub[] = [
  {
    hub: "Nashik",
    destinations: [
      "Mumbai", "Mumbai Airport (T1 / T2)", "Thane", "Navi Mumbai", "Kalyan", "Borivali", "Pune", "Pune Airport (Lohegaon)",
      "Hinjewadi", "Shirdi", "Shani Shingnapur", "Trimbakeshwar", "Saptashrungi Gad (Vani)", "Bhimashankar",
      "Chhatrapati Sambhajinagar (Aurangabad)", "Ellora Caves", "Ajanta Caves", "Grishneshwar", "Ahmednagar",
      "Lonavala", "Khandala", "Mahabaleshwar", "Panchgani", "Lavasa", "Saputara", "Igatpuri", "Bhandardara",
      "Malshej Ghat", "Alibaug", "Kashid", "Ganpatipule", "Goa", "Kolhapur", "Satara", "Pandharpur", "Tuljapur",
      "Surat", "Vapi", "Daman", "Silvassa", "Dhule", "Jalgaon", "Malegaon", "Indore", "Ujjain", "Shegaon",
      "Nagpur", "Hyderabad", "Ahmedabad", "Vadodara"
    ]
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "ashtavinayak-tour",
    vehicleOptions: ["Ertiga", "Innova Crysta", "Tempo Traveller 17"],
    permitsReady: true,
    seniorFriendly: true,
    title: "Complete Ashtavinayak Darshan Yatra",
    tagline: "Sacred Pilgrimage to All 8 Swayambhu Ganesha Temples of Maharashtra",
    duration: "3 Days / 2 Nights",
    startingPrice: 13999,
    image: morgaonImage,
    category: "Pilgrimage",
    highlights: [
      "All 8 Sacred Ganpati Mandirs Covered in proper chronological ritual order",
      "Mayureshwar (Morgaon), Siddhivinayak (Siddhatek), Ballaleshwar (Pali)",
      "Varadvinayak (Mahad), Chintamani (Theur), Girijatmaj (Lenyadri Hill Cave)",
      "Vighneshwar (Ozar) & Mahaganapati (Ranjangaon)",
      "AC Cab dedicated for full 3 days with experienced temple route driver"
    ],
    inclusions: [
      "Dedicated AC Vehicle (Dzire / Ertiga / Crysta / Tempo Traveller)",
      "Driver Batta, Night Allowance, Toll Taxes & State Permits",
      "Door-to-door pickup & drop anywhere in Nashik",
      "Customized halting for senior citizens & kids"
    ],
    exclusions: [
      "Hotel accommodation (can be arranged on request)",
      "Temple VIP darshan tickets or Pooja expenses",
      "Meals, snacks & personal expenses"
    ],
    itinerary: [
      {
        day: 1,
        title: "Nashik -> Ozar -> Lenyadri -> Ranjangaon -> Theur",
        details: "5:00 AM pickup from Nashik. Vighneshwar at Ozar and Girijatmaj in the Lenyadri rock caves (steps assistance available) are closest to Nashik, then Mahaganapati at Ranjangaon and evening darshan at Chintamani, Theur. Overnight near Pune."
      },
      {
        day: 2,
        title: "Theur -> Morgaon -> Siddhatek -> Pune",
        details: "Morning darshan at Mayureshwar, Morgaon (the traditional start and end of the yatra), then Siddhivinayak at Siddhatek on the Bhima river. Return to Pune for the night."
      },
      {
        day: 3,
        title: "Pune -> Pali -> Mahad -> Nashik",
        details: "Early drive over the ghat to Ballaleshwar at Pali and Varadvinayak at Mahad in the Konkan belt, then the long but scenic drive home to Nashik via Thane and Kasara Ghat."
      }
    ]
  },
  {
    id: "shirdi-trimbak-tour",
    vehicleOptions: ["Dzire", "Ertiga", "Innova Crysta"],
    permitsReady: true,
    seniorFriendly: true,
    title: "Shirdi Sai Baba & Trimbakeshwar Jyotirlinga",
    tagline: "Divine Spiritual Journey with Panchavati & Shani Shingnapur",
    duration: "3 Days / 2 Nights",
    startingPrice: 11499,
    image: shirdiImage,
    category: "Pilgrimage",
    highlights: [
      "Shirdi Sai Baba Samadhi Mandir, Dwarkamai & Chavadi",
      "Trimbakeshwar 1 of 12 Jyotirlingas & origin of River Godavari",
      "Shani Shingnapur miraculous lock-free village",
      "Panchavati, Sita Gufa & Kalaram Temple in Nashik",
      "Hassle-free parking and drop directly near temple gates"
    ],
    inclusions: [
      "Dedicated AC Cab for 3 Days / 2 Nights",
      "Fuel, Driver allowance, Tolls, Inter-district permits",
      "VIP Darshan guidance & optimal timing advice",
      "24x7 Driver on-call for morning Kakad aarti"
    ],
    exclusions: [
      "Hotel room booking (available as add-on)",
      "Abhishek or special Pooja offerings",
      "Food and beverages"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pickup & Transfer to Nashik & Trimbakeshwar",
        details: "Morning pickup anywhere in Nashik. Trimbakeshwar Jyotirlinga darshan and Kushavarta Kund first, then Panchavati, Kalaram Mandir and Muktidham in the afternoon. Overnight in Nashik or drive on to Shirdi."
      },
      {
        day: 2,
        title: "Nashik to Shirdi Sai Darshan",
        details: "Proceed to holy Shirdi. Check-in to hotel. Peaceful Samadhi Mandir darshan, Dwarkamai, Gurusthan, and evening divine Aarti. Night stay in Shirdi."
      },
      {
        day: 3,
        title: "Shirdi -> Shani Shingnapur -> Return Home",
        details: "Morning Kakad Aarti if booked. Drive to Shani Shingnapur temple. Afternoon drive back to Nashik with comfortable doorstep drop."
      }
    ]
  },
  {
    id: "5-jyotirlinga-maharashtra",
    vehicleOptions: ["Ertiga", "Innova Crysta", "Tempo Traveller 17 / 26"],
    permitsReady: true,
    seniorFriendly: true,
    title: "5 Jyotirlinga Maharashtra Maha-Yatra",
    tagline: "The Ultimate Sacred Circuit of all 5 Jyotirlingas in Maharashtra",
    duration: "5 Days / 4 Nights",
    startingPrice: 22999,
    image: trimbakeshwarImage,
    category: "Jyotirlinga",
    highlights: [
      "Bhimashankar (Pune)",
      "Trimbakeshwar (Nashik)",
      "Grishneshwar (near Ellora, Chhatrapati Sambhajinagar)",
      "Aundha Nagnath (Hingoli)",
      "Parli Vaijnath (Beed)",
      "Bonus: Ellora Caves & Daulatabad Fort view"
    ],
    inclusions: [
      "Comfortable long-haul AC Vehicle (Ertiga / Innova / Tempo)",
      "Over 1,400+ KM all-inclusive package",
      "All interstate/district permits, tolls, driver night fees",
      "Experienced chauffeur well-versed with temple rules & timings"
    ],
    exclusions: [
      "Hotel accommodations (partner hotels can be booked)",
      "Pandit ji Pooja fees / Prasad",
      "Personal shopping & food"
    ],
    itinerary: [
      {
        day: 1,
        title: "Nashik -> Trimbakeshwar -> Grishneshwar (Ellora)",
        details: "Early pickup in Nashik and darshan at Trimbakeshwar Jyotirlinga, 30 km away. Drive on the Samruddhi Mahamarg to Chhatrapati Sambhajinagar for evening darshan at Grishneshwar. Overnight stay."
      },
      {
        day: 2,
        title: "Ellora -> Aundha Nagnath",
        details: "Optional Ellora Caves visit, then drive via Jalna and Hingoli to Aundha Nagnath Jyotirlinga, one of the oldest Hemadpanthi stone temples. Overnight at Nanded or Parli."
      },
      {
        day: 3,
        title: "Parli Vaijnath -> Ahmednagar",
        details: "Morning darshan at Parli Vaijnath Jyotirlinga on the slopes of Meru mountain. Afternoon drive west towards Ahmednagar. Overnight halt."
      },
      {
        day: 4,
        title: "Ahmednagar -> Shani Shingnapur -> Bhimashankar",
        details: "Shani Shingnapur darshan on the way, then into the Sahyadri wildlife sanctuary for evening darshan at Bhimashankar Jyotirlinga. Overnight at Bhimashankar or Manchar."
      },
      {
        day: 5,
        title: "Bhimashankar -> Nashik Drop",
        details: "Relaxed breakfast, optional second darshan, then the scenic drive back to Nashik via Sangamner with doorstep drop."
      }
    ]
  },
  {
    id: "mahabaleshwar-panchgani",
    vehicleOptions: ["Dzire", "Ertiga", "Kia Carens", "Innova Crysta"],
    permitsReady: true,
    title: "Mahabaleshwar, Panchgani & Pratapgad Fort",
    tagline: "Cool Queen of Hill Stations, Strawberry Farms & Historic Forts",
    duration: "3 Days / 2 Nights",
    startingPrice: 8999,
    image: mahableshwarImage,
    category: "Hill Station",
    highlights: [
      "Venna Lake boating, Wilson Point, Arthur's Seat, Kate's Point",
      "Famous Mapro Garden strawberry tastings & shopping",
      "Panchgani Table Land & Sydney Point",
      "Majestic Pratapgad Fort with Chhatrapati Shivaji Maharaj history",
      "Old Mahabaleshwar Panchganga & Mahabaleshwar Mandir"
    ],
    inclusions: [
      "Complete AC cab at disposal from Nashik and back",
      "All hill station local sightseeing & viewpoint transfers",
      "Driver allowance, parking charges & tolls included"
    ],
    exclusions: [
      "Hotel stays",
      "Boating, horse riding & entry ticket fees",
      "Food and personal expenses"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pickup & Drive to Panchgani & Mahabaleshwar",
        details: "Early start from Nashik via the Pune bypass and Pasarni Ghat. Stop at Sydney Point and Table Land in Panchgani. Check-in at Mahabaleshwar. Evening leisure at Venna Lake."
      },
      {
        day: 2,
        title: "Mahabaleshwar Sightseeing & Mapro Garden",
        details: "Full day tour: Arthur's Point, Elphinstone Point, Old Mahabaleshwar Temples, followed by lunch and fresh strawberry cream at Mapro Garden."
      },
      {
        day: 3,
        title: "Pratapgad Fort -> Return Drop",
        details: "Morning trip to the iconic Pratapgad Fort with sweeping views of the Konkan valley. Afternoon drive back to Nashik."
      }
    ]
  },
  {
    id: "konkan-alibaug-tour",
    vehicleOptions: ["Dzire", "Ertiga", "Innova Crysta"],
    permitsReady: true,
    title: "Alibaug & Murud Janjira Coastal Gateway",
    tagline: "Golden Beaches, Water Sports, Sea Forts & Fresh Seafood",
    duration: "3 Days / 2 Nights",
    startingPrice: 9499,
    image: alibaugImage,
    category: "Coastal",
    highlights: [
      "Varsoli, Nagaon & Kashid White Sand Beach",
      "Murud Janjira Unconquered Sea Fort via sailboat",
      "Kolaba Fort sea-walk during low tide",
      "Fresh authentic Konkani cuisine stops",
      "Scenic coastal roads with sea breeze"
    ],
    inclusions: [
      "AC Vehicle dedicated for all beach transfers",
      "Driver, tolls, parking, fuel expenses",
      "Door-to-door pickup & drop"
    ],
    exclusions: [
      "Water sports rides & boat tickets to Janjira fort",
      "Hotel accommodation",
      "Meals"
    ],
    itinerary: [
      {
        day: 1,
        title: "Nashik -> Alibaug Beaches & Kolaba Fort",
        details: "Early drive from Nashik via Thane and Pen to Alibaug. Visit Varsoli beach and take the sea walk to Kolaba Fort. Evening sunset at Nagaon beach with thrilling jet ski and banana rides."
      },
      {
        day: 2,
        title: "Kashid Beach & Murud Janjira Sea Fort",
        details: "Drive down the coastal highway to Kashid beach with crystal waves. Proceed to Murud and take the traditional sailboat to explore the sea fort."
      },
      {
        day: 3,
        title: "Kihim Beach -> Return Drop",
        details: "Relaxing morning at Kihim beach or local coconut farm. Shop for authentic Alibaug white onions and chikki before driving back to Nashik."
      }
    ]
  },
  {
    id: "goa-road-trip",
    vehicleOptions: ["Ertiga", "Innova Crysta", "Tempo Traveller 17"],
    permitsReady: true,
    title: "Goa Coastal Road Trip & Beach Vacation",
    tagline: "The Quintessential Sun, Sand & Sea Holiday with Zero Driving Stress",
    duration: "5 Days / 4 Nights",
    startingPrice: 23999,
    image: goaImage,
    category: "Coastal",
    highlights: [
      "Baga, Calangute, Anjuna, Vagator & Morjim Beaches",
      "Historic Fort Aguada & Chapora Fort (Dil Chahta Hai point)",
      "Old Goa Bom Jesus Basilica & Se Cathedral",
      "Dudhsagar Waterfall excursion optional add-on",
      "No hassle of renting bikes or self-driving on long ghats"
    ],
    inclusions: [
      "Round trip travel in Innova Crysta / Ertiga / Tempo Traveller",
      "Interstate road tax permits (Maharashtra & Goa)",
      "Local sightseeing in North & South Goa",
      "All toll taxes, parking, and driver allowance"
    ],
    exclusions: [
      "Resort / Hotel booking",
      "Casino entry, cruise tickets, water sports",
      "Food and personal expenses"
    ],
    itinerary: [
      {
        day: 1,
        title: "Nashik -> Pune -> Kolhapur",
        details: "Depart Nashik early, lunch near Pune, evening darshan at Mahalaxmi temple, Kolhapur. Overnight halt so Day 2 starts fresh."
      },
      {
        day: 2,
        title: "Kolhapur -> Amboli Ghat -> North Goa Check-in",
        details: "Scenic drive through the Western Ghats with waterfall views at Amboli. Arrive in North Goa by afternoon. Evening relax at Baga / Calangute beach."
      },
      {
        day: 3,
        title: "North Goa Forts & Sunset Vibe",
        details: "Visit Fort Aguada lighthouse, Sinquerim beach, Chapora Fort, and sunset at Vagator beach with chill cafe stops."
      },
      {
        day: 4,
        title: "Old Goa Heritage & South Goa Cruise",
        details: "Explore the UNESCO churches of Old Goa, Mangueshi Temple, Dona Paula viewpoint, and evening Mandovi River cruise."
      },
      {
        day: 5,
        title: "Morning Beach Walk -> Return to Nashik",
        details: "After breakfast, pack local Goan cashews and souvenirs. Long return drive via Kolhapur and Pune with a meal halt, doorstep drop in Nashik by night."
      }
    ]
  },
  {
    id: "3-jyotirlinga-darshan",
    vehicleOptions: ["Dzire", "Ertiga", "Innova Crysta", "Tempo Traveller 17"],
    permitsReady: true,
    seniorFriendly: true,
    title: "3 Jyotirlinga Darshan: Trimbakeshwar, Bhimashankar & Grishneshwar",
    tagline: "Three Sacred Shiva Shrines of North Maharashtra in One Relaxed Circuit",
    duration: "3 Days / 2 Nights",
    startingPrice: 13499,
    image: trimbakeshwarImage,
    category: "Jyotirlinga",
    highlights: [
      "Trimbakeshwar Jyotirlinga with Kushavarta Kund and Brahmagiri view",
      "Bhimashankar Jyotirlinga inside the Sahyadri wildlife sanctuary",
      "Grishneshwar Jyotirlinga beside the Ellora Caves",
      "Optional Ellora Kailasa Temple visit on Day 3",
      "Driver who knows abhishek timings and queue-free hours"
    ],
    inclusions: [
      "Dedicated AC vehicle for all 3 days",
      "Fuel, tolls, parking and driver allowance",
      "Doorstep pickup anywhere in Nashik",
      "Flexible halts for meals and rest"
    ],
    exclusions: [
      "Hotel stays (budget to premium options on request)",
      "Abhishek / Rudrabhishek pooja charges",
      "Ellora Caves entry tickets and meals"
    ],
    itinerary: [
      { day: 1, title: "Nashik -> Trimbakeshwar -> Chhatrapati Sambhajinagar", details: "Morning darshan at Trimbakeshwar and Kushavarta Kund, 30 km from Nashik. Afternoon drive on the Samruddhi Mahamarg to Chhatrapati Sambhajinagar. Overnight stay." },
      { day: 2, title: "Grishneshwar -> Ellora -> Ahmednagar / Manchar", details: "Darshan at Grishneshwar, optional Ellora Caves visit, then drive south-west towards Bhimashankar with an overnight halt." },
      { day: 3, title: "Bhimashankar -> Nashik", details: "Early darshan at Bhimashankar in the Sahyadri forest, lunch at Manchar, and the drive back to Nashik via Sangamner." }
    ]
  },
  {
    id: "shaktipeeth-maharashtra",
    vehicleOptions: ["Ertiga", "Innova Crysta", "Tempo Traveller 17 / 26"],
    permitsReady: true,
    seniorFriendly: true,
    title: "Saade Teen (3.5) Shaktipeeth Yatra of Maharashtra",
    tagline: "Tuljapur, Kolhapur, Mahur & Vani: the Four Seats of the Goddess",
    duration: "4 Days / 3 Nights",
    startingPrice: 18999,
    image: tuljaImage,
    category: "Pilgrimage",
    highlights: [
      "Tulja Bhavani at Tuljapur (Osmanabad)",
      "Mahalaxmi Ambabai at Kolhapur",
      "Renuka Mata at Mahur (Nanded)",
      "Saptashrungi Devi at Vani near Nashik (the half peeth)",
      "Over 1,500 km covered with a rested, experienced driver"
    ],
    inclusions: [
      "Long-haul AC vehicle for 4 days",
      "All tolls, district permits and driver night allowance",
      "Route planned for the least backtracking",
      "Help with temple timings and Navratri rush days"
    ],
    exclusions: [
      "Accommodation",
      "Special darshan passes and pooja material",
      "Meals and personal expenses"
    ],
    itinerary: [
      { day: 1, title: "Nashik -> Vani (Saptashrungi) -> Ahmednagar", details: "Start from Nashik at dawn. Darshan at Saptashrungi Gad (ropeway available), 65 km away, then drive towards Ahmednagar for the night halt." },
      { day: 2, title: "Ahmednagar -> Mahur", details: "Long drive east through Jalna and Hingoli to Mahur. Evening darshan at Renuka Mata. Overnight at Mahur or Nanded." },
      { day: 3, title: "Mahur -> Tuljapur", details: "Drive via Nanded and Latur to Tuljapur. Darshan at Tulja Bhavani temple. Overnight stay." },
      { day: 4, title: "Tuljapur -> Kolhapur -> Nashik", details: "Morning drive to Kolhapur for Mahalaxmi darshan, then the long return to Nashik via Pune with a meal halt (late-night arrival; an extra night at Pune can be added)." }
    ]
  },
  {
    id: "shirdi-shani-sameday",
    vehicleOptions: ["Dzire", "Etios", "Ertiga", "Innova Crysta"],
    permitsReady: true,
    seniorFriendly: true,
    title: "Shirdi Sai Baba & Shani Shingnapur Darshan",
    tagline: "Same-Day or Overnight Darshan with Doorstep Pickup",
    duration: "1 Day / Optional 2 Days",
    startingPrice: 3499,
    image: shirdiImage,
    category: "Pilgrimage",
    highlights: [
      "Shirdi Samadhi Mandir, Dwarkamai and Chavadi",
      "Shani Shingnapur, 70 km from Shirdi, on the same day",
      "Pickup before dawn from Nashik so you reach for the morning aarti",
      "Overnight option to attend Kakad Aarti the next morning",
      "Parking right next to the darshan gate for elders"
    ],
    inclusions: [
      "AC cab at your disposal for the day",
      "Fuel, tolls and parking",
      "Waiting time during darshan",
      "Pickup and drop anywhere in Nashik"
    ],
    exclusions: [
      "Darshan passes and prasad",
      "Hotel for the overnight option",
      "Meals"
    ],
    itinerary: [
      { day: 1, title: "Pickup -> Shirdi -> Shani Shingnapur -> Drop", details: "Early pickup, Shirdi darshan by mid-morning, lunch, Shani Shingnapur in the afternoon and return by evening." },
      { day: 2, title: "Optional: Kakad Aarti & Return", details: "For overnight guests: 4:30 AM Kakad Aarti, breakfast and a relaxed drive home." }
    ]
  },
  {
    id: "ujjain-omkareshwar",
    vehicleOptions: ["Ertiga", "Innova Crysta", "Tempo Traveller 17"],
    permitsReady: true,
    seniorFriendly: true,
    title: "Ujjain Mahakaleshwar & Omkareshwar Yatra",
    tagline: "Two Jyotirlingas of Madhya Pradesh by Road from Maharashtra",
    duration: "3 Days / 2 Nights",
    startingPrice: 17999,
    image: innovaImage,
    category: "Inter-State",
    highlights: [
      "Mahakaleshwar Jyotirlinga and the famous Bhasma Aarti (pre-booking help)",
      "Omkareshwar Jyotirlinga on the Narmada island",
      "Kal Bhairav, Harsiddhi and Ram Ghat in Ujjain",
      "Maheshwar ghats and Ahilya Fort on request",
      "Madhya Pradesh tourist permit handled by us"
    ],
    inclusions: [
      "Inter-state AC vehicle for 3 days",
      "Maharashtra & MP road permits, tolls and driver allowance",
      "Pickup from your doorstep in Nashik",
      "Driver familiar with Ujjain parking and aarti timings"
    ],
    exclusions: [
      "Hotel stays",
      "Bhasma Aarti and VIP darshan tickets",
      "Meals and boat rides at Omkareshwar"
    ],
    itinerary: [
      { day: 1, title: "Nashik -> Dhule -> Omkareshwar", details: "Leave Nashik early via Dhule and Sendhwa. Evening darshan at Omkareshwar and Narmada aarti. Overnight stay." },
      { day: 2, title: "Omkareshwar -> Ujjain", details: "Morning parikrama, then drive to Ujjain via Indore. Evening Mahakaleshwar darshan and Ram Ghat. Overnight at Ujjain." },
      { day: 3, title: "Bhasma Aarti -> Return to Nashik", details: "Attend the early Bhasma Aarti (if booked), visit Kal Bhairav, and drive back to Nashik via Indore and Dhule." }
    ]
  },
  {
    id: "hampi-badami-heritage",
    vehicleOptions: ["Innova Crysta", "Kia Carens", "Tempo Traveller 17"],
    permitsReady: true,
    title: "Hampi, Badami & Pattadakal Heritage Trail",
    tagline: "UNESCO Ruins, Cave Temples and the Tungabhadra Boulders of Karnataka",
    duration: "5 Days / 4 Nights",
    startingPrice: 25999,
    image: innovaImage,
    category: "Heritage",
    highlights: [
      "Virupaksha Temple, Vittala Temple and the Stone Chariot at Hampi",
      "Badami rock-cut cave temples and Agastya Lake",
      "Pattadakal and Aihole temple complexes",
      "Sunset at Hemakuta Hill and coracle ride on the Tungabhadra",
      "Karnataka tourist permit and tolls included"
    ],
    inclusions: [
      "AC vehicle for 4 days with inter-state permit",
      "Driver allowance, tolls, parking",
      "Pickup from your doorstep in Nashik",
      "Local sightseeing within Hampi and Badami"
    ],
    exclusions: [
      "Hotels and resorts",
      "Monument entry tickets and guides",
      "Meals and coracle rides"
    ],
    itinerary: [
      { day: 1, title: "Nashik -> Pune -> Kolhapur", details: "Depart Nashik early, lunch near Pune, evening at Kolhapur with Mahalaxmi darshan. Overnight halt." },
      { day: 2, title: "Kolhapur -> Belagavi -> Hospet / Hampi", details: "Scenic drive via Belagavi into Karnataka. Check-in near Hampi by late afternoon, evening walk at Hampi Bazaar." },
      { day: 3, title: "Hampi Full Day", details: "Virupaksha, Vittala Temple and the Stone Chariot, Royal Enclosure and Lotus Mahal. Sunset at Hemakuta Hill." },
      { day: 4, title: "Hampi -> Badami -> Pattadakal -> Aihole", details: "Drive to Badami for the cave temples, then Pattadakal and Aihole. Overnight at Badami." },
      { day: 5, title: "Badami -> Nashik", details: "Long return drive via Kolhapur and Pune with meal halts; doorstep drop in Nashik by night." }
    ]
  },
  {
    id: "rajasthan-royal-heritage",
    vehicleOptions: ["Innova Crysta", "Tempo Traveller 17 / 26"],
    permitsReady: true,
    title: "Royal Rajasthan Road Tour: Udaipur, Jodhpur & Jaipur",
    tagline: "Lakes, Forts and Desert Evenings on an All-Inclusive Road Journey",
    duration: "7 Days / 6 Nights",
    startingPrice: 44999,
    image: tempoImage,
    category: "Inter-State",
    highlights: [
      "Udaipur City Palace, Lake Pichola boat ride and Sajjangarh",
      "Jodhpur Mehrangarh Fort and the Blue City walk",
      "Jaisalmer dunes camp with camel safari (optional extension)",
      "Jaipur Amber Fort, Hawa Mahal and Chokhi Dhani evening",
      "Pushkar and Ajmer Sharif on the way back"
    ],
    inclusions: [
      "AC vehicle with two drivers for 7 days",
      "Rajasthan, Gujarat and Maharashtra road permits and tolls",
      "Driver stay and allowance throughout",
      "Pickup from your doorstep in Nashik"
    ],
    exclusions: [
      "Hotels, heritage stays and desert camps",
      "Monument entries, guides and camel safaris",
      "Meals and personal expenses"
    ],
    itinerary: [
      { day: 1, title: "Nashik -> Surat -> Vadodara -> Udaipur", details: "Depart Nashik before dawn via Surat and Vadodara. Evening arrival at Udaipur." },
      { day: 2, title: "Udaipur Sightseeing", details: "City Palace, Jagdish Temple, Saheliyon ki Bari and a sunset boat ride on Lake Pichola." },
      { day: 3, title: "Udaipur -> Ranakpur -> Jodhpur", details: "Stop at the Ranakpur Jain temples en route to Jodhpur. Evening at the clock tower market." },
      { day: 4, title: "Jodhpur -> Jaipur", details: "Mehrangarh Fort in the morning, then drive to Jaipur via Ajmer and Pushkar." },
      { day: 5, title: "Jaipur Sightseeing", details: "Amber Fort, Jal Mahal, Hawa Mahal, City Palace and Chokhi Dhani dinner." },
      { day: 6, title: "Jaipur -> Udaipur / Ahmedabad", details: "Drive south with a halt at Chittorgarh Fort. Overnight on the way." },
      { day: 7, title: "Return to Nashik", details: "Final leg home via Surat with doorstep drop in Nashik." }
    ]
  },
  {
    id: "tirupati-balaji",
    vehicleOptions: ["Innova Crysta", "Kia Carens", "Tempo Traveller 17"],
    permitsReady: true,
    seniorFriendly: true,
    title: "Tirupati Balaji Darshan by Road",
    tagline: "Tirumala Darshan with Sri Kalahasti and Kanipakam",
    duration: "4 Days / 3 Nights",
    startingPrice: 26999,
    image: innovaImage,
    category: "Inter-State",
    highlights: [
      "Tirumala Venkateswara Swamy darshan (Divya Darshan / special entry guidance)",
      "Sri Kalahasti Rahu-Ketu temple",
      "Kanipakam Vinayaka and Padmavathi Ammavari temples",
      "Comfortable stops at Solapur / Hyderabad for the long drive",
      "Andhra Pradesh and Telangana permits included"
    ],
    inclusions: [
      "AC vehicle for 4 days, two drivers on request",
      "Inter-state permits, tolls, driver allowance",
      "Pickup from your doorstep in Nashik",
      "Tirumala ghat road driven only by experienced drivers"
    ],
    exclusions: [
      "Accommodation at Tirupati / Tirumala",
      "Darshan tickets, laddu prasadam and seva fees",
      "Meals"
    ],
    itinerary: [
      { day: 1, title: "Nashik -> Ahmednagar -> Solapur -> Hyderabad / Kurnool", details: "Long first leg from Nashik with lunch and rest stops. Overnight halt." },
      { day: 2, title: "Arrive Tirupati", details: "Reach Tirupati by evening, visit Padmavathi temple at Tiruchanur." },
      { day: 3, title: "Tirumala Darshan -> Sri Kalahasti", details: "Early Tirumala darshan, then Sri Kalahasti and Kanipakam in the afternoon." },
      { day: 4, title: "Return to Nashik", details: "Drive back to Nashik with a planned overnight halt if needed." }
    ]
  },
  {
    id: "gujarat-sacred-heritage",
    vehicleOptions: ["Ertiga", "Innova Crysta", "Tempo Traveller 17 / 26"],
    permitsReady: true,
    seniorFriendly: true,
    title: "Gujarat Sacred & Heritage Circuit: Somnath, Dwarka & Statue of Unity",
    tagline: "Two Jyotirlingas, Krishna's Dwarka and the World's Tallest Statue",
    duration: "6 Days / 5 Nights",
    startingPrice: 36999,
    image: tempoImage,
    category: "Inter-State",
    highlights: [
      "Somnath Jyotirlinga and the evening light-and-sound show",
      "Nageshwar Jyotirlinga, Dwarkadhish temple and Bet Dwarka",
      "Statue of Unity at Kevadia with the viewing gallery",
      "Gir National Park safari (optional)",
      "Akshardham Gandhinagar and Sabarmati Ashram"
    ],
    inclusions: [
      "AC vehicle for 6 days with Gujarat tourist permit",
      "Tolls, parking and driver allowance",
      "Pickup from your doorstep in Nashik",
      "Flexible pace for senior pilgrims"
    ],
    exclusions: [
      "Hotels",
      "Statue of Unity, Gir safari and boat tickets",
      "Meals and shopping"
    ],
    itinerary: [
      { day: 1, title: "Nashik -> Surat -> Kevadia", details: "Drive from Nashik to Kevadia via Surat (about 350 km). Evening Statue of Unity laser show." },
      { day: 2, title: "Kevadia -> Ahmedabad", details: "Morning viewing gallery, then Ahmedabad: Sabarmati Ashram and Akshardham." },
      { day: 3, title: "Ahmedabad -> Dwarka", details: "Long drive through Rajkot to Dwarka. Evening Dwarkadhish aarti." },
      { day: 4, title: "Dwarka -> Bet Dwarka -> Nageshwar -> Somnath", details: "Boat to Bet Dwarka, Nageshwar Jyotirlinga, then drive along the coast to Somnath." },
      { day: 5, title: "Somnath -> Gir -> Rajkot", details: "Morning Somnath darshan, optional Gir safari, overnight at Rajkot or Bhavnagar." },
      { day: 6, title: "Return to Nashik", details: "Drive back via Vadodara and Surat to your doorstep in Nashik." }
    ]
  }
];

/** Destination cards shown on the home page ("Where can we take you from Nashik?"). */
export const DESTINATIONS: Destination[] = [
  {
    id: "mumbai",
    name: "Mumbai",
    region: "Airport • Dadar • Thane • Navi Mumbai",
    tagline: "The city that needs a punctual cab",
    description: "Airport transfers, hospital visits, wedding guests and office commutes. Our drivers know Kasara Ghat timing, the Eastern Freeway and every terminal gate.",
    bestFor: ["Airport runs", "Corporate travel", "Medical visits"],
    distanceFromNashik: 165,
    bestSeason: "All year",
    accent: "blue",
    icon: "Building2"
  },
  {
    id: "shirdi",
    name: "Shirdi",
    region: "Sai Baba Samadhi Mandir",
    tagline: "Darshan without the parking stress",
    description: "Two hours from Nashik. We drop you at the closest permitted gate, wait through darshan and aarti, and add Shani Shingnapur on the same day if you wish.",
    bestFor: ["Same-day darshan", "Elderly pilgrims", "Thursday special visits"],
    distanceFromNashik: 90,
    bestSeason: "All year; avoid Ram Navami crowds",
    accent: "amber",
    icon: "Church"
  },
  {
    id: "trimbakeshwar",
    name: "Trimbakeshwar",
    region: "Jyotirlinga • Brahmagiri • Anjaneri",
    tagline: "Source of the Godavari, half an hour away",
    description: "One of the twelve Jyotirlingas, the Kushavarta Kund and the trek-able Brahmagiri hill. Combine with Anjaneri, the birthplace of Hanuman, and Panchavati in the city.",
    bestFor: ["Narayan Nagbali pooja visits", "Monsoon greenery", "Nashik temple circuit"],
    distanceFromNashik: 30,
    bestSeason: "July to February",
    accent: "emerald",
    icon: "Mountain"
  },
  {
    id: "pune",
    name: "Pune",
    region: "Station • Hinjewadi • Airport",
    tagline: "Heritage wadas and IT parks",
    description: "Shaniwar Wada, Dagdusheth Ganpati and Sinhagad on a day out, or regular drops to Hinjewadi, Magarpatta, Kharadi and the airport.",
    bestFor: ["Corporate drops", "College admissions", "Weekend family visits"],
    distanceFromNashik: 215,
    bestSeason: "All year",
    accent: "indigo",
    icon: "Landmark"
  },
  {
    id: "sambhajinagar",
    name: "Ellora & Ajanta",
    region: "Chhatrapati Sambhajinagar (Aurangabad)",
    tagline: "Rock-cut caves and a Jyotirlinga on one road",
    description: "The Kailasa temple at Ellora, Grishneshwar Jyotirlinga next door, Daulatabad Fort and Bibi ka Maqbara. Ajanta is a further 100 km for a second day.",
    bestFor: ["Heritage weekends", "School & college trips", "Grishneshwar darshan"],
    distanceFromNashik: 185,
    bestSeason: "October to March",
    accent: "orange",
    icon: "Castle"
  },
  {
    id: "mahabaleshwar",
    name: "Mahabaleshwar & Panchgani",
    region: "Satara hill stations",
    tagline: "Strawberries, viewpoints and cool air",
    description: "Arthur's Seat, Venna Lake, Mapro Garden and Table Land, with Pratapgad Fort a short drive away. A two-day trip from Nashik via the Pune bypass.",
    bestFor: ["Couples", "Family weekends", "Strawberry season"],
    distanceFromNashik: 330,
    bestSeason: "October to June",
    accent: "rose",
    icon: "Sun"
  },
  {
    id: "saputara",
    name: "Saputara",
    region: "Dang, Gujarat",
    tagline: "The hill station closest to Nashik",
    description: "Lake boating, Sunset Point, the ropeway and tribal craft markets, all within two hours. Gujarat permit arranged by us.",
    bestFor: ["Day trips", "Monsoon drives", "Kids & grandparents"],
    distanceFromNashik: 80,
    bestSeason: "June to February",
    accent: "emerald",
    icon: "Flower2"
  },
  {
    id: "konkan",
    name: "Konkan Coast",
    region: "Alibaug • Kashid • Ganpatipule",
    tagline: "Quiet beaches, sea forts and Malvani thalis",
    description: "Clean beaches and coconut villages along NH-66, sea forts at Murud, and Ganpatipule's seaside temple. Best done as a two or three day trip.",
    bestFor: ["Family beach weekends", "Monsoon drives", "Seafood trails"],
    distanceFromNashik: 260,
    bestSeason: "October to May",
    accent: "teal",
    icon: "Waves"
  },
  {
    id: "goa",
    name: "Goa",
    region: "North & South Goa",
    tagline: "Beaches, Portuguese churches and river cruises",
    description: "A long but comfortable road trip via Pune and Kolhapur. Our cab stays with you for the whole holiday so nobody has to rent a scooter.",
    bestFor: ["Friends' road trips", "Honeymoons", "Group holidays"],
    distanceFromNashik: 650,
    bestSeason: "November to February",
    accent: "orange",
    icon: "Palmtree"
  },
  {
    id: "nashik-local",
    name: "Nashik City & Vineyards",
    region: "Local hourly packages",
    tagline: "Panchavati, Sula and Pandav Leni in a day",
    description: "Kalaram Mandir, Ramkund and Muktidham in the morning; Sula, York or Soma vineyards in the afternoon. 4, 8 or 12 hour local packages with the cab at your disposal.",
    bestFor: ["Wine tours", "Guests visiting Nashik", "Kumbh & Ramkund visits"],
    distanceFromNashik: 0,
    bestSeason: "All year; vineyards best Dec to Feb",
    accent: "purple",
    icon: "Grape"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "outstation-cabs",
    title: "Outstation Cabs (Round Trip)",
    subtitle: "Maharashtra & Pan-India Road Travel",
    description: "Travel to any city, hill station, or religious shrine across India with our well-maintained cabs and courteous drivers.",
    icon: "Navigation",
    startingPriceTag: "₹13 / KM",
    benefits: [
      "Transparent per-KM billing with GPS accuracy",
      "Zero hidden driver night charges or surprises",
      "Trained drivers with route & food stop expertise",
      "Clean AC vehicle dedicated to your family"
    ]
  },
  {
    id: "one-way-drop",
    title: "One-Way Drop Taxi",
    subtitle: "Save up to 40% on Return Fares",
    description: "Why pay return fare when you only need a drop? Book economical one-way cabs from Nashik to Mumbai, Pune, Shirdi, Chhatrapati Sambhajinagar, Surat and Goa.",
    icon: "ArrowRightCircle",
    startingPriceTag: "Starting ₹2,499",
    benefits: [
      "Pay only for the distance traveled one way",
      "Doorstep pickup and destination doorstep drop",
      "All tolls & taxes included options",
      "Available 24x7 with instant confirmation"
    ]
  },
  {
    id: "airport-transfers",
    title: "24x7 Airport Transfers",
    subtitle: "Nashik to Mumbai (T1/T2), Pune, Shirdi & Ozar Airports",
    description: "Never miss a flight. Guaranteed punctual drops from Nashik and return pickups with flight delay tracking and name-board assistance.",
    icon: "Plane",
    startingPriceTag: "Starting ₹2,699",
    benefits: [
      "Real-time flight landing tracking",
      "Zero wait-time at terminal pickup zone",
      "Spacious boot for heavy international bags",
      "Midnight & early morning pickup guarantee"
    ]
  },
  {
    id: "local-hourly-rental",
    title: "Local Hourly City Packages",
    subtitle: "4h/40km, 8h/80km & 12h/120km",
    description: "Ideal for city shopping, doctor visits, business meetings, wedding venue shuttling, and full-day local temple darshan.",
    icon: "Clock",
    startingPriceTag: "Starting ₹1,799",
    benefits: [
      "Vehicle & driver dedicated for multiple stops",
      "Flexible extension per extra hour / extra km",
      "Chilled AC waiting while you shop or attend events",
      "Clean sanitised vehicle throughout the day"
    ]
  },
  {
    id: "pilgrimage-tours",
    title: "Religious & Pilgrimage Yatras",
    subtitle: "Ashtavinayak, Shirdi, Jyotirlinga, Pandharpur",
    description: "Spiritual journeys handled with utmost care. Drivers are respectful, know temple darshan schedules, senior citizen ease, and clean vegetarian food halts.",
    icon: "Compass",
    startingPriceTag: "Custom Packages",
    benefits: [
      "Early morning aarti timing support",
      "Wheelchair & senior citizen halting assistance",
      "Authentic pure-veg restaurant halts",
      "Expert knowledge of temple trust rules"
    ]
  },
  {
    id: "group-tempo-travellers",
    title: "Tempo Travellers & Group Coaches",
    subtitle: "13, 17, 20 & 26 Seater Luxury Travellers",
    description: "Keep the whole family, wedding entourage, or company team together in our ultra-comfortable Maharaja push-back Tempo Travellers.",
    icon: "Users",
    startingPriceTag: "Starting ₹8,500 / Day",
    benefits: [
      "Deep reclining push-back seats with armrests",
      "High power AC with individual passenger vents",
      "Surround music system & LED TV screen",
      "Massive luggage carrier for all bags"
    ]
  },
  {
    id: "wedding-luxury-cars",
    title: "Wedding & VIP Luxury Rentals",
    subtitle: "Mercedes, BMW, Audi, Fortuner & Crysta",
    description: "Make the special day unforgettable with prestige luxury cars decorated with fresh flowers for bride & groom entry.",
    icon: "Crown",
    startingPriceTag: "Starting ₹7,500",
    benefits: [
      "Spotless showroom-condition cars",
      "Chauffeur in executive black & white uniform",
      "Customized floral decoration service available",
      "Punctuality guaranteed with backup cab standby"
    ]
  },
  {
    id: "corporate-car-rental",
    title: "Corporate & Monthly Cab Contracts",
    subtitle: "Reliable Employee & Executive Mobility",
    description: "GST compliant corporate travel, airport VIP meet-and-greet, and monthly corporate vehicle contracts with dedicated account manager.",
    icon: "Briefcase",
    startingPriceTag: "Custom B2B Rates",
    benefits: [
      "Detailed GST invoices & monthly statement",
      "Verified chauffeurs with background checks",
      "24x7 Corporate priority helpline",
      "Fleet scalability from 1 to 50 vehicles"
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Sachin Kulkarni",
    location: "Gangapur Road, Nashik",
    route: "Nashik to Shirdi & Shani Shingnapur",
    rating: 5,
    date: "October 12, 2026",
    comment: "Booked an Ertiga for a one-day family darshan trip. Driver Nilesh was extremely polite, drove smoothly, and was waiting at the Shirdi gate the moment we came out. The cab was spotless with water bottles provided. Highly recommended!",
    carTaken: "Maruti Ertiga"
  },
  {
    id: "2",
    name: "Pooja Deshmukh",
    location: "Indira Nagar, Nashik",
    route: "Nashik to Mumbai Airport T2 (and return pickup)",
    rating: 5,
    date: "September 28, 2026",
    comment: "They dropped us for a 6 AM flight with time to spare, and on our return the driver tracked our delayed midnight landing and was waiting at pickup point 7. Safe driving through Kasara Ghat at night. Truly 24/7 reliable service.",
    carTaken: "Swift Dzire"
  },
  {
    id: "3",
    name: "Dr. Arvind Mehta",
    location: "College Road, Nashik",
    route: "3 Days Ashtavinayak Darshan from Nashik",
    rating: 5,
    date: "August 18, 2026",
    comment: "We travelled with my elderly parents to all 8 Ashtavinayak temples. The Innova Crysta was very comfortable, and the driver knew the exact parking spots nearest to each temple so my parents didn't have to walk much. God bless your team!",
    carTaken: "Innova Crysta"
  },
  {
    id: "4",
    name: "Rahul Patil",
    location: "Pathardi Phata, Nashik",
    route: "Nashik to Pune Round Trip",
    rating: 5,
    date: "September 15, 2026",
    comment: "Best pricing compared to others in Nashik. Transparent toll and per-km calculation, no unexpected extras at the end. AC was working perfectly throughout the journey and the driver knew the Hinjewadi roads well.",
    carTaken: "Maruti Swift Dzire"
  },
  {
    id: "5",
    name: "Amitabh Banerjee",
    location: "Deolali Camp, Nashik",
    route: "Nashik to Goa Road Trip (Family of 14)",
    rating: 5,
    date: "July 24, 2026",
    comment: "We hired a 17-seater Tempo Traveller for our Goa trip. The vehicle was like new, pushback seats were very relaxing for the 12 hour drive with a halt at Kolhapur, and the music system made the journey super fun. Best travel agency in Nashik!",
    carTaken: "17-Seater Tempo Traveller"
  },
  {
    id: "6",
    name: "Sneha Joshi",
    location: "Panchavati, Nashik",
    route: "Nashik to Saputara Day Trip",
    rating: 5,
    date: "August 2, 2026",
    comment: "Took my in-laws to Saputara for a monsoon day out. The Kia Carens was easy for them to get in and out of, the driver stopped wherever we wanted photos, and the Gujarat permit was already arranged. Very smooth experience.",
    carTaken: "Kia Carens"
  }
];

export const FAQS: FaqItem[] = [
  {
    category: "pricing",
    question: "What is included in the cab fare? Are there any hidden charges?",
    answer: "Our fares are 100% transparent. In our per-KM packages, you pay for the actual distance traveled subject to minimum KM limit (300 km/day for outstation) plus standard driver allowance. Toll charges, state entry taxes, and parking fees are either billed at actuals with receipts or included as part of an all-inclusive fixed package. There are never any surprise hidden fees."
  },
  {
    category: "booking",
    question: "How do I book a cab with Swaraj Tours and Travels?",
    answer: "Booking is effortless! You can enter your trip details on our website booking form, click 'Book via WhatsApp' to instantly chat with our dispatch team, or directly call our 24x7 Nashik helpline at +91 98607 07287. We confirm your cab with driver details and vehicle number via SMS and WhatsApp."
  },
  {
    category: "booking",
    question: "What is the cancellation policy? Can I change my pickup date/time?",
    answer: "We offer zero-hassle cancellations! If you cancel up to 2 hours before the scheduled pickup time, you receive a 100% full refund with zero cancellation penalty. Date and time rescheduling is completely free based on cab availability."
  },
  {
    category: "service",
    question: "Are your drivers police-verified and experienced on ghat routes?",
    answer: "Yes, absolutely. All our chauffeurs undergo rigorous background checks, hold valid commercial transport badges, and possess a minimum of 5+ years of highway and mountain ghat driving experience (such as Kasara Ghat, Khandala Ghat, Amboli, and Pasarni Ghat)."
  },
  {
    category: "service",
    question: "Do you provide airport pickup and drop at midnight or early morning?",
    answer: "Yes, our airport cab fleet operates 24 hours a day, 365 days a year. We cover Mumbai Airport (T1 & T2), Pune Lohegaon Airport, Shirdi Airport, and Nashik Ozar Airport. Our operations team tracks your flight status in real time to adjust pickup in case of flight delays."
  },
  {
    category: "pricing",
    question: "How does the One-Way cab service save money?",
    answer: "In traditional outstation rentals, travelers were forced to pay two-way round trip charges even if they only needed a drop. With Swaraj Tours and Travels One-Way cab service, you pay only for the single journey from your pickup city to your drop city, saving up to 40% to 50%!"
  },
  {
    category: "service",
    question: "Will the AC remain switched on while driving through ghat sections?",
    answer: "Yes, the air-conditioning runs continuously throughout the trip. In extreme steep uphill ghat climbs, drivers may briefly switch to normal blower mode for 5-10 minutes to maintain engine climbing power, after which full AC resumes immediately."
  }
];

export const OFFERS: Offer[] = [
  {
    id: "diwali-yatra",
    title: "Festive Season Yatra Special",
    subtitle: "Diwali & Tulsi Vivah Pilgrimage Discount",
    code: "YATRA15",
    discountLabel: "15% OFF",
    validTill: "30 November 2026",
    appliesTo: "All Pilgrimage Packages (Shirdi, Ashtavinayak, Jyotirlinga)",
    terms: [
      "Valid on 2+ day pilgrimage packages booked in advance",
      "Discount applied on base vehicle fare, excludes tolls & permits",
      "Cannot be clubbed with other offers"
    ],
    accent: "amber",
    isFeatured: true
  },
  {
    id: "first-ride",
    title: "First Ride Welcome Offer",
    subtitle: "New Customers Save Instantly",
    code: "WELCOME300",
    discountLabel: "₹300 OFF",
    validTill: "Ongoing",
    appliesTo: "Any Outstation or One-Way booking above ₹2,499",
    terms: [
      "One-time use per mobile number",
      "Applicable on first confirmed booking only",
      "Mention the code while booking via call or WhatsApp"
    ],
    accent: "emerald"
  },
  {
    id: "airport-midnight",
    title: "Zero Surge Airport Transfers",
    subtitle: "Midnight & Early Morning Flat Rates",
    code: "FLYFLAT",
    discountLabel: "No Night Charges",
    validTill: "Ongoing",
    appliesTo: "Mumbai, Pune, Nashik & Shirdi Airport Pickups / Drops",
    terms: [
      "Flat fare between 10 PM and 6 AM, same as daytime rate",
      "Includes 45 minutes complimentary waiting after landing",
      "Pre-booking at least 6 hours before pickup required"
    ],
    accent: "blue"
  },
  {
    id: "group-tempo",
    title: "Group Travel Saver",
    subtitle: "Tempo Traveller Multi-Day Bookings",
    code: "GROUP10",
    discountLabel: "10% OFF",
    validTill: "31 December 2026",
    appliesTo: "13 / 17 / 20 Seater Tempo Travellers for 3+ days",
    terms: [
      "Minimum 3 days continuous booking",
      "Free LED TV & music system usage",
      "Advance booking of 7 days required"
    ],
    accent: "purple"
  },
  {
    id: "wedding-convoy",
    title: "Wedding Season Convoy Deal",
    subtitle: "Luxury Cars + Guest Shuttles Combo",
    code: "SHUBH20",
    discountLabel: "Up to 20% OFF",
    validTill: "28 February 2027",
    appliesTo: "Booking 3+ vehicles together for weddings & events",
    terms: [
      "Complimentary floral decoration on the bridal car",
      "Dedicated event coordinator for the convoy",
      "Backup vehicle on standby included"
    ],
    accent: "rose"
  }
];

export const TRAVEL_GUIDES: TravelGuide[] = [
  {
    id: "shirdi-darshan-guide",
    title: "Shirdi Darshan from Nashik: Timings, Aarti Schedule & Best Route",
    excerpt: "Plan a hassle-free Sai Baba darshan with the right aarti timing, dress code tips, parking details, and the fastest highway route.",
    category: "Pilgrimage",
    readTime: "5 min read",
    image: shirdiImage,
    bestTime: "October to March; weekdays for shorter queues",
    suggestedCab: "Ertiga or Innova Crysta for families",
    tips: [
      "Kakad Aarti is at 4:30 AM; leave Nashik by 2 AM (it is only 2 hours) or stay overnight in Shirdi",
      "Free darshan queues are shortest between 1 PM and 3 PM",
      "Keep mobile phones and leather items in the cab; lockers are limited",
      "Combine with Shani Shingnapur (70 km) for a full-day circuit",
      "From Nashik take the Sinnar road (NH-160) via Sinnar and Sangamner bypass; avoid the Pune highway crowd on weekends"
    ]
  },
  {
    id: "ashtavinayak-order",
    title: "Ashtavinayak Yatra: The Correct Order of the 8 Ganpati Temples",
    excerpt: "Scriptures prescribe a specific sequence for the Ashtavinayak circuit. Here is the order, the distances, and a realistic 3-day plan.",
    category: "Pilgrimage",
    readTime: "6 min read",
    image: morgaonImage,
    bestTime: "August to February; avoid peak monsoon for Lenyadri steps",
    suggestedCab: "Innova Crysta or Tempo Traveller for groups",
    tips: [
      "Start and end at Morgaon (Mayureshwar) to complete the ritual circle",
      "Lenyadri has 283 steps; palanquin (doli) service is available for seniors",
      "Carry cash for small temple towns where UPI networks are weak",
      "Pali and Mahad are in the Konkan belt, expect humid weather",
      "Total circuit is roughly 650 km; a dedicated cab for 3 days is ideal"
    ]
  },
  {
    id: "mahabaleshwar-weekend",
    title: "Mahabaleshwar Weekend Itinerary: Strawberries, Viewpoints & Pratapgad",
    excerpt: "A relaxed 2-day plan covering the must-see points, where to eat, and how to avoid weekend traffic on Pasarni Ghat.",
    category: "Hill Station",
    readTime: "4 min read",
    image: mahableshwarImage,
    bestTime: "November to February for strawberries; June to September for waterfalls",
    suggestedCab: "Swift Dzire for couples, Ertiga for families",
    tips: [
      "Leave Nashik by 5 AM on Saturday; it is a 7 hour drive and Pasarni Ghat jams up after noon",
      "Mapro Garden is less crowded before 11 AM",
      "Arthur's Seat and Elphinstone Point are best at sunrise",
      "Pratapgad Fort needs 2 hours; wear comfortable walking shoes",
      "Buy strawberries from farms on the Panchgani road, not the market"
    ]
  },
  {
    id: "mumbai-goa-road-trip",
    title: "Nashik to Goa by Road: Best Route, Halts & What to Pack",
    excerpt: "Everything you need to know for the 650 km drive via Pune and Kolhapur, from where to halt overnight to Amboli Ghat photo stops.",
    category: "Road Trip",
    readTime: "7 min read",
    image: goaImage,
    bestTime: "November to February; Christmas week books out early",
    suggestedCab: "Innova Crysta for comfort; Tempo Traveller for 8+ people",
    tips: [
      "From Nashik, NH-48 via Pune, Satara and Kolhapur is the practical route; the coastal NH-66 adds 3 hours",
      "Start at 4 AM to reach Goa by evening, or split the drive with a night at Kolhapur",
      "Stop at Amboli Ghat waterfalls during monsoon months",
      "Carry motion-sickness tablets for the Konkan ghat sections",
      "Goa entry tax for tourist vehicles is included in our package fare"
    ]
  },
  {
    id: "outstation-cab-checklist",
    title: "Hiring an Outstation Cab? 10 Things to Check Before You Book",
    excerpt: "Avoid hidden charges and last-minute surprises with this simple checklist for first-time outstation travelers.",
    category: "Travel Tips",
    readTime: "3 min read",
    image: swiftDzireImage,
    bestTime: "Any season",
    suggestedCab: "Depends on group size; see our comparison table",
    tips: [
      "Confirm whether tolls, parking and state permits are included",
      "Ask for the minimum km per day and extra-km rate in writing",
      "Check driver night allowance and the hours it applies",
      "Request the vehicle number and driver details a day before",
      "Keep the dispatch helpline number saved for on-road support"
    ]
  },
  {
    id: "nashik-day-trips",
    title: "7 Day Trips from Nashik You Can Do in a Single Cab Booking",
    excerpt: "Shirdi, Trimbakeshwar, Saputara, Bhandardara, Igatpuri, Saptashrungi and the vineyards: how far, how long, and which cab to take.",
    category: "Road Trip",
    readTime: "5 min read",
    image: nashikImage,
    bestTime: "Monsoon for Bhandardara and Igatpuri; winter for vineyards",
    suggestedCab: "Dzire for couples, Ertiga or Carens for families",
    tips: [
      "Shirdi (90 km) and Shani Shingnapur (160 km) fit in one day if you leave by 7 AM",
      "Trimbakeshwar, Anjaneri and Pandav Leni can be covered in an 8 hour / 80 km local package",
      "Saputara (80 km) needs a Gujarat permit; we include it in the fare",
      "Bhandardara and Randha Falls (70 km) are best from July to September",
      "Igatpuri and Vipassana centre (45 km) make an easy half-day drive",
      "Sula, York and Soma vineyards are all within 20 km of the city; ask for the wine-route package"
    ]
  },
  {
    id: "monsoon-ghat-driving",
    title: "Monsoon Travel in the Sahyadris: Safety Tips for Ghat Roads",
    excerpt: "Kasara, Khandala, Malshej and Amboli are stunning in the rains. Here is how to travel them safely and comfortably.",
    category: "Travel Tips",
    readTime: "4 min read",
    image: mahableshwarImage,
    bestTime: "July to September for waterfalls",
    suggestedCab: "SUV class (Ertiga / Crysta) for better ground clearance",
    tips: [
      "Allow 30 to 45 extra minutes for fog and slow traffic on ghats",
      "Avoid late-night ghat travel during heavy rain alerts",
      "Carry a light raincoat, umbrella and a spare set of footwear",
      "Our drivers are trained for low-visibility ghat driving",
      "Malshej Ghat is best for waterfalls; Khandala for Tiger Point mist"
    ]
  }
];
