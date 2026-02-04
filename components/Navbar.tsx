
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

  const menuItems = [
    { name: '홈', path: '/' },
    { name: '회사소개', path: '/about' },
    { name: '서비스', path: '/services' },
    { name: '시공사례', path: '/portfolio' },
    { name: '문의하기', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass shadow-2xl' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 group">
          <span 
            className="w-10 h-10 bg-[#8B5CF6] rounded-lg flex items-center justify-center text-white font-normal text-2xl leading-none group-hover:rotate-12 transition-transform shadow-lg shadow-[#8B5CF6]/20"
            style={{ fontFamily: "'Righteous', cursive" }}
          >
            IJ
          </span>
          <span className="tracking-tighter">인정E&C</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium hover:text-[#8B5CF6] transition-colors ${location.pathname === item.path ? 'text-[#8B5CF6]' : 'text-gray-300'}`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/admin" className="px-4 py-2 text-xs border border-[#8B5CF6] text-[#8B5CF6] rounded-full hover:bg-[#8B5CF6] hover:text-white transition-all">
            관리자
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 right-0 border-t border-white/10 p-6 flex flex-col gap-6 animate-fadeIn">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium border-b border-white/5 pb-2"
            >
              {item.name}
            </Link>
          ))}
          <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-[#8B5CF6]">관리자 페이지</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;