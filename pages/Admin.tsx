
import React, { useState, useEffect } from 'react';
import { AppState, SiteSettings, ServiceItem, PortfolioItem, AboutContent } from '../types';

interface AdminProps {
  state: AppState;
  onSaveAll: (newState: AppState) => Promise<void>;
}

const Admin: React.FC<AdminProps> = ({ state, onSaveAll }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 개별 폼 상태 관리
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(state.settings);
  const [servicesForm, setServicesForm] = useState<ServiceItem[]>(state.services);
  const [portfolioForm, setPortfolioForm] = useState<PortfolioItem[]>(state.portfolio);
  const [aboutForm, setAboutForm] = useState<AboutContent>(state.about);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // 외부(AppState)의 변화를 폼에 동기화 (저장 확인용)
  useEffect(() => {
    setSettingsForm(state.settings);
    setServicesForm(state.services);
    setPortfolioForm(state.portfolio);
    setAboutForm(state.about);
  }, [state]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '01056743549') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    
    // 현재 폼에 입력된 모든 데이터를 하나의 AppState 객체로 결합
    const updatedState: AppState = {
      settings: settingsForm,
      services: servicesForm,
      portfolio: portfolioForm,
      about: aboutForm
    };
    
    // 통합 저장 함수 호출 (App.tsx -> db.ts 로 연결됨)
    await onSaveAll(updatedState);
    
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleServiceChange = (id: string, field: keyof ServiceItem, value: string) => {
    setServicesForm(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handlePortfolioChange = (id: string, field: keyof PortfolioItem, value: string) => {
    setPortfolioForm(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleAddPortfolio = () => {
    const newItem: PortfolioItem = {
      id: `p${Date.now()}`,
      title: "새로운 시공 사례",
      category: "카테고리 입력",
      description: "시공에 대한 상세 설명을 입력하세요.",
      image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?q=80&w=2070&auto=format&fit=crop",
      date: new Date().toISOString().split('T')[0]
    };
    setPortfolioForm(prev => [newItem, ...prev]);
  };

  const handleDeletePortfolio = (id: string) => {
    if (window.confirm('이 시공 사례를 정말 삭제하시겠습니까?')) {
      setPortfolioForm(prev => prev.filter(p => p.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#8B5CF6] rounded-full blur-[150px] opacity-10"></div>
        <div className="glass p-12 rounded-[40px] w-full max-w-md relative z-10 text-center">
          <div className="w-16 h-16 bg-[#8B5CF6] rounded-2xl flex items-center justify-center text-white font-normal text-2xl mx-auto mb-8 shadow-xl shadow-[#8B5CF6]/30">
            <span style={{ fontFamily: "'Righteous', cursive" }}>IJ</span>
          </div>
          <h2 className="text-3xl font-black mb-2 text-white">Admin Access</h2>
          <p className="text-gray-500 mb-8 text-sm">관리자 비밀번호를 입력해주세요.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center focus:outline-none focus:border-[#8B5CF6] text-white transition-all tracking-[0.5em]"
              />
            </div>
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button 
              type="submit"
              className="w-full py-4 bg-[#8B5CF6] text-white font-bold rounded-2xl hover:bg-[#7C3AED] transition-all purple-glow"
            >
              접속하기
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-[#080808] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 text-white">관리자 대시보드</h1>
            <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${saveStatus === 'saving' ? 'bg-yellow-500 animate-ping' : 'bg-green-500'}`}></div>
               <p className="text-gray-500 text-sm">로컬 DB 상태: {saveStatus === 'saving' ? '데이터 동기화 중...' : '연결됨'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setIsAuthenticated(false)}
                className="px-6 py-4 text-xs font-bold text-gray-500 hover:text-white transition-colors"
              >
                로그아웃
              </button>
              <button 
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className={`px-10 py-4 rounded-xl font-bold transition-all flex items-center gap-3 ${saveStatus === 'saved' ? 'bg-green-600' : 'bg-[#8B5CF6] hover:bg-[#7C3AED]'} purple-glow disabled:opacity-50 shadow-lg text-white`}
              >
                {saveStatus === 'saving' && (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {saveStatus === 'saving' ? '내 컴퓨터에 저장 중...' : saveStatus === 'saved' ? '저장 완료!' : '수정사항 최종 반영'}
              </button>
          </div>
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

            {/* 회사소개 관리 */}
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-8 border-b border-white/10 pb-4 flex items-center gap-2 text-white">
                <span className="w-2 h-6 bg-green-500 rounded-full"></span> 회사소개(About) 관리
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">대제목</label>
                    <input 
                      value={aboutForm.title} 
                      onChange={(e) => setAboutForm({...aboutForm, title: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#8B5CF6] outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">소제목 (강조 문구)</label>
                    <textarea 
                      value={aboutForm.subtitle} 
                      rows={2}
                      onChange={(e) => setAboutForm({...aboutForm, subtitle: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#8B5CF6] outline-none transition-colors" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">대표 이미지 URL</label>
                      <img src={aboutForm.image} className="w-full h-48 object-cover rounded-xl border border-white/10 mb-4" />
                      <input 
                        value={aboutForm.image} 
                        onChange={(e) => setAboutForm({...aboutForm, image: e.target.value})}
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#8B5CF6] outline-none transition-colors" 
                      />
                   </div>
                   <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">문단 1</label>
                        <textarea 
                          value={aboutForm.p1} 
                          rows={4}
                          onChange={(e) => setAboutForm({...aboutForm, p1: e.target.value})}
                          className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-400 focus:border-[#8B5CF6] outline-none transition-colors" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">문단 2</label>
                        <textarea 
                          value={aboutForm.p2} 
                          rows={4}
                          onChange={(e) => setAboutForm({...aboutForm, p2: e.target.value})}
                          className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-400 focus:border-[#8B5CF6] outline-none transition-colors" 
                        />
                      </div>
                   </div>
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
                        <label className="block text-[10px] text-gray-500 mb-1">이미지 주소 (URL)</label>
                        <input 
                          value={service.image} 
                          onChange={(e) => handleServiceChange(service.id, 'image', e.target.value)}
                          placeholder="이미지 주소를 입력하세요"
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
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                  <span className="w-2 h-6 bg-blue-500 rounded-full"></span> 시공사례(포트폴리오) 관리
                </h3>
                <button 
                  onClick={handleAddPortfolio}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  시공 사례 추가
                </button>
              </div>
              
              <div className="space-y-8">
                {portfolioForm.length === 0 && (
                  <div className="text-center py-12 text-gray-500 border-2 border-dashed border-white/5 rounded-2xl">
                    등록된 시공 사례가 없습니다. 우측 상단 버튼을 눌러 추가하세요.
                  </div>
                )}
                {portfolioForm.map((item) => (
                  <div key={item.id} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4 relative group">
                    <button 
                      onClick={() => handleDeletePortfolio(item.id)}
                      className="absolute top-4 right-4 p-2 bg-red-600/20 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:text-white"
                      title="삭제"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <img src={item.image} className="w-full h-40 object-cover rounded-xl mb-3 border border-white/10" />
                        <label className="block text-[10px] text-gray-500 mb-1">이미지 주소 (URL)</label>
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
                  <p className="text-xs text-gray-400 mb-1">DB Connection</p>
                  <p className="text-2xl font-black text-[#8B5CF6]">Active</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Data Storage</p>
                  <p className="text-lg font-bold">Local Computer</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Data Volume</p>
                  <p className="text-lg font-bold">{(JSON.stringify(state).length / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-600/20 mb-4">
                  <p className="text-[11px] text-blue-400 font-bold mb-1 uppercase">중요 사항</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    상단의 <strong>수정사항 최종 반영</strong> 버튼을 누르면 현재 브라우저에 데이터가 영구히 저장됩니다. 이미지 URL이 정확한지 확인 후 저장해주세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
