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
    description: "천장형(4Way, 1Way), 스탠드, 벽걸이 등 모든 기종을 완전 분해하여 세척합니다. 전문 세척 가드를 설치하여 오염물 비산 없이 내부 곰팡이와 미세먼지를 99.9% 완벽 제거합니다.",
    image: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?q=80&w=2070&auto=format&fit=crop",
    icon: "ac"
  },
  {
    id: "waterproofing",
    title: "건물 바닥 및 천장 방수처리",
    description: "건물의 수명을 결정짓는 바닥 코팅 및 천장 방수 솔루션입니다. 누수 차단 및 내구성 강화를 위한 최첨단 공법을 사용하여 고질적인 누수 문제를 완벽하게 해결하고 자산 가치를 보존합니다.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "office-cleaning",
    title: "사무실 및 상가 정기 관리",
    description: "업무 효율을 높이는 쾌적한 비즈니스 환경을 유지해 드립니다. 바닥 왁싱, 먼지 제거 등 맞춤형 정기 관리 프로세스를 통해 최상의 청결도를 보장합니다.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "special-cleaning",
    title: "특수 오염 및 준공 청소",
    description: "신축 건물의 준공 청소부터 화재 복구, 폐기물 처리까지 고난도의 특수 현장을 전문 장비로 해결합니다. 까다로운 오염도 인정E&C가 하면 다릅니다.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    title: "판교 IT 밸리 사옥 에어컨 120대 세척",
    category: "에어컨 세척",
    description: "대형 오피스 전 구역 천장형 에어컨 완전 분해 및 살균 소독 작업 완료.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
    date: "2024-03-20"
  },
  {
    id: "p2",
    title: "성남 시청 인근 상가 외벽 복원 세척",
    category: "외벽 관리",
    description: "노후된 외벽의 찌든 때를 고압 세척으로 제거하고 코팅 작업 진행.",
    image: "https://images.unsplash.com/photo-1545458818-e39396389717?q=80&w=2070&auto=format&fit=crop",
    date: "2024-02-15"
  },
  {
    id: "p3",
    title: "정자동 대형 카페 정기 관리 계약",
    category: "정기 관리",
    description: "위생이 중요한 F&B 매장의 바닥 및 주방 정기 위생 케어 서비스.",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=2070&auto=format&fit=crop",
    date: "2024-01-05"
  }
];