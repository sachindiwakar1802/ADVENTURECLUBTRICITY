import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    adventures: [
      { name: "Trekking", href: "/activities?category=trekking" },
      { name: "Wildlife Safari", href: "/activities?category=wildlife" },
      { name: "Water Sports", href: "/activities?category=water" },
      { name: "Cultural Tours", href: "/activities?category=cultural" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Safety Guidelines", href: "/safety" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  // Small Funny Social Media Icons
  const socialIcons = [
    {
      name: "Facebook",
      href: "#",
      bgColor: "bg-blue-500",
      emoji: "📘",
      funnyText: "Like us!",
      icon: (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      emoji: "📸",
      funnyText: "Snap it!",
      icon: (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: "Twitter", 
      href: "#",
      bgColor: "bg-sky-400",
      emoji: "🐦",
      funnyText: "Tweet!",
      icon: (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#", 
      bgColor: "bg-red-500",
      emoji: "📺",
      funnyText: "Watch!",
      icon: (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gradient-to-t from-green-900 via-emerald-800 to-green-700 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full 
          bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
        ></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-xl mr-3">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Adventure India</h3>
              </div>

              <p className="text-green-200 mb-8 leading-relaxed">
                Discover the incredible diversity of India through authentic
                adventure experiences. From the Himalayas to coastal waters,
                every journey creates lasting memories.
              </p>

              {/* Small Funny Social Icons - No Scroll */}
              <div className="flex items-center justify-center space-x-2 max-w-xs mx-auto lg:mx-0">
                {socialIcons.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className={`
                      relative group
                      ${social.bgColor}
                      w-10 h-10 rounded-full
                      flex items-center justify-center
                      shadow-md hover:shadow-lg
                      transform-gpu transition-all duration-300 ease-out
                    `}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -10, 10, -5, 5, 0],
                      y: -5,
                    }}
                    whileTap={{ 
                      scale: 0.8,
                      rotate: 360
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }}
                  >
                    {/* Wobble effect on icon */}
                    <motion.div 
                      className="flex items-center justify-center"
                      whileHover={{
                        rotate: [0, 15, -15, 10, -10, 0],
                        scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      {social.icon}
                    </motion.div>

                    {/* Floating emoji on hover */}
                    <motion.div
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-lg opacity-0 group-hover:opacity-100 pointer-events-none"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ 
                        y: [-10, -15, -10],
                        opacity: 1,
                        rotate: [0, 15, -15, 0]
                      }}
                      transition={{ 
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      {social.emoji}
                    </motion.div>

                    {/* Funny tooltip */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      {social.funnyText}
                    </div>

                    {/* Animated ring effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/30 scale-0 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Bouncing particles */}
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      <motion.div
                        className="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full"
                        animate={{
                          scale: [0, 1, 0],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                      <motion.div
                        className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-white/40 rounded-full"
                        animate={{
                          y: [0, -5, 0],
                          opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Funny social text */}
              <motion.p 
                className="text-center text-green-300 text-sm mt-4 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Follow us for epic adventures! 🏔️✨
              </motion.p>
            </motion.div>

            {/* Links Sections with Improved Spacing */}
            {Object.entries(footerLinks).map(
              ([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + categoryIndex * 0.1,
                  }}
                >
                  <h4 className="text-lg font-semibold mb-8 text-white capitalize">
                    {category === "adventures" ? "Adventures" : category}
                  </h4>
                  <ul className="space-y-4">
                    {links.map((link, linkIndex) => (
                      <li key={link.name}>
                        <motion.a
                          href={link.href}
                          className="text-green-200 hover:text-white transition-colors duration-300 block py-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.name}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            )}
          </div>

          {/* Newsletter Section */}
          <motion.div
            className="mt-16 pt-12 border-t border-green-600/30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="max-w-md mx-auto text-center">
              <h4 className="text-xl font-semibold mb-6 text-white">
                Stay Updated
              </h4>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-green-600/30 py-8 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <p className="text-green-200 text-sm">
                © {currentYear} Adventure India. All rights reserved. Made with
                🌱 for nature lovers.
              </p>

              <div className="flex space-x-8 text-sm">
                <a
                  href="/sitemap"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Sitemap
                </a>
                <a
                  href="/accessibility"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Accessibility
                </a>
                <a
                  href="/cookies"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
