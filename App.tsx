
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { AppState, SiteSettings, ServiceItem, PortfolioItem, AboutContent } from './types';
import { db } from './services/db';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 데이터 베이스 연동
  useEffect(() => {
    const initDb = async () => {
      const data = await db.fetchState();
      setState(data);
      setIsLoading(false);
    };
    initDb();
  }, []);

  if (isLoading || !state) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">
        <div className="w-20 h-20 bg-[#8B5CF6] rounded-2xl flex items-center justify-center text-white font-normal text-3xl mb-6 animate-pulse shadow-2xl shadow-[#8B5CF6]/50">
          <span style={{ fontFamily: "'Righteous', cursive" }}>IJ</span>
        </div>
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-[#8B5CF6] w-full origin-left animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
        <p className="mt-6 text-gray-500 text-xs font-black tracking-[0.3em] uppercase animate-pulse">Connecting to Database...</p>
        <style>{`
          @keyframes loading {
            0% { transform: scaleX(0); }
            50% { transform: scaleX(1); }
            100% { transform: scaleX(0); transform-origin: right; }
          }
        `}</style>
      </div>
    );
  }

  const handleUpdateState = async (newState: AppState) => {
    setState(newState);
    await db.saveState(newState);
  };

  const updateSettings = (newSettings: SiteSettings) => {
    handleUpdateState({ ...state, settings: newSettings });
  };

  const updateServices = (newServices: ServiceItem[]) => {
    handleUpdateState({ ...state, services: newServices });
  };

  const updatePortfolio = (newPortfolio: PortfolioItem[]) => {
    handleUpdateState({ ...state, portfolio: newPortfolio });
  };

  const updateAbout = (newAbout: AboutContent) => {
    handleUpdateState({ ...state, about: newAbout });
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
              <div className="pt-32 md:pt-40 pb-24 container mx-auto px-6 text-white text-center md:text-left">
                <div className="max-w-4xl mx-auto md:mx-0">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-8 md:mb-12 animate-fadeInUp">{state.about.title}</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div className="space-y-6 md:space-y-8 text-gray-400 leading-relaxed text-base md:text-lg animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                      <p className="text-white font-bold text-2xl md:text-3xl leading-tight">
                        {state.about.subtitle.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                      </p>
                      <p>{state.about.p1}</p>
                      <p>{state.about.p2}</p>
                    </div>
                    <div className="glass rounded-[32px] md:rounded-[40px] p-2 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                      <img src={state.about.image} className="rounded-[28px] md:rounded-[36px] grayscale hover:grayscale-0 transition-all duration-1000 object-cover w-full aspect-[4/5]" alt="Company About" />
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/services" element={
               <div className="pt-32 md:pt-40 pb-24 container mx-auto px-6 text-white">
                 <div className="max-w-3xl mb-16 md:mb-20 text-center md:text-left">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 md:mb-8 animate-fadeInUp">전문 서비스</h1>
                    <p className="text-gray-400 text-base md:text-xl animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                      인정E&C는 각 분야별 전문 장비와 전용 약품을 사용하여 단순 청소를 넘어선 정밀 케어 서비스를 제공합니다.
                    </p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                   {state.services.map((s, idx) => (
                     <div key={s.id} id={s.id} className="glass p-1 rounded-[32px] md:rounded-[48px] group animate-fadeInUp" style={{animationDelay: `${0.1 * idx}s`}}>
                       <div className="aspect-[16/10] overflow-hidden rounded-[28px] md:rounded-[44px] mb-8 md:mb-10">
                         <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                       </div>
                       <div className="px-6 md:px-10 pb-12 md:pb-16">
                         <div className="flex items-center gap-4 mb-4 md:mb-6">
                            <span className="w-10 md:w-12 h-1 bg-[#8B5CF6]"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#8B5CF6]">Premium Service 0{idx + 1}</span>
                         </div>
                         <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 group-hover:text-[#8B5CF6] transition-colors">{s.title}</h3>
                         <p className="text-gray-400 text-sm md:text-lg leading-relaxed">{s.description}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            } />
            <Route path="/portfolio" element={
              <div className="pt-32 md:pt-40 pb-24 container mx-auto px-6 text-white">
                <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
                  <h1 className="text-4xl sm:text-6xl font-black mb-6 md:mb-8 animate-fadeInUp">시공 사례</h1>
                  <p className="text-gray-500 text-sm md:text-base animate-fadeInUp" style={{animationDelay: '0.2s'}}>현장에서 직접 증명한 인정E&C의 퀄리티를 확인하세요.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {state.portfolio.map((p, idx) => (
                    <div key={p.id} className="group cursor-pointer animate-fadeInUp" style={{animationDelay: `${0.1 * idx}s`}}>
                      <div className="glass rounded-[28px] md:rounded-[32px] overflow-hidden p-1 mb-6 md:mb-8">
                        <div className="aspect-square overflow-hidden rounded-[24px] md:rounded-[28px] relative">
                          <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#8B5CF6] flex items-center justify-center purple-glow">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                             </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 md:px-4">
                        <span className="text-[#8B5CF6] text-[10px] md:text-xs font-black tracking-widest uppercase mb-2 md:mb-3 block">{p.category}</span>
                        <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 group-hover:text-[#8B5CF6] transition-colors">{p.title}</h3>
                        <p className="text-gray-500 text-xs md:text-sm mb-4 line-clamp-2">{p.description}</p>
                        <p className="text-[10px] text-gray-700 font-bold uppercase tracking-tighter">{p.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            } />
            <Route path="/contact" element={<Contact settings={state.settings} />} />
            <Route path="/admin" element={
              <Admin 
                state={state} 
                updateSettings={updateSettings} 
                updateServices={updateServices} 
                updatePortfolio={updatePortfolio}
                updateAbout={updateAbout}
              />
            } />
          </Routes>
        </main>
        <Footer settings={state.settings} />
      </div>
    </Router>
  );
};

export default App;
