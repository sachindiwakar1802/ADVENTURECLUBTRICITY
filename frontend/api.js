// Simulated API functions for the adventure website

const API_BASE_URL = 'https://api.adventureindia.com/v1';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Simple cache implementation
class SimpleCache {
  constructor() {
    this.cache = new Map();
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  clear() {
    this.cache.clear();
  }
}

const cache = new SimpleCache();

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data generators
const generateMockData = {
  adventures: () => ({
    id: Math.floor(Math.random() * 1000),
    title: "Sample Adventure",
    location: "India",
    price: Math.floor(Math.random() * 50000) + 10000,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 200) + 50,
    difficulty: ['Easy', 'Medium', 'Hard', 'Extreme'][Math.floor(Math.random() * 4)]
  }),
  
  booking: (data) => ({
    bookingId: `ADV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    status: 'confirmed',
    totalAmount: data.totalAmount,
    bookingDate: new Date().toISOString(),
    adventures: data.adventures
  })
};

// API functions
export const api = {
  // Get all adventures with filters
  async getAdventures(filters = {}) {
    const cacheKey = `adventures-${JSON.stringify(filters)}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    await delay(800); // Simulate network delay
    
    try {
      // In a real app, this would be a fetch call
      const response = {
        data: Array.from({ length: 12 }, () => generateMockData.adventures()),
        total: 48,
        page: filters.page || 1,
        limit: filters.limit || 12
      };
      
      cache.set(cacheKey, response);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch adventures');
    }
  },

  // Get single adventure by ID
  async getAdventure(id) {
    const cacheKey = `adventure-${id}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    await delay(500);
    
    try {
      const response = {
        ...generateMockData.adventures(),
        id: parseInt(id),
        detailedDescription: "Complete adventure details with itinerary...",
        inclusions: ["Guide", "Meals", "Accommodation"],
        exclusions: ["Personal expenses", "Insurance"],
        itinerary: []
      };
      
      cache.set(cacheKey, response);
      return response;
    } catch (error) {
      throw new Error('Adventure not found');
    }
  },

  // Create booking
  async createBooking(bookingData) {
    await delay(1000);
    
    try {
      // Validate booking data
      if (!bookingData.customerInfo || !bookingData.adventures) {
        throw new Error('Invalid booking data');
      }

      const booking = generateMockData.booking(bookingData);
      
      // In a real app, this would send data to the server
      console.log('Booking created:', booking);
      
      return booking;
    } catch (error) {
      throw new Error('Failed to create booking');
    }
  },

  // Get booking by ID
  async getBooking(bookingId) {
    await delay(600);
    
    try {
      return {
        bookingId,
        status: 'confirmed',
        customerInfo: {
          name: 'John Doe',
          email: 'john@example.com'
        },
        adventures: [generateMockData.adventures()],
        totalAmount: 35000,
        bookingDate: new Date().toISOString()
      };
    } catch (error) {
      throw new Error('Booking not found');
    }
  },

  // Submit contact form
  async submitContactForm(formData) {
    await delay(800);
    
    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Required fields missing');
      }

      return {
        success: true,
        message: 'Contact form submitted successfully',
        ticketId: `CONTACT-${Date.now()}`
      };
    } catch (error) {
      throw new Error('Failed to submit contact form');
    }
  },

  // Get adventure reviews
  async getReviews(adventureId, page = 1) {
    const cacheKey = `reviews-${adventureId}-${page}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    await delay(400);
    
    try {
      const reviews = Array.from({ length: 5 }, (_, index) => ({
        id: `review-${adventureId}-${index}`,
        customerName: `Customer ${index + 1}`,
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        comment: `Amazing adventure experience! Highly recommend to everyone.`,
        date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        verified: Math.random() > 0.3
      }));

      const response = {
        reviews,
        total: 28,
        averageRating: 4.7,
        ratingDistribution: {
          5: 18,
          4: 8,
          3: 2,
          2: 0,
          1: 0
        }
      };
      
      cache.set(cacheKey, response);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch reviews');
    }
  },

  // Get popular destinations
  async getPopularDestinations() {
    const cacheKey = 'popular-destinations';
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    await delay(300);
    
    try {
      const destinations = [
        { name: 'Himalayas', adventuresCount: 45, image: 'himalaya.jpg' },
        { name: 'Kerala Backwaters', adventuresCount: 23, image: 'kerala.jpg' },
        { name: 'Rajasthan Desert', adventuresCount: 18, image: 'rajasthan.jpg' },
        { name: 'Goa Beaches', adventuresCount: 32, image: 'goa.jpg' }
      ];
      
      cache.set(cacheKey, destinations);
      return destinations;
    } catch (error) {
      throw new Error('Failed to fetch destinations');
    }
  }
};

// Helper functions
export const formatPrice = (price, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(price);
};

export const formatDate = (date, locale = 'en-IN') => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateDaysDifference = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Error handler
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.message.includes('network') || error.message.includes('fetch')) {
    return {
      type: 'NETWORK_ERROR',
      message: 'Network connection problem. Please check your internet connection.'
    };
  }
  
  if (error.message.includes('404') || error.message.includes('not found')) {
    return {
      type: 'NOT_FOUND',
      message: 'The requested information could not be found.'
    };
  }
  
  return {
    type: 'GENERAL_ERROR',
    message: error.message || 'An unexpected error occurred. Please try again.'
  };
};
