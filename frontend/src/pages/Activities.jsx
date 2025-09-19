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

  // Image error handler function
  const getReliableImage = (category, id, fallbackText) => {
    return {
      primary: `https://picsum.photos/2000/1200?random=${id}`,
      fallback: `https://placehold.co/2000x1200/4ade80/ffffff?text=${encodeURIComponent(fallbackText)}`,
      placeholder: `https://via.placeholder.com/2000x1200/059669/ffffff?text=${encodeURIComponent(fallbackText)}`
    };
  };

  const activities = [
    {
      id: 1,
      title: "Himalayan Base Camp Trek",
      location: "Uttarakhand, India",
      description: "Challenge yourself with this epic journey to the base camp of majestic Himalayan peaks. Experience breathtaking views, local culture, and the thrill of high-altitude trekking.",
      images: getReliableImage("trekking", 1, "Himalayan Trek"),
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
      images: getReliableImage("cultural", 2, "Kerala Backwaters"),
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
      images: getReliableImage("desert", 3, "Desert Safari"),
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
      images: getReliableImage("water", 4, "Goa Water Sports"),
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
      images: getReliableImage("wildlife", 5, "Wildlife Safari"),
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
      images: getReliableImage("mountain", 6, "Ladakh Adventure"),
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
    // NEW ACTIVITIES ADDED
    {
      id: 7,
      title: "Andaman Scuba Diving Experience",
      location: "Havelock Island, Andaman",
      description: "Discover the underwater paradise of Andaman with pristine coral reefs, exotic marine life, and crystal-clear tropical waters.",
      images: getReliableImage("water", 7, "Scuba Diving"),
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
      images: getReliableImage("mountain", 8, "Spiti Winter"),
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
      images: getReliableImage("cultural", 9, "Hampi Heritage"),
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
      images: getReliableImage("desert", 10, "White Desert"),
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
      images: getReliableImage("wildlife", 11, "Sundarbans Safari"),
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
      images: getReliableImage("water", 12, "River Rafting"),
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
      images: getReliableImage("trekking", 13, "Valley of Flowers"),
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
      images: getReliableImage("cultural", 14, "Khajuraho Temples"),
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
      images: getReliableImage("wildlife", 15, "Kanha Tiger Safari"),
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

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredActivities(filtered);
  }, [selectedCategory, selectedDifficulty, searchTerm]);

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

            {/* Search Bar */}
            <motion.div
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search adventures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-green-500/30 rounded-full text-white placeholder-green-300 focus:outline-none focus:border-green-400 transition-all duration-300"
                />
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
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
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-white/10 text-green-200 hover:bg-white/20'
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
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white/10 text-blue-200 hover:bg-white/20'
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
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">
                {filteredActivities.length} Adventures Found
              </h3>
              
              <select className="bg-white/10 backdrop-blur-md border border-green-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-400">
                <option value="recommended" className="bg-green-800">Recommended</option>
                <option value="price-low" className="bg-green-800">Price: Low to High</option>
                <option value="price-high" className="bg-green-800">Price: High to Low</option>
                <option value="rating" className="bg-green-800">Highest Rated</option>
                <option value="duration" className="bg-green-800">Duration</option>
              </select>
            </div>

            {filteredActivities.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredActivities.map((activity, index) => (
                  <ActivityCard
                    key={activity.id}
                    activity={{
                      ...activity,
                      image: activity.images.primary,
                      fallbackImage: activity.images.fallback,
                      placeholderImage: activity.images.placeholder
                    }}
                    index={index}
                    onSelect={(activity) => console.log('Selected:', activity)}
                  />
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
                  Try adjusting your filters or search terms to discover more adventures.
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                    setSearchTerm('');
                  }}
                  variant="secondary"
                >
                  Clear All Filters
                </Button>
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
