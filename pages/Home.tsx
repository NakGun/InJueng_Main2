
import React from 'react';
import { Link } from 'react-router-dom';
import { AppState } from '../types';

interface HomeProps {
  state: AppState;
}

const Home: React.FC<HomeProps> = ({ state }) => {
  const { settings, services, portfolio } = state;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Animated Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B5CF6] rounded-full blur-[150px] opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-600 rounded-full blur-[120px] opacity-10"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h4 className="text-[#8B5CF6] text-xs md:text-sm font-semibold tracking-[0.3em] mb-6 animate-fadeInUp uppercase">Premium Cleaning Solution</h4>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 leading-[1.15] tracking-tight animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {settings.slogan.split(' ').map((word, i) => (
              <span key={i} className={word === '전문' || word === '위생' ? 'text-[#8B5CF6] text-glow' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-gray-400 text-base md:text-xl max-w-4xl mx-auto mb-12 animate-fadeInUp leading-relaxed" style={{ animationDelay: '0.4s' }}>
            에어컨 세척부터 대형 건물 관리까지, 전문가의 손길로 공간에 새로운 숨결을 불어넣습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <Link to="/contact" className="px-10 py-4 bg-[#8B5CF6] rounded-full font-bold hover:bg-[#7C3AED] purple-glow transition-all text-sm md:text-base">
              무료 견적 상담
            </Link>
            <Link to="/portfolio" className="px-10 py-4 border border-white/20 rounded-full font-bold hover:bg-white hover:text-black transition-all text-sm md:text-base">
              시공 사례 보기
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* Services Summary */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">주요 서비스</h2>
              <p className="text-gray-500 text-sm md:text-base">인정E&C만의 차별화된 위생 관리 기술을 경험하세요.</p>
            </div>
            <Link to="/services" className="hidden md:block text-[#8B5CF6] font-medium hover:underline">모든 서비스 보기 &rarr;</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group relative glass rounded-2xl overflow-hidden p-1">
                <div className="h-48 overflow-hidden rounded-t-xl">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#8B5CF6] transition-colors">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>
                  <Link to={`/services#${service.id}`} className="inline-flex items-center text-xs font-semibold uppercase tracking-wider group-hover:gap-2 transition-all">
                    자세히 보기 <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Link to="/services" className="md:hidden block mt-12 text-center py-4 border border-white/10 rounded-xl text-sm font-bold text-[#8B5CF6]">모든 서비스 보기 &rarr;</Link>
        </div>
      </section>

      {/* Recent Portfolio Highlight */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">최근 시공 사례</h2>
            <div className="w-20 h-1 bg-[#8B5CF6] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.slice(0, 3).map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-white text-sm font-medium">{item.category}</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-6">
          <div className="glass rounded-[32px] md:rounded-[40px] p-8 md:p-24 relative overflow-hidden text-center">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6] opacity-10 blur-[100px]"></div>
             <h2 className="text-2xl md:text-5xl font-black mb-8 leading-tight">당신의 공간을 더 가치 있게<br className="hidden md:block"/>지금 전문가와 상의하세요</h2>
             <p className="text-gray-400 text-sm md:text-lg mb-12 max-w-xl mx-auto">대량 세척 할인 및 관공서/기업 전용 유지보수 계약 상담이 가능합니다.</p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${settings.phone}`} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all text-sm">
                  전화 문의: {settings.phone}
                </a>
                <Link to="/contact" className="px-8 py-4 border border-[#8B5CF6] text-[#8B5CF6] font-bold rounded-full hover:bg-[#8B5CF6] hover:text-white transition-all text-sm">
                  온라인 상담 예약
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
