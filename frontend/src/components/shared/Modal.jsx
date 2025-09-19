import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = "medium",
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = ""
}) {
  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", onEsc);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    small: "max-w-sm",
    medium: "max-w-2xl",
    large: "max-w-4xl",
    xlarge: "max-w-6xl",
    full: "max-w-[95vw] max-h-[95vh]"
  };

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={handleOverlayClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={`
            bg-gradient-to-br from-green-800/95 via-emerald-800/95 to-green-700/95 
            backdrop-blur-md rounded-2xl shadow-2xl border border-green-500/20
            ${sizeClasses[size]} w-full p-8 m-4
            ${className}
          `}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            {title && (
              <h2 className="text-2xl font-bold text-white">
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                className="ml-auto w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 group"
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg 
                  className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Content */}
          <div className="text-white">
            {children}
          </div>

          {/* Footer with Close Button */}
          {showCloseButton && (
            <div className="flex justify-end mt-8 pt-6 border-t border-green-500/20">
              <button
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          )}

          {/* Forest Particles Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-300/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  x: [0, Math.random() * 5 - 2.5, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

// Alternative Modal variants for specific use cases
export function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning" // "warning", "danger", "success"
}) {
  const variantStyles = {
    warning: "from-yellow-600 to-orange-600",
    danger: "from-red-600 to-red-700",
    success: "from-green-600 to-emerald-600"
  };

  const variantIcons = {
    warning: "⚠️",
    danger: "🚨", 
    success: "✅"
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="small" 
      showCloseButton={false}
      closeOnOverlayClick={false}
    >
      <div className="text-center">
        <div className="text-4xl mb-4">
          {variantIcons[variant]}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-4">
          {title}
        </h3>
        
        <p className="text-green-200 mb-8 leading-relaxed">
          {message}
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
            onClick={onClose}
          >
            {cancelText}
          </button>
          
          <button
            className={`px-6 py-3 bg-gradient-to-r ${variantStyles[variant]} text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// Image Modal for Gallery
export function ImageModal({ 
  isOpen, 
  onClose, 
  image, 
  title, 
  description 
}) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="xlarge" 
      showCloseButton={true}
      className="p-0"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-auto max-h-[70vh] object-contain rounded-t-2xl"
        />
        
        {(title || description) && (
          <div className="p-6">
            {title && (
              <h3 className="text-2xl font-bold text-white mb-4">
                {title}
              </h3>
            )}
            
            {description && (
              <p className="text-green-200 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

// Loading Modal
export function LoadingModal({ 
  isOpen, 
  message = "Loading...",
  showSpinner = true 
}) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => {}} // Prevent closing
      size="small" 
      showCloseButton={false}
      closeOnOverlayClick={false}
    >
      <div className="text-center py-8">
        {showSpinner && (
          <div className="w-12 h-12 border-4 border-green-300/30 border-t-green-400 rounded-full animate-spin mx-auto mb-6"></div>
        )}
        
        <p className="text-green-200 text-lg">
          {message}
        </p>
      </div>
    </Modal>
  );
}

export default Modal;
