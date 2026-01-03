import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';
import Logo from '../assets/netflix-logo.png'; // Assuming you have a logo image
import avatar from '../assets/default-avatar.png'; // Assuming a default avatar

const NAV_LINKS = [
  { name: 'الرئيسية', href: '#home' },
  { name: 'مسلسلات', href: '#series' },
  { name: 'أفلام', href: '#movies' },
  { name: 'جديد ومشهور', href: '#new-popular' },
  { name: 'قائمتي', href: '#my-list' },
  { name: 'تصفح باللغة', href: '#browse-language', hideOnMobile: true },
];

/**
 * The main application header, featuring navigation, search, notifications, and profile.
 * It changes background opacity based on scroll position.
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for background color
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use a placeholder for the logo import
  const Logo = 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png';

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? 'bg-black/90 shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
      style={{ direction: 'rtl' }} // Ensure the layout is Right-to-Left
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo and Main Navigation (Right side in RTL) */}
        <div className="flex items-center space-x-6 space-x-reverse">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0">
            <img src={Logo} alt="Netflix Logo" className="h-6 md:h-8 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 space-x-reverse text-sm font-medium">
            {NAV_LINKS.filter(link => !link.hideOnMobile).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* User Controls and Secondary Navigation (Left side in RTL) */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Search Icon */}
          <button className="text-white hover:text-gray-300 transition duration-200 p-1">
            <Search className="h-5 w-5" />
          </button>

          {/* Children Link (Hidden on small screens in typical Netflix) */}
          <span className="hidden md:inline text-white text-sm cursor-pointer hover:text-gray-300">
            أطفال
          </span>

          {/* Notifications */}
          <button className="text-white hover:text-gray-300 transition duration-200 p-1 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 border border-black"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative group flex items-center cursor-pointer">
            <img
              src={avatar}
              alt="User Avatar"
              className="h-7 w-7 rounded object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://i.pravatar.cc/150?img=1" }} // Fallback
            />
            {/* Simple arrow indicator (optional, typically handled by dropdown component) */}
            {/* <ChevronDown className="h-4 w-4 text-white ml-1 transition-transform duration-300 group-hover:rotate-180" /> */}

            {/* Placeholder Dropdown Content (For illustrative purposes) */}
            <div className="absolute top-full -left-2 mt-2 w-48 bg-black/90 border border-gray-700 rounded shadow-lg text-sm hidden group-hover:block transition duration-300 origin-top-right">
              <div className="py-2">
                <a href="#profile" className="block px-4 py-2 text-white hover:bg-gray-800">
                  إدارة الحساب
                </a>
                <a href="#settings" className="block px-4 py-2 text-white hover:bg-gray-800">
                  الإعدادات
                </a>
                <hr className="border-gray-700 my-1" />
                <a href="#logout" className="block px-4 py-2 text-white hover:bg-gray-800">
                  تسجيل الخروج
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white hover:text-gray-300 p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer (Appears below the header) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 transition-all duration-300">
          <nav className="flex flex-col p-4 space-y-3 text-base font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition duration-200 border-b border-gray-800 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

Header.defaultProps = {
  // Use generic fallbacks if specific asset paths are not resolved
  avatar: 'https://i.pravatar.cc/150?img=1',
};

export default Header;
