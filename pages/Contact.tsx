
import React from 'react';
import { SiteSettings } from '../types';

interface ContactProps {
  settings: SiteSettings;
}

const Contact: React.FC<ContactProps> = ({ settings }) => {
  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-black mb-6">견적 및 상담 문의</h1>
          <p className="text-gray-400">전문 매니저가 내용을 검토 후 신속하게 연락드리겠습니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#8B5CF6]">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">대표 번호</p>
                    <p className="text-lg font-bold">{settings.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">이메일 문의</p>
                    <p className="text-lg font-bold">{settings.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">오시는 길</p>
                    <p className="text-lg font-bold leading-snug">{settings.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all border border-white/10 h-64 bg-gray-900 flex items-center justify-center">
              {/* Map Placeholder */}
              <div className="text-center p-6">
                <p className="text-gray-400 text-sm mb-4 italic">네이버/카카오 지도 API 영역</p>
                <a 
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(settings.address)}`} 
                  target="_blank" 
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs"
                >
                  지도로 보기
                </a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass p-8 md:p-12 rounded-[32px]">
            <form action={settings.formspreeUrl} method="POST" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">이름 / 업체명</label>
                  <input name="name" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8B5CF6] transition-colors" placeholder="홍길동" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">연락처</label>
                  <input name="phone" type="tel" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8B5CF6] transition-colors" placeholder="010-0000-0000" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">문의 서비스 선택</label>
                <select name="service_type" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8B5CF6] transition-colors">
                  <option className="bg-black">에어컨 분해 세척</option>
                  <option className="bg-black">건물 외벽 청소</option>
                  <option className="bg-black">사무실 정기 관리</option>
                  <option className="bg-black">기타 특수 청소</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">상세 문의 내용</label>
                <textarea name="message" rows={5} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8B5CF6] transition-colors" placeholder="현장 위치, 수량, 희망 일정 등 상세 내용을 적어주세요."></textarea>
              </div>

              <button type="submit" className="w-full py-5 bg-[#8B5CF6] text-white font-bold rounded-xl hover:bg-[#7C3AED] purple-glow transition-all">
                상담 신청하기
              </button>
              
              <p className="text-[10px] text-gray-600 text-center">
                개인정보 수집 및 이용에 동의하시면 위 버튼을 클릭하여 전송해주십시오.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
