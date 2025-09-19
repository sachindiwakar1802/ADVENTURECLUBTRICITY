import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryCard from '../components/cards/GalleryCard';
import ForestParticles from '../components/shared/ForestParticles';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedImages, setLikedImages] = useState(new Set());
  const [imageLikeCounts, setImageLikeCounts] = useState({});

  const categories = [
    { id: 'all', name: 'All Photos', count: 0 },
    { id: 'trekking', name: 'Trekking', count: 0 },
    { id: 'wildlife', name: 'Wildlife', count: 0 },
    { id: 'cultural', name: 'Cultural', count: 0 },
    { id: 'landscape', name: 'Landscapes', count: 0 },
    { id: 'adventure', name: 'Adventure Sports', count: 0 }
  ];

  const initialGalleryImages = [
    {
      id: 1,
      title: "Himalayan Sunrise",
      location: "Kedarnath, Uttarakhand",
      description: "Breathtaking sunrise over the snow-capped peaks of the Himalayas during our base camp trek.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      category: "trekking",
      date: "2024-04-15",
      photographer: "Adventure Team",
      rating: 4.9,
      likes: 234
    },
    {
      id: 2,
      title: "Bengal Tiger Sighting",
      location: "Jim Corbett National Park",
      description: "Majestic Bengal tiger spotted during our wildlife safari in the heart of Jim Corbett National Park.",
      image: "https://images.unsplash.com/photo-1549366021-9f761d040a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      category: "wildlife",
      date: "2024-03-20",
      photographer: "Wildlife Expert",
      rating: 4.8,
      likes: 187
    },
    {
      id: 3,
      title: "Kerala Backwaters",
      location: "Alleppey, Kerala",
      description: "Serene backwaters surrounded by coconut palms, captured during our houseboat experience.",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      category: "landscape",
      date: "2024-02-10",
      photographer: "Nature Photographer",
      rating: 4.7,
      likes: 156
    },
    {
      id: 4,
      title: "Desert Dunes at Sunset",
      location: "Jaisalmer, Rajasthan",
      description: "Golden sand dunes of the Thar Desert glowing in the warm light of the setting sun.",
      image: "https://images.unsplash.com/photo-1583308251147-2bd832fcdb7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      category: "landscape",
      date: "2024-01-25",
      photographer: "Desert Guide",
      rating: 4.9,
      likes: 298
    },
    {
      id: 5,
      title: "Traditional Folk Dance",
      location: "Rajasthan Village",
      description: "Local artists performing traditional Rajasthani folk dance around the campfire.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      category: "cultural",
      date: "2024-01-26",
      photographer: "Cultural Expert",
      rating: 4.6,
      likes: 143
    },
    {
      id: 6,
      title: "Ladakh High Passes",
      location: "Leh, Ladakh",
      description: "Dramatic mountain passes and prayer flags in the mystical landscapes of Ladakh.",
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      category: "trekking",
      date: "2024-06-10",
      photographer: "Mountain Guide",
      rating: 5.0,
      likes: 321
    },
    {
      id: 7,
      title: "Goa Beach Adventures",
      location: "North Goa",
      description: "Thrilling water sports and pristine beaches along the Arabian Sea coastline.",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      category: "adventure",
      date: "2024-05-15",
      photographer: "Water Sports Instructor",
      rating: 4.5,
      likes: 176
    },
    {
      id: 8,
      title: "Western Ghats Rainforest",
      location: "Karnataka",
      description: "Lush green rainforest canopy and cascading waterfalls in the Western Ghats.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      category: "landscape",
      date: "2024-07-08",
      photographer: "Eco Guide",
      rating: 4.8,
      likes: 209
    },
    {
      id: 9,
      title: "Rock Climbing Adventure",
      location: "Hampi, Karnataka",
      description: "Adventurers conquering the ancient boulder formations of Hampi.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      category: "adventure",
      date: "2024-03-05",
      photographer: "Climbing Instructor",
      rating: 4.7,
      likes: 165
    },
    {
      id: 10,
      title: "Spiti Valley Monasteries",
      location: "Spiti Valley, Himachal Pradesh",
      description: "Ancient Buddhist monasteries perched on dramatic cliff faces in Spiti Valley.",
      image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      category: "cultural",
      date: "2024-08-12",
      photographer: "Cultural Photographer",
      rating: 4.9,
      likes: 245
    },
    {
      id: 11,
      title: "Elephant Safari",
      location: "Kaziranga National Park, Assam",
      description: "Wild elephants in their natural habitat during our Kaziranga wildlife expedition.",
      image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      category: "wildlife",
      date: "2024-04-22",
      photographer: "Wildlife Photographer",
      rating: 4.8,
      likes: 198
    },
    {
      id: 12,
      title: "Valley of Flowers",
      location: "Uttarakhand",
      description: "Spectacular alpine flowers blooming in the famous Valley of Flowers National Park.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      category: "landscape",
      date: "2024-07-20",
      photographer: "Botany Expert",
      rating: 5.0,
      likes: 387
    }
  ];

  // Load persistent data from localStorage on component mount
  useEffect(() => {
    try {
      // Load liked images
      const savedLikedImages = localStorage.getItem('adventure-gallery-liked-images');
      if (savedLikedImages) {
        setLikedImages(new Set(JSON.parse(savedLikedImages)));
      }

      // Load like counts
      const savedLikeCounts = localStorage.getItem('adventure-gallery-like-counts');
      if (savedLikeCounts) {
        setImageLikeCounts(JSON.parse(savedLikeCounts));
      } else {
        // Initialize like counts from original data
        const initialCounts = {};
        initialGalleryImages.forEach(img => {
          initialCounts[img.id] = img.likes;
        });
        setImageLikeCounts(initialCounts);
        localStorage.setItem('adventure-gallery-like-counts', JSON.stringify(initialCounts));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // Initialize with default values if localStorage fails
      const initialCounts = {};
      initialGalleryImages.forEach(img => {
        initialCounts[img.id] = img.likes;
      });
      setImageLikeCounts(initialCounts);
    }
  }, []);

  // Get gallery images with updated like counts
  const galleryImages = initialGalleryImages.map(image => ({
    ...image,
    likes: imageLikeCounts[image.id] || image.likes,
    isLiked: likedImages.has(image.id)
  }));

  // Update category counts
  const updatedCategories = categories.map(cat => ({
    ...cat,
    count: cat.id === 'all' ? galleryImages.length : galleryImages.filter(img => img.category === cat.id).length
  }));

  // Handle like functionality - ONLY INCREASE, NO DISLIKE
  const handleLikeImage = (imageId, e) => {
    e.stopPropagation(); // Prevent modal from opening when clicking like button
    
    // Check if already liked - if yes, do nothing (no dislike functionality)
    if (likedImages.has(imageId)) {
      console.log(`💖 Already liked image: ${imageId} - no action taken`);
      return; // Exit early - already liked, cannot unlike
    }
    
    // Only allow liking if not already liked
    const newLikedImages = new Set(likedImages);
    const newLikeCounts = { ...imageLikeCounts };
    
    // Like the image (increase count)
    newLikedImages.add(imageId);
    newLikeCounts[imageId] = (newLikeCounts[imageId] || 0) + 1;
    
    console.log(`💖 Liked image: ${imageId} - count now: ${newLikeCounts[imageId]}`);
    
    // Update state
    setLikedImages(newLikedImages);
    setImageLikeCounts(newLikeCounts);
    
    // Persist to localStorage
    try {
      localStorage.setItem('adventure-gallery-liked-images', JSON.stringify(Array.from(newLikedImages)));
      localStorage.setItem('adventure-gallery-like-counts', JSON.stringify(newLikeCounts));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
    
    // Update selected image if it's currently open in modal
    if (selectedImage && selectedImage.id === imageId) {
      setSelectedImage({
        ...selectedImage,
        likes: newLikeCounts[imageId],
        isLiked: true
      });
    }
  };

  useEffect(() => {
    let filtered = galleryImages;
    if (selectedCategory !== 'all') {
      filtered = galleryImages.filter(image => image.category === selectedCategory);
    }
    setFilteredImages(filtered);
  }, [selectedCategory, imageLikeCounts, likedImages]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
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
              Adventure Gallery
            </motion.h1>
            
            <motion.p
              className="text-xl text-green-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore stunning moments captured during our adventures across India. 
              Each photo tells a story of discovery, wonder, and the incredible beauty 
              of our diverse landscapes and cultures.
            </motion.p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="pb-16 px-6">
          <div className="container mx-auto">
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {updatedCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-green-500 text-white shadow-lg transform scale-105'
                      : 'bg-white/10 text-green-200 hover:bg-white/20 hover:scale-102'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </motion.div>

            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-green-200 text-lg">
                Showing {filteredImages.length} photos
                {selectedCategory !== 'all' && ` in ${updatedCategories.find(cat => cat.id === selectedCategory)?.name}`}
              </p>
              <p className="text-green-300 text-sm mt-2">
                💝 {likedImages.size} photos loved by you • Tap ❤️ to show your love!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="pb-20 px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <GalleryCard
                    item={image}
                    index={index}
                    onImageClick={handleImageClick}
                  />
                  
                  {/* Enhanced Like Button - ONLY SHOWS IF NOT LIKED */}
                  {!image.isLiked ? (
                    <button
                      onClick={(e) => handleLikeImage(image.id, e)}
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-300 flex items-center justify-center hover:scale-110 group-hover:bg-red-500/60"
                      title="Love this photo"
                    >
                      <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 1.4 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </motion.svg>
                    </button>
                  ) : (
                    // Show loved indicator for already liked images
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-red-500 text-white transition-all duration-300 flex items-center justify-center shadow-lg">
                      <motion.svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                    </div>
                  )}
                  
                  {/* Like Count Display */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <svg className="w-3 h-3 mr-1 text-red-400 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span>{image.likes}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Image Modal */}
        <AnimatePresence>
          {isModalOpen && selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="relative max-w-5xl w-full bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-green-500/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Modal Like Button - ONLY SHOWS IF NOT LIKED */}
                {!selectedImage.isLiked ? (
                  <button
                    onClick={(e) => handleLikeImage(selectedImage.id, e)}
                    className="absolute top-4 right-16 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-red-500/70 text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
                    title="Love this photo"
                  >
                    <motion.svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 1.4 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </motion.svg>
                  </button>
                ) : (
                  // Show loved indicator for already liked images in modal
                  <div className="absolute top-4 right-16 z-10 w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg">
                    <motion.svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  </div>
                )}

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image */}
                <div className="aspect-w-16 aspect-h-12 bg-black">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Enhanced Image Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-white">{selectedImage.title}</h3>
                    {selectedImage.isLiked && (
                      <span className="text-red-400 text-sm bg-red-500/20 px-3 py-1 rounded-full flex items-center">
                        💖 Loved by you
                      </span>
                    )}
                  </div>
                  
                  <p className="text-green-200 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {selectedImage.location}
                  </p>
                  <p className="text-white/80 mb-4 leading-relaxed">{selectedImage.description}</p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-green-300">📸 {selectedImage.photographer}</span>
                      <span className="text-green-300">📅 {new Date(selectedImage.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-400 fill-current mr-1" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white">{selectedImage.rating}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-red-400 fill-current mr-1" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="text-white">{selectedImage.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
