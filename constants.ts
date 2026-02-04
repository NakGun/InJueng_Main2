import { ServiceItem, PortfolioItem, SiteSettings } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: "인정E&C",
  slogan: "공간의 가치를 더하는 전문 위생 솔루션",
  phone: "010-3657-0526",
  email: "ijeng725@gmail.com",
  address: "경기도 성남시 중원구 산성대로 106, 3층 A389호",
  formspreeUrl: "https://formspree.io/f/xnjzrgaq",
  primaryColor: "#8B5CF6"
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "ac-cleaning",
    title: "에어컨 분해 정밀 세척",
    description: "천장형(4Way, 1Way), 스탠드, 벽걸이 등 모든 기종을 완전 분해하여 내부 곰팡이와 미세먼지를 완벽하게 제거합니다. 전문 세척 가드를 사용하여 주변 오염 없이 깔끔하게 시공합니다.",
    // 사용자가 제공한 전문 세척 가드 시공 사진과 유사한 고해상도 이미지 적용
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
    icon: "ac"
  },
  {
    id: "building-cleaning",
    title: "건물 외벽 및 유리창 관리",
    description: "고압 세척 및 전용 약품을 사용하여 건물의 가치를 보존하고 품격을 높입니다. 정기적인 외벽 관리는 건물의 수명을 연장시킵니다.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "office-cleaning",
    title: "사무실 및 상가 정기 관리",
    description: "쾌적한 업무 환경을 위한 맞춤형 클리닝 프로세스를 제공합니다. 주간/야간 정기 방문을 통해 최상의 위생 상태를 유지해 드립니다.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "special-cleaning",
    title: "특수 오염 및 준공 청소",
    description: "화재 복구, 폐기물 처리, 신축 건물 준공 청소 등 일반적인 방법으로 해결되지 않는 고난도의 특수 현장 관리를 수행합니다.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    title: "성남 판교 오피스 빌딩 에어컨 일괄 세척",
    category: "에어컨 세척",
    description: "대형 오피스 빌딩 150대 규모의 천장형 에어컨 완전 분해 정밀 세척 완료.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
    date: "2024-03-15"
  },
  {
    id: "p2",
    title: "분당 주상복합 외벽 고압 세척",
    category: "외벽 관리",
    description: "장기 방치된 외벽 오염 제거 및 특수 코팅 작업을 통한 외관 복원.",
    image: "https://images.unsplash.com/photo-1545458818-e39396389717?q=80&w=2070&auto=format&fit=crop",
    date: "2024-02-28"
  },
  {
    id: "p3",
    title: "강남 테헤란로 공유오피스 정기 관리",
    category: "정기 관리",
    description: "입주사 만족도를 높이기 위한 프리미엄 정기 위생 관리 서비스 체결.",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=2070&auto=format&fit=crop",
    date: "2024-01-10"
  }
];
