
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
}

export interface SiteSettings {
  companyName: string;
  slogan: string;
  phone: string;
  email: string;
  address: string;
  formspreeUrl: string;
  primaryColor: string;
}

export interface AppState {
  settings: SiteSettings;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
}
