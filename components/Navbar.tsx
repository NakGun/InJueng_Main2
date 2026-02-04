
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const menuItems = [
    { name: '홈', path: '/' },
    { name: '회사소개', path: '/about' },
    { name: '서비스', path: '/services' },
    { name: '시공사례', path: '/portfolio' },
    { name: '문의하기', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass border-b border-white/10' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-3 group">
          <div className="w-12 h-12 bg-[#8B5CF6] rounded-2xl flex items-center justify-center text-white font-normal text-2xl group-hover:rotate-[15deg] transition-all shadow-xl shadow-[#8B5CF6]/30">
            <span style={{ fontFamily: "'Righteous', cursive" }}>IJ</span>
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-xl font-black tracking-tighter leading-none">인정ENG</span>
            <span className="text-[9px] font-black tracking-[0.3em] text-[#8B5CF6] uppercase leading-none mt-1">Premium Hygiene</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-black uppercase tracking-widest hover:text-[#8B5CF6] transition-all ${location.pathname === item.path ? 'text-[#8B5CF6] text-glow' : 'text-gray-400'}`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/admin" className="px-6 py-2.5 text-[10px] font-black border-2 border-[#8B5CF6]/50 text-[#8B5CF6] rounded-full hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transition-all uppercase tracking-widest">
            Admin
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 z-[-1] transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-12">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-4xl font-black transition-all ${location.pathname === item.path ? 'text-[#8B5CF6]' : 'text-white'}`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/admin" className="text-[#8B5CF6] font-black tracking-widest uppercase">Admin Page</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
