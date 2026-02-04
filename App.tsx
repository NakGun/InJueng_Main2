
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { AppState, SiteSettings } from './types';
import { INITIAL_SETTINGS, INITIAL_SERVICES, INITIAL_PORTFOLIO } from './constants';

// ScrollToTop utility
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('injeng_ec_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    return {
      settings: INITIAL_SETTINGS,
      services: INITIAL_SERVICES,
      portfolio: INITIAL_PORTFOLIO
    };
  });

  useEffect(() => {
    localStorage.setItem('injeng_ec_state', JSON.stringify(state));
  }, [state]);

  const updateSettings = (newSettings: SiteSettings) => {
    setState(prev => ({ ...prev, settings: newSettings }));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-[#8B5CF6] selection:text-white">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home state={state} />} />
            <Route path="/about" element={
              <div className="pt-32 pb-24 container mx-auto px-6">
                <h1 className="text-6xl font-black mb-12">인정E&C 소개</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                    <p className="text-white font-bold text-2xl">신뢰와 인정, 공간의 가치를 완성합니다.</p>
                    <p>인정E&C는 에어컨 세척 및 종합 위생 관리 분야에서 독보적인 기술력과 정직함을 바탕으로 성장해온 전문 기업입니다.</p>
                    <p>단순한 청소를 넘어, 고객님의 건강한 일상과 비즈니스의 품격을 높이는 것을 목표로 합니다. 최신 친환경 장비와 국가 공인 자격증을 보유한 전문가들이 직접 현장을 관리합니다.</p>
                  </div>
                  <div className="glass rounded-3xl p-1 overflow-hidden">
                    <img src="https://picsum.photos/seed/office-team/800/800" className="rounded-[22px] grayscale hover:grayscale-0 transition-all duration-700" alt="Company" />
                  </div>
                </div>
              </div>
            } />
            <Route path="/services" element={
               <div className="pt-32 pb-24 container mx-auto px-6">
                 <h1 className="text-6xl font-black mb-6">전문 서비스</h1>
                 <p className="text-gray-400 mb-16 max-w-2xl">최고 품질의 도구와 공법으로 어떤 오염도 해결합니다.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   {state.services.map(s => (
                     <div key={s.id} id={s.id} className="glass p-1 rounded-[40px] group">
                       <div className="aspect-[21/9] overflow-hidden rounded-[36px] mb-8">
                         <img src={s.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                       </div>
                       <div className="px-8 pb-12">
                         <h3 className="text-3xl font-bold mb-4">{s.title}</h3>
                         <p className="text-gray-400 text-lg leading-relaxed">{s.description}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            } />
            <Route path="/portfolio" element={
              <div className="pt-32 pb-24 container mx-auto px-6">
                <h1 className="text-6xl font-black mb-12">시공 사례</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {state.portfolio.map(p => (
                    <div key={p.id} className="glass overflow-hidden rounded-3xl group cursor-pointer">
                      <div className="aspect-square overflow-hidden">
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="p-8">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs font-bold mb-4">{p.category}</span>
                        <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                        <p className="text-gray-500 text-sm mb-6">{p.description}</p>
                        <div className="flex justify-between items-center text-xs text-gray-600 pt-6 border-t border-white/5">
                          <span>Date: {p.date}</span>
                          <span className="text-[#8B5CF6]">View Case &rarr;</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            } />
            <Route path="/contact" element={<Contact settings={state.settings} />} />
            <Route path="/admin" element={<Admin state={state} updateSettings={updateSettings} />} />
          </Routes>
        </main>

        <Footer settings={state.settings} />
      </div>
    </Router>
  );
};

export default App;
