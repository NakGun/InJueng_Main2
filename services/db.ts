
import { AppState } from '../types';
import { INITIAL_SETTINGS, INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_ABOUT } from '../constants';

const DB_KEY = 'injeng_ec_cloud_db_v2';

class DatabaseService {
  private static instance: DatabaseService;
  
  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // 실제 온라인 DB에서 데이터를 가져오는 것을 시뮬레이션 (네트워크 지연 추가)
  async fetchState(): Promise<AppState> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const saved = localStorage.getItem(DB_KEY);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            // 필드 누락 방지 (마이그레이션)
            if (!parsed.about) parsed.about = INITIAL_ABOUT;
            resolve(parsed);
          } catch (e) {
            console.error("DB Parse Error", e);
            resolve(this.getDefaultState());
          }
        } else {
          resolve(this.getDefaultState());
        }
      }, 1200); // 1.2초 로딩 시뮬레이션
    });
  }

  // 온라인 DB에 데이터를 저장하는 것을 시뮬레이션
  async saveState(state: AppState): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          localStorage.setItem(DB_KEY, JSON.stringify(state));
          console.log("Cloud DB Synced Success");
          resolve(true);
        } catch (e) {
          console.error("Cloud DB Sync Failed", e);
          resolve(false);
        }
      }, 800);
    });
  }

  private getDefaultState(): AppState {
    return {
      settings: INITIAL_SETTINGS,
      services: INITIAL_SERVICES,
      portfolio: INITIAL_PORTFOLIO,
      about: INITIAL_ABOUT
    };
  }
}

export const db = DatabaseService.getInstance();
