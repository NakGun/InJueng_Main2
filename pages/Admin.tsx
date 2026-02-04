
import React, { useState } from 'react';
import { AppState, SiteSettings } from '../types';

interface AdminProps {
  state: AppState;
  updateSettings: (newSettings: SiteSettings) => void;
}

const Admin: React.FC<AdminProps> = ({ state, updateSettings }) => {
  const [form, setForm] = useState<SiteSettings>(state.settings);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      updateSettings(form);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
  };

  return (
    <div className="pt-32 pb-24 bg-[#080808] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2">관리자 대시보드</h1>
            <p className="text-gray-500">웹사이트의 핵심 설정 및 콘텐츠를 실시간으로 변경합니다.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className={`px-10 py-4 rounded-xl font-bold transition-all ${saveStatus === 'saved' ? 'bg-green-600' : 'bg-[#8B5CF6] hover:bg-[#7C3AED]'} purple-glow disabled:opacity-50`}
          >
            {saveStatus === 'saving' ? '저장 중...' : saveStatus === 'saved' ? '저장 완료!' : '설정 저장하기'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Config */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-8 border-b border-white/10 pb-4">기본 정보 설정</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">회사 이름</label>
                  <input 
                    value={form.companyName} 
                    onChange={(e) => setForm({...form, companyName: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-[#8B5CF6] transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">대표 연락처</label>
                  <input 
                    value={form.phone} 
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-[#8B5CF6] transition-colors" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">메인 슬로건</label>
                  <input 
                    value={form.slogan} 
                    onChange={(e) => setForm({...form, slogan: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-[#8B5CF6] transition-colors" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">사업장 주소</label>
                  <input 
                    value={form.address} 
                    onChange={(e) => setForm({...form, address: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-[#8B5CF6] transition-colors" 
                  />
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-8 border-b border-white/10 pb-4">시공 사례(CMS) 미리보기</h3>
              <div className="space-y-4">
                {state.portfolio.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                    <img src={item.image} className="w-16 h-12 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.category} | {item.date}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
                <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-500 hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  새 사례 추가하기
                </button>
              </div>
            </div>
          </div>

          {/* Side Panels */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-lg font-bold mb-6">시스템 요약</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                  <p className="text-xs text-gray-400 mb-1">이번 달 견적 문의</p>
                  <p className="text-2xl font-black text-[#8B5CF6]">42 건</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">전체 게시물</p>
                  <p className="text-2xl font-black">{state.portfolio.length} 개</p>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl">
              <h3 className="text-lg font-bold mb-6">디자인 테마</h3>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-widest">포인트 컬러</label>
                <div className="flex gap-4">
                  <button className="w-10 h-10 rounded-full bg-[#8B5CF6] ring-4 ring-[#8B5CF6]/20"></button>
                  <button className="w-10 h-10 rounded-full bg-blue-600 hover:ring-4 hover:ring-blue-600/20"></button>
                  <button className="w-10 h-10 rounded-full bg-emerald-600 hover:ring-4 hover:ring-emerald-600/20"></button>
                  <button className="w-10 h-10 rounded-full bg-orange-600 hover:ring-4 hover:ring-orange-600/20"></button>
                </div>
                <p className="mt-4 text-[10px] text-gray-600">컬러 변경 시 전체 사이트의 강조색이 일괄 적용됩니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
