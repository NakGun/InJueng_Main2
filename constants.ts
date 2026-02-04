
import { ServiceItem, PortfolioItem, SiteSettings, AboutContent } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: "인정E&C",
  slogan: "공간에 새로운 숨결을 불어넣는 전문 위생 솔루션",
  phone: "010-3657-0526",
  email: "ijeng725@gmail.com",
  address: "경기도 성남시 중원구 산성대로 106, 3층 A389호",
  formspreeUrl: "https://formspree.io/f/xnjzrgaq",
  primaryColor: "#8B5CF6"
};

export const INITIAL_ABOUT: AboutContent = {
  title: "인정E&C 소개",
  subtitle: "공간의 가치를 보존하는 최고의 기술력",
  p1: "인정E&C는 에어컨 정밀 세척부터 빌딩 종합 위생 관리까지, 보이지 않는 곳의 청결함이 고객의 삶의 질을 결정한다는 믿음으로 일합니다.",
  p2: "최첨단 내시경 장비와 친환경 세척 공법, 그리고 수만 건의 현장 경험을 보유한 숙련된 전문가 그룹이 당신의 공간을 책임집니다.",
  image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop"
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "ac-cleaning",
    title: "에어컨 분해 정밀 세척",
    description: "단순한 필터 청소를 넘어 냉각핀과 송풍팬까지 완전히 분해하여 살균합니다. 최첨단 내시경 장비로 보이지 않는 곳의 곰팡이와 박테리아를 99.9% 제거하여 맑은 공기를 되찾아드립니다.",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?q=80&w=2070&auto=format&fit=crop",
    icon: "ac"
  },
  {
    id: "waterproofing",
    title: "특수 방수 및 나노 코팅",
    description: "건물의 생명을 연장하는 프리미엄 방수 솔루션입니다. 나노 입자 코팅 공법을 통해 수분 침투를 완벽히 차단하며, 오염 방지 기능을 더해 관리의 편의성과 내구성을 극대화합니다.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "office-cleaning",
    title: "비즈니스 공간 정기 케어",
    description: "기업의 브랜드 가치를 높이는 쾌적한 업무 환경을 구축합니다. 바닥 왁싱, 정밀 먼지 제거, 공기 질 관리 등 체계적인 7단계 프로세스로 최상의 비즈니스 컨디션을 유지합니다.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "special-cleaning",
    title: "준공 및 대형 시설 위생관리",
    description: "신축 현장의 미세한 공사 분진 제거부터 대형 쇼핑몰, 병원 등 고난도 시설의 특수 청소를 수행합니다. 현장별 전용 장비와 친환경 약품을 사용하여 건강하고 깨끗한 입주를 돕습니다.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    title: "프리미엄 오피스 빌딩 종합 세척 프로젝트",
    category: "종합 위생 관리",
    description: "서울 소재 15층 규모 사옥의 전 층 에어컨 정밀 세척 및 공조 시스템 살균 작업을 성공적으로 완료하였습니다.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    date: "2024-05-12"
  },
  {
    id: "p2",
    title: "고급 주거 단지 지하주차장 방수 및 코팅",
    category: "특수 방수",
    description: "누수 문제가 발생한 대단지 아파트의 지하 구역에 최신 나노 방수 공법을 적용하여 문제를 근본적으로 해결했습니다.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop",
    date: "2024-04-28"
  },
  {
    id: "p3",
    title: "글로벌 IT 기업 연구소 정기 위생 케어",
    category: "정기 관리",
    description: "민감한 장비가 많은 연구실 환경에 맞춰 저소음/저자극 방식의 전문 위생 관리 계약을 체결하고 운영 중입니다.",
    image: "https://images.unsplash.com/photo-1558389186-438424b00a32?q=80&w=2070&auto=format&fit=crop",
    date: "2024-03-15"
  }
];
