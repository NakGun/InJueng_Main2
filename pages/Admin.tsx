
import React, { useState } from 'react';
import { AppState, SiteSettings, ServiceItem, PortfolioItem } from '../types';

interface AdminProps {
  state: AppState;
  updateSettings: (newSettings: SiteSettings) => void;
  updateServices: (newServices: ServiceItem[]) => void;
  updatePortfolio: (newPortfolio: PortfolioItem[]) => void;
}

const Admin: React.FC<AdminProps> = ({ state, updateSettings, updateServices, updatePortfolio }) => {
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(state.settings);
  const [servicesForm, setServicesForm] = useState<ServiceItem[]>(state.services);
  const [portfolioForm, setPortfolioForm] = useState<PortfolioItem[]>(state.portfolio);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      updateSettings(settingsForm);
      updateServices(servicesForm);
      updatePortfolio(portfolioForm);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
  };

  const handleServiceChange = (id: string, field: keyof ServiceItem, value: string) => {
    setServicesForm(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handlePortfolioChange = (id: string, field: keyof PortfolioItem, value: string) => {
    setPortfolioForm(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="pt-32 pb-24 bg-[#080808] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 text-white">관리자 대시보드</h1>
            <p className="text-gray-500">웹사이트의 모든 콘텐츠를 실시간으로 제어합니다.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className={`px-10 py-4 rounded-xl font-bold transition-all ${saveStatus === 'saved' ? 'bg-green-600' : 'bg-[#8B5CF6] hover:bg-[#7C3AED]'} purple-glow disabled:opacity-50 shadow-lg text-white`}
          >
            {saveStatus === 'saving' ? '저장 중...' : saveStatus === 'saved' ? '저장 완료!' : '모든 변경사항 저장'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            
            {/* 기본 정보 */}
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-8 border-b border-white/10 pb-4 flex items-center gap-2 text-white">
                <span className="w-2 h-6 bg-[#8B5CF6] rounded-full"></span> 기본 정보 설정
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">회사 이름</label>
                  <input 
                    value={settingsForm.companyName} 
                    onChange={(e) => setSettingsForm({...settingsForm, companyName: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#8B5CF6] outline-none transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">대표 연락처</label>
                  <input 
                    value={settingsForm.phone} 
                    onChange={(e) => setSettingsForm({...settingsForm, phone: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#8B5CF6] outline-none transition-colors" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">메인 슬로건</label>
                  <input 
                    value={settingsForm.slogan} 
                    onChange={(e) => setSettingsForm({...settingsForm, slogan: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#8B5CF6] outline-none transition-colors" 
                  />
                </div>
              </div>
            </div>

            {/* 서비스 관리 */}
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-8 border-b border-white/10 pb-4 flex items-center gap-2 text-white">
                <span className="w-2 h-6 bg-[#8B5CF6] rounded-full"></span> 주요 서비스 관리
              </h3>
              <div className="space-y-8">
                {servicesForm.map((service) => (
                  <div key={service.id} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <img src={service.image} className="w-full h-32 object-cover rounded-xl mb-3 border border-white/10" />
                        <input 
                          value={service.image} 
                          onChange={(e) => handleServiceChange(service.id, 'image', e.target.value)}
                          placeholder="이미지 URL"
                          className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white focus:border-[#8B5CF6] outline-none" 
                        />
                      </div>
                      <div className="flex-1 space-y-4">
                        <input 
                          value={service.title} 
                          onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#8B5CF6] outline-none font-bold" 
                        />
                        <textarea 
                          value={service.description} 
                          rows={3}
                          onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-400 focus:border-[#8B5CF6] outline-none" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 시공사례 관리 */}
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-8 border-b border-white/10 pb-4 flex items-center gap-2 text-white">
                <span className="w-2 h-6 bg-blue-500 rounded-full"></span> 시공사례(포트폴리오) 관리
              </h3>
              <div className="space-y-8">
                {portfolioForm.map((item) => (
                  <div key={item.id} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <img src={item.image} className="w-full h-40 object-cover rounded-xl mb-3 border border-white/10" />
                        <label className="block text-[10px] text-gray-500 mb-1">이미지 URL</label>
                        <input 
                          value={item.image} 
                          onChange={(e) => handlePortfolioChange(item.id, 'image', e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white focus:border-[#8B5CF6] outline-none" 
                        />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] text-gray-500 mb-1">시공명</label>
                            <input 
                              value={item.title} 
                              onChange={(e) => handlePortfolioChange(item.id, 'title', e.target.value)}
                              className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#8B5CF6] outline-none font-bold" 
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-gray-500 mb-1">카테고리</label>
                            <input 
                              value={item.category} 
                              onChange={(e) => handlePortfolioChange(item.id, 'category', e.target.value)}
                              className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-[#8B5CF6] focus:border-[#8B5CF6] outline-none" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-500 mb-1">시공 날짜</label>
                          <input 
                            value={item.date} 
                            onChange={(e) => handlePortfolioChange(item.id, 'date', e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-500 focus:border-[#8B5CF6] outline-none" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-500 mb-1">간략 설명</label>
                          <textarea 
                            value={item.description} 
                            rows={2}
                            onChange={(e) => handlePortfolioChange(item.id, 'description', e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-400 focus:border-[#8B5CF6] outline-none" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="space-y-8 text-white">
            <div className="glass p-8 rounded-3xl sticky top-32">
              <h3 className="text-lg font-bold mb-6">시스템 요약</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                  <p className="text-xs text-gray-400 mb-1">상태</p>
                  <p className="text-2xl font-black text-[#8B5CF6]">운영 중</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">서비스 항목</p>
                  <p className="text-2xl font-black">{servicesForm.length} 개</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">시공 사례</p>
                  <p className="text-2xl font-black">{portfolioForm.length} 개</p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-xs text-gray-500 leading-relaxed">
                  * 사진 변경: 이미지를 웹(구글 드라이브, 블로그 등)에 업로드 후 해당 이미지 주소를 복사하여 붙여넣으세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
