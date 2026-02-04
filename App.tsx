import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { AppState, SiteSettings } from './types';
import { INITIAL_SETTINGS, INITIAL_SERVICES, INITIAL_PORTFOLIO } from './constants';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('injeng_ec_state_v1');
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
    localStorage.setItem('injeng_ec_state_v1', JSON.stringify(state));
  }, [state]);

  const updateSettings = (newSettings: SiteSettings) => {
    setState(prev => ({ ...prev, settings: newSettings }));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-[#8B5CF6] selection:text-white bg-black">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home state={state} />} />
            <Route path="/about" element={
              <div className="pt-40 pb-24 container mx-auto px-6">
                <div className="max-w-4xl">
                  <h1 className="text-6xl md:text-7xl font-black mb-12 animate-fadeInUp">인정E&C 소개</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 text-gray-400 leading-relaxed text-lg animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                      <p className="text-white font-bold text-3xl">공간의 가치를 보존하는<br/><span className="text-[#8B5CF6]">최고의 기술력</span></p>
                      <p>인정E&C는 에어컨 정밀 세척부터 빌딩 종합 위생 관리까지, 보이지 않는 곳의 청결함이 고객의 삶의 질을 결정한다는 믿음으로 일합니다.</p>
                      <p>최첨단 내시경 장비와 친환경 세척 공법, 그리고 수만 건의 현장 경험을 보유한 숙련된 전문가 그룹이 당신의 공간을 책임집니다.</p>
                      <div className="flex gap-8 py-4 border-t border-white/10 mt-8">
                        <div>
                          <p className="text-2xl font-bold text-white">100%</p>
                          <p className="text-xs uppercase tracking-widest text-gray-500">정직한 공정</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">2,000+</p>
                          <p className="text-xs uppercase tracking-widest text-gray-500">누적 프로젝트</p>
                        </div>
                      </div>
                    </div>
                    <div className="glass rounded-[40px] p-2 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                      <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop" className="rounded-[36px] grayscale hover:grayscale-0 transition-all duration-1000" alt="Team" />
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/services" element={
               <div className="pt-40 pb-24 container mx-auto px-6">
                 <div className="max-w-3xl mb-20">
                    <h1 className="text-6xl md:text-7xl font-black mb-8 animate-fadeInUp">전문 서비스</h1>
                    <p className="text-gray-400 text-xl animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                      인정E&C는 각 분야별 전문 장비와 전용 약품을 사용하여 단순 청소를 넘어선 정밀 케어 서비스를 제공합니다.
                    </p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   {state.services.map((s, idx) => (
                     <div key={s.id} id={s.id} className="glass p-1 rounded-[48px] group animate-fadeInUp" style={{animationDelay: `${0.1 * idx}s`}}>
                       <div className="aspect-[16/10] overflow-hidden rounded-[44px] mb-10">
                         <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                       </div>
                       <div className="px-10 pb-16">
                         <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-1 bg-[#8B5CF6]"></span>
                            <span className="text-xs font-black uppercase tracking-widest text-[#8B5CF6]">Premium Service 0{idx + 1}</span>
                         </div>
                         <h3 className="text-4xl font-bold mb-6 group-hover:text-[#8B5CF6] transition-colors">{s.title}</h3>
                         <p className="text-gray-400 text-lg leading-relaxed">{s.description}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            } />
            <Route path="/portfolio" element={
              <div className="pt-40 pb-24 container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20">
                  <h1 className="text-6xl font-black mb-8 animate-fadeInUp">시공 사례</h1>
                  <p className="text-gray-500 animate-fadeInUp" style={{animationDelay: '0.2s'}}>현장에서 직접 증명한 인정E&C의 퀄리티를 확인하세요.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {state.portfolio.map((p, idx) => (
                    <div key={p.id} className="group cursor-pointer animate-fadeInUp" style={{animationDelay: `${0.1 * idx}s`}}>
                      <div className="glass rounded-[32px] overflow-hidden p-1 mb-8">
                        <div className="aspect-square overflow-hidden rounded-[28px] relative">
                          <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <div className="w-16 h-16 rounded-full bg-[#8B5CF6] flex items-center justify-center purple-glow">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                             </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4">
                        <span className="text-[#8B5CF6] text-xs font-black tracking-widest uppercase mb-3 block">{p.category}</span>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-[#8B5CF6] transition-colors">{p.title}</h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{p.description}</p>
                        <p className="text-[10px] text-gray-700 font-bold uppercase tracking-tighter">{p.date}</p>
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