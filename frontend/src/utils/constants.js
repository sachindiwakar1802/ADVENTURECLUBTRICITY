// Application constants

export const APP_CONFIG = {
  name: 'Adventure India',
  tagline: 'Discover India\'s Hidden Wonders',
  version: '1.0.0',
  author: 'Adventure India Team',
  email: 'hello@adventureindia.com',
  phone: '+91 98765 43210',
  address: '123 Adventure Street, Delhi, India 110001'
};

export const ROUTES = {
  HOME: '/',
  ACTIVITIES: '/activities',
  GALLERY: '/gallery',
  ABOUT: '/about',
  CONTACT: '/contact',
  BOOKING: '/booking',
  ADVENTURE_DETAIL: '/adventure/:id',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register'
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  },
  
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  },
  
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  },
  
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export const COLORS = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d'
  },
  
  forest: {
    light: '#A7C957',
    medium: '#6BBF59',
    dark: '#228B22',
    darker: '#006400'
  },
  
  earth: {
    brown: '#8B4513',
    sand: '#F4E4BC',
    stone: '#696969'
  }
};

export const DIFFICULTY_LEVELS = {
  EASY: {
    name: 'Easy',
    color: 'text-green-500',
    bgColor: 'bg-green-500',
    description: 'Perfect for beginners and families'
  },
  MEDIUM: {
    name: 'Medium',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500',
    description: 'Requires moderate fitness level'
  },
  HARD: {
    name: 'Hard',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500',
    description: 'Challenging, good fitness required'
  },
  EXTREME: {
    name: 'Extreme',
    color: 'text-red-500',
    bgColor: 'bg-red-500',
    description: 'Only for experienced adventurers'
  }
};

export const SEASONS = {
  SPRING: {
    name: 'Spring',
    months: ['March', 'April', 'May'],
    icon: '🌸',
    description: 'Pleasant weather, blooming flowers'
  },
  SUMMER: {
    name: 'Summer',
    months: ['June', 'July', 'August'],
    icon: '☀️',
    description: 'Hot weather, monsoon preparations'
  },
  MONSOON: {
    name: 'Monsoon',
    months: ['June', 'July', 'August', 'September'],
    icon: '🌧️',
    description: 'Rainy season, lush landscapes'
  },
  AUTUMN: {
    name: 'Autumn',
    months: ['September', 'October', 'November'],
    icon: '🍂',
    description: 'Cool weather, clear skies'
  },
  WINTER: {
    name: 'Winter',
    months: ['December', 'January', 'February'],
    icon: '❄️',
    description: 'Cold weather, snow in mountains'
  }
};

export const STATES_OF_INDIA = {
  'AN': 'Andaman and Nicobar Islands',
  'AP': 'Andhra Pradesh',
  'AR': 'Arunachal Pradesh',
  'AS': 'Assam',
  'BR': 'Bihar',
  'CH': 'Chandigarh',
  'CT': 'Chhattisgarh',
  'DN': 'Dadra and Nagar Haveli',
  'DD': 'Daman and Diu',
  'DL': 'Delhi',
  'GA': 'Goa',
  'GJ': 'Gujarat',
  'HR': 'Haryana',
  'HP': 'Himachal Pradesh',
  'JK': 'Jammu and Kashmir',
  'JH': 'Jharkhand',
  'KA': 'Karnataka',
  'KL': 'Kerala',
  'LA': 'Ladakh',
  'LD': 'Lakshadweep',
  'MP': 'Madhya Pradesh',
  'MH': 'Maharashtra',
  'MN': 'Manipur',
  'ML': 'Meghalaya',
  'MZ': 'Mizoram',
  'NL': 'Nagaland',
  'OR': 'Odisha',
  'PY': 'Puducherry',
  'PB': 'Punjab',
  'RJ': 'Rajasthan',
  'SK': 'Sikkim',
  'TN': 'Tamil Nadu',
  'TG': 'Telangana',
  'TR': 'Tripura',
  'UP': 'Uttar Pradesh',
  'UT': 'Uttarakhand',
  'WB': 'West Bengal'
};

export const EQUIPMENT_LIST = {
  TREKKING: [
    'Hiking boots',
    'Backpack (40-60L)',
    'Sleeping bag',
    'Trekking poles',
    'Headlamp',
    'Water bottles',
    'First aid kit',
    'Weather-appropriate clothing'
  ],
  
  WILDLIFE: [
    'Binoculars',
    'Camera with telephoto lens',
    'Comfortable walking shoes',
    'Hat and sunglasses',
    'Insect repellent',
    'Field notebook',
    'Khaki/earth-tone clothing'
  ],
  
  WATER_SPORTS: [
    'Swimwear',
    'Water shoes',
    'Waterproof bag',
    'Sunscreen (waterproof)',
    'Beach towel',
    'Snorkeling gear',
    'Change of dry clothes'
  ],
  
  DESERT: [
    'Sun hat',
    'Sunglasses',
    'Lightweight long-sleeve shirts',
    'Comfortable walking shoes',
    'Water bottles',
    'Sunscreen (high SPF)',
    'Light jacket for evenings'
  ]
};

export const BOOKING_STATUS = {
  PENDING: {
    name: 'Pending',
    color: 'yellow',
    description: 'Booking awaiting confirmation'
  },
  CONFIRMED: {
    name: 'Confirmed',
    color: 'green',
    description: 'Booking confirmed and payment received'
  },
  CANCELLED: {
    name: 'Cancelled',
    color: 'red',
    description: 'Booking has been cancelled'
  },
  COMPLETED: {
    name: 'Completed',
    color: 'blue',
    description: 'Adventure completed successfully'
  }
};

export const PAYMENT_METHODS = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: '💳',
    description: 'Visa, Mastercard, RuPay accepted'
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: '📱',
    description: 'PhonePe, Google Pay, Paytm'
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: '🏦',
    description: 'All major Indian banks'
  },
  {
    id: 'wallet',
    name: 'Digital Wallet',
    icon: '💰',
    description: 'Paytm, Amazon Pay, etc.'
  }
];

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/adventureindia',
  instagram: 'https://instagram.com/adventureindia',
  twitter: 'https://twitter.com/adventureindia',
  youtube: 'https://youtube.com/adventureindia',
  linkedin: 'https://linkedin.com/company/adventureindia'
};

export const META_DATA = {
  home: {
    title: 'Adventure India - Discover India\'s Hidden Wonders',
    description: 'Experience authentic adventure tours across India. From Himalayan treks to desert safaris, discover incredible journeys with expert guides.',
    keywords: 'india adventure tours, trekking, wildlife safari, cultural tours, travel india'
  },
  
  activities: {
    title: 'Adventure Activities - Explore India\'s Best Adventures',
    description: 'Browse our collection of adventure activities across India. Trekking, wildlife safaris, water sports, and cultural experiences.',
    keywords: 'adventure activities india, trekking tours, wildlife safari, water sports'
  },
  
  about: {
    title: 'About Us - Adventure India',
    description: 'Learn about Adventure India\'s mission to provide sustainable and authentic adventure experiences across India\'s diverse landscapes.',
    keywords: 'about adventure india, sustainable tourism, adventure company'
  }
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection problem. Please check your internet connection.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  VALIDATION_ERROR: 'Please fill in all required fields correctly.',
  BOOKING_ERROR: 'Unable to complete booking. Please try again.',
  PAYMENT_ERROR: 'Payment processing failed. Please try again.',
  NOT_FOUND: 'The requested page or information was not found.',
  UNAUTHORIZED: 'You need to be logged in to access this feature.',
  FORBIDDEN: 'You don\'t have permission to access this resource.'
};
