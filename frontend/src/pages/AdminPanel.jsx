import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Trash2, 
  Image, 
  Users, 
  Calendar, 
  BarChart3,
  LogOut,
  Settings,
  Plus,
  Eye
} from 'lucide-react';
import Button from '../components/shared/Button';
import Modal from '../components/shared/Modal';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Mock data
  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234', change: '+12%', color: 'text-blue-500' },
    { icon: Calendar, label: 'Adventures', value: '45', change: '+8%', color: 'text-green-500' },
    { icon: Image, label: 'Photos', value: '892', change: '+24%', color: 'text-purple-500' },
    { icon: BarChart3, label: 'Revenue', value: '₹2.4L', change: '+18%', color: 'text-orange-500' }
  ];

  const mockImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400',
      title: 'Mountain Trek',
      uploadDate: '2024-09-15',
      size: '2.3 MB'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      title: 'Forest Trail',
      uploadDate: '2024-09-12',
      size: '1.8 MB'
    }
  ];

  useEffect(() => {
    // Check admin authentication
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/admin/login');
    }

    // Load images
    setImages(mockImages);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const handleImageUpload = async (file) => {
    setUploadingImage(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newImage = {
      id: Date.now(),
      url: URL.createObjectURL(file),
      title: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    };
    
    setImages(prev => [newImage, ...prev]);
    setUploadingImage(false);
    setIsUploadModalOpen(false);
  };

  const handleImageDelete = (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImages(prev => prev.filter(img => img.id !== imageId));
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <motion.header 
        className="bg-white/90 backdrop-blur-sm shadow-xl border-b"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-semibold">Admin</span>
              </div>
              <Button
                variant="danger"
                size="sm"
                icon={LogOut}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sticky top-8">
              <nav className="space-y-2">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <Icon size={20} />
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6">
                  {stats.map(({ icon: Icon, label, value, change, color }, index) => (
                    <motion.div
                      key={label}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`${color} w-8 h-8`} />
                        <span className="text-sm font-semibold text-green-600">{change}</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
                      <div className="text-sm text-gray-600">{label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {['New user registration', 'Image uploaded to gallery', 'Adventure booking confirmed', 'Contact form submitted'].map((activity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="flex-1 text-gray-700">{activity}</span>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                {/* Gallery Header */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Gallery Management</h2>
                  <Button
                    variant="primary"
                    icon={Plus}
                    onClick={() => setIsUploadModalOpen(true)}
                  >
                    Upload Image
                  </Button>
                </div>

                {/* Images Grid */}
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="relative">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full h-48 object-cover"
                        />
                        
                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedImage(image)}
                            className="bg-white/90 text-gray-800 p-2 rounded-full hover:scale-110 transition-transform"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleImageDelete(image.id)}
                            className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 truncate">{image.title}</h4>
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>{image.uploadDate}</span>
                          <span>{image.size}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>
                <p className="text-gray-600">User management features would be implemented here.</p>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
                <p className="text-gray-600">Settings and configuration options would be implemented here.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload New Image"
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <Upload className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 mb-4">Drag and drop your image here or click to browse</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) handleImageUpload(file);
              }}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 cursor-pointer transition-colors"
            >
              Browse Files
            </label>
          </div>
          
          {uploadingImage && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="text-gray-600 mt-2">Uploading...</p>
            </div>
          )}
        </div>
      </Modal>

      {/* Image Preview Modal */}
      <Modal 
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        size="lg"
      >
        {selectedImage && (
          <div>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4">
              <h3 className="text-xl font-bold text-gray-800">{selectedImage.title}</h3>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Uploaded: {selectedImage.uploadDate}</span>
                <span>Size: {selectedImage.size}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminPanel;
