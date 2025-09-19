// Animation variants for Framer Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// 3D Animation helpers
export const floatingAnimation = (object, intensity = 0.002, speed = 2) => {
  if (!object || !object.position) return;
  
  const time = Date.now() * 0.001;
  object.position.y += Math.sin(time * speed) * intensity;
};

export const rotatingAnimation = (object, speed = 0.01) => {
  if (!object || !object.rotation) return;
  
  object.rotation.y += speed;
};

export const pulseAnimation = (object, intensity = 0.1, speed = 3) => {
  if (!object || !object.scale) return;
  
  const time = Date.now() * 0.001;
  const scale = 1 + Math.sin(time * speed) * intensity;
  object.scale.setScalar(scale);
};

// Particle system helpers
export const createParticles = (count, bounds, material) => {
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    particles.push({
      x: (Math.random() - 0.5) * bounds.x,
      y: (Math.random() - 0.5) * bounds.y,
      z: (Math.random() - 0.5) * bounds.z,
      vx: (Math.random() - 0.5) * 0.02,
      vy: (Math.random() - 0.5) * 0.02,
      vz: (Math.random() - 0.5) * 0.02,
      material: material
    });
  }
  
  return particles;
};

export const updateParticles = (particles, bounds) => {
  particles.forEach(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.z += particle.vz;
    
    // Boundary checking
    if (Math.abs(particle.x) > bounds.x / 2) particle.vx *= -1;
    if (Math.abs(particle.y) > bounds.y / 2) particle.vy *= -1;
    if (Math.abs(particle.z) > bounds.z / 2) particle.vz *= -1;
  });
};

// Easing functions
export const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

export const easeInOutQuart = (t) => {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
};

export const easeOutElastic = (t) => {
  const p = 0.3;
  return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
};

// Scroll-based animations
export const getScrollProgress = (element) => {
  if (!element) return 0;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const elementTop = rect.top;
  const elementHeight = rect.height;
  
  const start = windowHeight;
  const end = -elementHeight;
  const progress = Math.max(0, Math.min(1, (start - elementTop) / (start - end)));
  
  return progress;
};

export const parallaxTransform = (progress, intensity = 0.5) => {
  return {
    transform: `translateY(${progress * 100 * intensity}px)`
  };
};
