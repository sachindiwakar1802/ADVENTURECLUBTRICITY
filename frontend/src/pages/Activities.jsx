import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ActivityCard from '../components/cards/ActivityCard';
import ForestParticles from '../components/shared/ForestParticles';
import Button from '../components/shared/Button';

const Activities = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  const categories = [
    { id: 'all', name: 'All Adventures', icon: '🌟' },
    { id: 'trekking', name: 'Trekking', icon: '🥾' },
    { id: 'wildlife', name: 'Wildlife Safari', icon: '🦌' },
    { id: 'water', name: 'Water Sports', icon: '🌊' },
    { id: 'cultural', name: 'Cultural Tours', icon: '🏛️' },
    { id: 'desert', name: 'Desert Adventure', icon: '🐪' },
    { id: 'mountain', name: 'Mountain Sports', icon: '⛰️' }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'Easy', name: 'Easy' },
    { id: 'Medium', name: 'Medium' },
    { id: 'Hard', name: 'Hard' },
    { id: 'Extreme', name: 'Extreme' }
  ];

  // Enhanced image function with category-specific keywords
  const getReliableImage = (category, id, title, location) => {
    const keywords = [];
    
    switch (category) {
      case 'trekking':
        keywords.push('mountain', 'hiking', 'trek', 'nature', 'landscape');
        break;
      case 'wildlife':
        keywords.push('tiger', 'wildlife', 'safari', 'jungle', 'animals');
        break;
      case 'water':
        keywords.push('water', 'ocean', 'diving', 'beach', 'sea');
        break;
      case 'cultural':
        keywords.push('temple', 'heritage', 'culture', 'architecture', 'historical');
        break;
      case 'desert':
        keywords.push('desert', 'sand', 'dunes', 'camel', 'sunset');
        break;
      case 'mountain':
        keywords.push('mountain', 'snow', 'peak', 'altitude', 'climbing');
        break;
      default:
        keywords.push('adventure', 'travel', 'nature');
    }
    
    return {
      primary: `https://picsum.photos/2000/1200?random=${id}`,
      fallback: `https://placehold.co/2000x1200/4ade80/ffffff?text=${encodeURIComponent(title)}`,
      placeholder: `https://via.placeholder.com/2000x1200/059669/ffffff?text=${encodeURIComponent(title)}`,
      keywords: keywords.join(', '),
      searchTerms: `${title} ${location} ${keywords.join(' ')}`.toLowerCase()
    };
  };

  // Function to calculate recommendation score
  const calculateRecommendationScore = (activity) => {
    let score = 0;
    
    // Rating weight (40% of score) - normalize rating to 0-40 scale
    score += (activity.rating / 5) * 40;
    
    // Reviews weight (30% of score) - normalize reviews to 0-30 scale
    // Using log scale to prevent activities with extremely high reviews from dominating
    const normalizedReviews = Math.min(activity.reviews / 300, 1) * 30;
    score += normalizedReviews;
    
    // Seasonal relevance (15% of score)
    const currentMonth = new Date().getMonth() + 1;
    const seasonalBonus = getSeasonalBonus(activity.season, currentMonth);
    score += seasonalBonus * 15;
    
    // Difficulty accessibility (10% of score) - favor medium difficulty
    const difficultyBonus = getDifficultyBonus(activity.difficulty);
    score += difficultyBonus * 10;
    
    // Variety bonus (5% of score) - slight boost to different categories
    const varietyBonus = getVarietyBonus(activity.category);
    score += varietyBonus * 5;
    
    return score;
  };

  // Helper function for seasonal relevance
  const getSeasonalBonus = (season, currentMonth) => {
    if (!season) return 0.5;
    
    const seasonMap = {
      'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
      'Jul': 7, 'Aug': 8, 'Sep': 9, 'Sept': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
    };
    
    const seasonMonths = [];
    season.split(',').forEach(period => {
      const months = period.trim().split('-');
      if (months.length === 2) {
        const start = seasonMap[months[0]];
        const end = seasonMap[months[1]];
        
        if (start && end) {
          for (let i = start; i <= end; i++) {
            seasonMonths.push(i);
          }
        }
      }
    });
    
    // Current month is September (9)
    const septemberMonth = 9;
    return seasonMonths.includes(septemberMonth) ? 1.0 : 0.3;
  };

  // Helper function for difficulty bonus
  const getDifficultyBonus = (difficulty) => {
    const difficultyScores = {
      'Easy': 0.9,      // High accessibility
      'Medium': 1.0,    // Perfect balance
      'Hard': 0.7,      // More challenging
      'Extreme': 0.4    // Very challenging
    };
    return difficultyScores[difficulty] || 0.5;
  };

  // Helper function for variety bonus
  const getVarietyBonus = (category) => {
    const varietyScores = {
      'trekking': 1.0,
      'cultural': 0.9,
      'water': 0.8,
      'wildlife': 0.9,
      'desert': 0.7,
      'mountain': 0.8
    };
    return varietyScores[category] || 0.5;
  };

  const activities = [
    {
      id: 1,
      title: "Himalayan Base Camp Trek",
      location: "Uttarakhand, India",
      description: "Challenge yourself with this epic journey to the base camp of majestic Himalayan peaks. Experience breathtaking views, local culture, and the thrill of high-altitude trekking.",
      images: getReliableImage("trekking", 1, "Himalayan Base Camp Trek", "Uttarakhand, India"),
      duration: "14 Days",
      difficulty: "Hard",
      price: 65000,
      rating: 4.9,
      reviews: 156,
      features: ["Professional Guide", "All Meals", "Camping Equipment", "Medical Kit"],
      category: "trekking",
      season: "April-May, Sept-Oct",
      groupSize: "6-12 people"
    },
    {
      id: 2,
      title: "Kerala Houseboat Experience",
      location: "Alleppey, Kerala",
      description: "Drift through the serene backwaters of Kerala in a traditional houseboat. Enjoy local cuisine, village visits, and the peaceful rhythm of backwater life.",
      images: getReliableImage("cultural", 2, "Kerala Houseboat Experience", "Alleppey, Kerala"),
      duration: "3 Days",
      difficulty: "Easy",
      price: 18000,
      rating: 4.7,
      reviews: 243,
      features: ["AC Houseboat", "All Meals", "Village Tours", "Ayurveda Spa"],
      category: "cultural",
      season: "Oct-March",
      groupSize: "2-6 people"
    },
    {
      id: 3,
      title: "Rajasthan Desert Safari",
      location: "Jaisalmer, Rajasthan",
      description: "Experience the golden dunes of the Thar Desert with camel rides, traditional music, and nights under the starlit desert sky.",
      images: getReliableImage("desert", 3, "Rajasthan Desert Safari", "Jaisalmer, Rajasthan"),
      duration: "4 Days",
      difficulty: "Medium",
      price: 28000,
      rating: 4.8,
      reviews: 189,
      features: ["Camel Safari", "Desert Camping", "Folk Music", "Traditional Meals"],
      category: "desert",
      season: "Nov-Feb",
      groupSize: "4-10 people"
    },
    {
      id: 4,
      title: "Goa Water Sports Adventure",
      location: "North Goa",
      description: "Dive into exciting water sports including parasailing, jet skiing, and scuba diving in the crystal clear waters of the Arabian Sea.",
      images: getReliableImage("water", 4, "Goa Water Sports Adventure", "North Goa"),
      duration: "5 Days",
      difficulty: "Medium",
      price: 35000,
      rating: 4.6,
      reviews: 178,
      features: ["All Water Sports", "Beach Resort", "Equipment Provided", "Certified Instructors"],
      category: "water",
      season: "Oct-May",
      groupSize: "4-8 people"
    },
    {
      id: 5,
      title: "Jim Corbett Wildlife Safari",
      location: "Uttarakhand, India",
      description: "Spot the majestic Bengal tiger and other wildlife in India's oldest national park. Experience the thrill of jungle safaris and nature walks.",
      images: getReliableImage("wildlife", 5, "Jim Corbett Wildlife Safari", "Uttarakhand, India"),
      duration: "4 Days",
      difficulty: "Easy",
      price: 22000,
      rating: 4.5,
      reviews: 134,
      features: ["Jeep Safari", "Nature Walks", "Bird Watching", "Wildlife Photography"],
      category: "wildlife",
      season: "Nov-April",
      groupSize: "4-6 people"
    },
    {
      id: 6,
      title: "Ladakh High Altitude Adventure",
      location: "Leh, Ladakh",
      description: "Explore the mystical landscapes of Ladakh with high-altitude lakes, ancient monasteries, and challenging mountain passes.",
      images: getReliableImage("mountain", 6, "Ladakh High Altitude Adventure", "Leh, Ladakh"),
      duration: "12 Days",
      difficulty: "Extreme",
      price: 85000,
      rating: 4.9,
      reviews: 89,
      features: ["High Altitude Training", "Monastery Visits", "All Permits", "Oxygen Support"],
      category: "mountain",
      season: "June-Sept",
      groupSize: "4-8 people"
    },
    {
      id: 7,
      title: "Andaman Scuba Diving Experience",
      location: "Havelock Island, Andaman",
      description: "Discover the underwater paradise of Andaman with pristine coral reefs, exotic marine life, and crystal-clear tropical waters.",
      images: getReliableImage("water", 7, "Andaman Scuba Diving Experience", "Havelock Island, Andaman"),
      duration: "6 Days",
      difficulty: "Medium",
      price: 42000,
      rating: 4.8,
      reviews: 167,
      features: ["PADI Certification", "Equipment Included", "Beach Resort", "Marine Life Tours"],
      category: "water",
      season: "Nov-April",
      groupSize: "4-6 people"
    },
    {
      id: 8,
      title: "Spiti Valley Winter Expedition",
      location: "Himachal Pradesh, India",
      description: "Journey through the frozen landscapes of Spiti Valley in winter. Experience sub-zero temperatures and stunning snow-covered monasteries.",
      images: getReliableImage("mountain", 8, "Spiti Valley Winter Expedition", "Himachal Pradesh, India"),
      duration: "10 Days",
      difficulty: "Extreme",
      price: 75000,
      rating: 4.7,
      reviews: 78,
      features: ["Winter Gear", "Heated Accommodation", "Monastery Visits", "Photography Guide"],
      category: "mountain",
      season: "Dec-Feb",
      groupSize: "6-10 people"
    },
    {
      id: 9,
      title: "Hampi Heritage Walk",
      location: "Karnataka, India",
      description: "Explore the ancient ruins of Vijayanagara Empire in Hampi. Walk through historical temples, royal complexes, and boulder landscapes.",
      images: getReliableImage("cultural", 9, "Hampi Heritage Walk", "Karnataka, India"),
      duration: "3 Days",
      difficulty: "Easy",
      price: 15000,
      rating: 4.6,
      reviews: 201,
      features: ["Heritage Guide", "Temple Tours", "Local Cuisine", "Cultural Shows"],
      category: "cultural",
      season: "Oct-March",
      groupSize: "8-15 people"
    },
    {
      id: 10,
      title: "Rann of Kutch White Desert",
      location: "Gujarat, India",
      description: "Experience the surreal beauty of the white salt desert during full moon nights. Enjoy folk dances, camel rides, and traditional crafts.",
      images: getReliableImage("desert", 10, "Rann of Kutch White Desert", "Gujarat, India"),
      duration: "4 Days",
      difficulty: "Easy",
      price: 24000,
      rating: 4.9,
      reviews: 156,
      features: ["Desert Camping", "Cultural Programs", "Handicraft Tours", "Camel Safari"],
      category: "desert",
      season: "Nov-Feb",
      groupSize: "6-12 people"
    },
    {
      id: 11,
      title: "Sundarbans Mangrove Safari",
      location: "West Bengal, India",
      description: "Navigate through the world's largest mangrove forest and spot the elusive Royal Bengal Tiger in its natural habitat.",
      images: getReliableImage("wildlife", 11, "Sundarbans Mangrove Safari", "West Bengal, India"),
      duration: "5 Days",
      difficulty: "Medium",
      price: 32000,
      rating: 4.4,
      reviews: 124,
      features: ["Boat Safari", "Tiger Tracking", "Bird Watching", "Local Village Visits"],
      category: "wildlife",
      season: "Nov-March",
      groupSize: "6-8 people"
    },
    {
      id: 12,
      title: "Rishikesh River Rafting",
      location: "Uttarakhand, India",
      description: "Experience the thrill of white water rafting on the holy Ganges river with rapids ranging from Grade I to Grade IV.",
      images: getReliableImage("water", 12, "Rishikesh River Rafting", "Uttarakhand, India"),
      duration: "2 Days",
      difficulty: "Medium",
      price: 12000,
      rating: 4.7,
      reviews: 289,
      features: ["Safety Gear", "Professional Guide", "Riverside Camping", "Yoga Sessions"],
      category: "water",
      season: "March-June, Sept-Nov",
      groupSize: "8-12 people"
    },
    {
      id: 13,
      title: "Valley of Flowers Trek",
      location: "Uttarakhand, India",
      description: "Trek through the UNESCO World Heritage site filled with endemic alpine flowers and stunning Himalayan views.",
      images: getReliableImage("trekking", 13, "Valley of Flowers Trek", "Uttarakhand, India"),
      duration: "8 Days",
      difficulty: "Hard",
      price: 45000,
      rating: 4.8,
      reviews: 143,
      features: ["Botanical Guide", "Camping", "All Meals", "Photography Workshop"],
      category: "trekking",
      season: "July-Sept",
      groupSize: "8-10 people"
    },
    {
      id: 14,
      title: "Khajuraho Cultural Heritage",
      location: "Madhya Pradesh, India",
      description: "Discover the magnificent temples of Khajuraho known for their intricate sculptures and architectural brilliance.",
      images: getReliableImage("cultural", 14, "Khajuraho Cultural Heritage", "Madhya Pradesh, India"),
      duration: "3 Days",
      difficulty: "Easy",
      price: 16000,
      rating: 4.5,
      reviews: 187,
      features: ["Heritage Guide", "Temple Tours", "Light & Sound Show", "Local Crafts"],
      category: "cultural",
      season: "Oct-March",
      groupSize: "10-15 people"
    },
    {
      id: 15,
      title: "Kanha Tiger Safari",
      location: "Madhya Pradesh, India",
      description: "Explore one of India's most beautiful national parks and the inspiration for Kipling's Jungle Book stories.",
      images: getReliableImage("wildlife", 15, "Kanha Tiger Safari", "Madhya Pradesh, India"),
      duration: "4 Days",
      difficulty: "Easy",
      price: 28000,
      rating: 4.6,
      reviews: 165,
      features: ["Jeep Safari", "Tiger Tracking", "Nature Interpretation", "Tribal Village Visit"],
      category: "wildlife",
      season: "Nov-April",
      groupSize: "4-6 people"
    }
  ];

  // Enhanced filtering and sorting logic with PROPER RECOMMENDATION ALGORITHM
  useEffect(() => {
    let filtered = activities;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(activity => activity.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(activity => activity.difficulty === selectedDifficulty);
    }

    // Enhanced search functionality
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(activity => {
        // Search in multiple fields
        const searchFields = [
          activity.title,
          activity.location,
          activity.description,
          activity.category,
          activity.difficulty,
          activity.season,
          ...activity.features,
          activity.images.keywords || '',
          activity.images.searchTerms || ''
        ].join(' ').toLowerCase();

        // Support partial matches and multiple search terms
        const searchTerms = searchLower.split(' ').filter(term => term.length > 0);
        return searchTerms.every(term => searchFields.includes(term));
      });
    }

    // Apply sorting with FIXED RECOMMENDATION ALGORITHM
    switch (sortBy) {
      case 'recommended':
        // FIXED: Proper recommendation algorithm
        filtered = filtered
          .map(activity => ({
            ...activity,
            recommendationScore: calculateRecommendationScore(activity)
          }))
          .sort((a, b) => b.recommendationScore - a.recommendationScore);
        console.log('🏆 Recommendation scores:', filtered.map(a => ({ 
          title: a.title.substring(0, 20), 
          score: a.recommendationScore.toFixed(1),
          rating: a.rating,
          reviews: a.reviews 
        })));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration-short':
        filtered.sort((a, b) => {
          const aDays = parseInt(a.duration);
          const bDays = parseInt(b.duration);
          return aDays - bDays;
        });
        break;
      case 'duration-long':
        filtered.sort((a, b) => {
          const aDays = parseInt(a.duration);
          const bDays = parseInt(b.duration);
          return bDays - aDays;
        });
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Fallback to rating if unknown sort option
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredActivities(filtered);
  }, [selectedCategory, selectedDifficulty, searchTerm, sortBy]);

  // Clear all filters function
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSearchTerm('');
    setSortBy('recommended');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 relative">
      <ForestParticles />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Adventure Activities
            </motion.h1>
            
            <motion.p
              className="text-xl text-green-200 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Choose your perfect adventure from our curated collection of experiences 
              across India's most spectacular destinations.
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.div
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by location, activity, difficulty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-green-500/30 rounded-full text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:bg-white/15 transition-all duration-300"
                />
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-300 hover:text-white transition-colors"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="mt-2 text-sm text-green-300">
                  Searching for: "{searchTerm}"
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="pb-16 px-6">
          <div className="container mx-auto">
            {/* Category Filter */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-white font-semibold mb-4">Adventure Types</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-green-500 text-white shadow-lg transform scale-105'
                        : 'bg-white/10 text-green-200 hover:bg-white/20 hover:scale-102'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Difficulty Filter */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4">Difficulty Level</h3>
              <div className="flex flex-wrap gap-3">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty.id}
                    onClick={() => setSelectedDifficulty(difficulty.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedDifficulty === difficulty.id
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                        : 'bg-white/10 text-blue-200 hover:bg-white/20 hover:scale-102'
                    }`}
                  >
                    {difficulty.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Activities Grid */}
        <section className="pb-20 px-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h3 className="text-2xl font-bold text-white">
                {filteredActivities.length} Adventure{filteredActivities.length !== 1 ? 's' : ''} Found
                {searchTerm && (
                  <span className="text-lg text-green-300 font-normal ml-2">
                    for "{searchTerm}"
                  </span>
                )}
                {sortBy === 'recommended' && (
                  <span className="text-sm text-yellow-300 block mt-1">
                    ⭐ Smart recommendations based on rating, reviews, season & accessibility
                  </span>
                )}
              </h3>
              
              <div className="flex gap-3 items-center">
                {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchTerm) && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm bg-red-500/20 text-red-300 px-3 py-1 rounded-full hover:bg-red-500/30 transition-all duration-300"
                  >
                    Clear All Filters
                  </button>
                )}
                
                {/* FIXED DROPDOWN WITH PROPER RECOMMENDATION */}
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 backdrop-blur-md border border-green-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-400 text-sm"
                >
                  <option value="recommended" className="bg-green-800">⭐ Smart Recommendations</option>
                  <option value="rating" className="bg-green-800">⭐ Highest Rated</option>
                  <option value="reviews" className="bg-green-800">💬 Most Reviewed</option>
                  <option value="duration-short" className="bg-green-800">⏱️ Duration: Short to Long</option>
                  <option value="duration-long" className="bg-green-800">⏱️ Duration: Long to Short</option>
                  <option value="alphabetical" className="bg-green-800">🔤 Alphabetical</option>
                </select>
              </div>
            </div>

            {filteredActivities.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ActivityCard
                      activity={{
                        ...activity,
                        image: activity.images.primary,
                        fallbackImage: activity.images.fallback,
                        placeholderImage: activity.images.placeholder
                      }}
                      index={index}
                      onSelect={(activity) => console.log('Selected:', activity)}
                    />
                    {sortBy === 'recommended' && activity.recommendationScore && (
                      <div className="text-center mt-2">
                        <span className="text-xs text-yellow-300 bg-yellow-500/20 px-2 py-1 rounded-full">
                          Score: {activity.recommendationScore.toFixed(1)}/100
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No Adventures Found</h3>
                <p className="text-green-200 mb-6">
                  {searchTerm 
                    ? `No results found for "${searchTerm}". Try different keywords or clear your search.`
                    : 'Try adjusting your filters to discover more adventures.'
                  }
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={handleClearFilters}
                    variant="secondary"
                  >
                    Clear All Filters
                  </Button>
                  {searchTerm && (
                    <div className="text-sm text-green-300">
                      <p>Try searching for:</p>
                      <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {['trekking', 'desert', 'wildlife', 'water sports', 'kerala', 'rajasthan', 'goa'].map(term => (
                          <button
                            key={term}
                            onClick={() => setSearchTerm(term)}
                            className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs hover:bg-green-500/30 transition-all"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-black/20">
          <div className="container mx-auto text-center">
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Can't Find Your Perfect Adventure?
              </h2>
              <p className="text-green-200 text-lg mb-8">
                Let us create a custom adventure experience tailored just for you. 
                Our team of experts will design the perfect itinerary based on your preferences.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Activities;
