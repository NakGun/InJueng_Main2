
import { AppState } from '../types';
import { INITIAL_SETTINGS, INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_ABOUT } from '../constants';

const DB_KEY = 'injeng_ec_local_db_v3';

class DatabaseService {
  private static instance: DatabaseService;
  
  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // 로컬 컴퓨터 DB에서 데이터를 가져오는 함수
  async fetchState(): Promise<AppState> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const saved = localStorage.getItem(DB_KEY);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            // 버전 업데이트 시 누락될 수 있는 필드들 기본값 채워줌 (하위 호환성)
            const sanitized = {
              settings: { ...INITIAL_SETTINGS, ...parsed.settings },
              services: parsed.services || INITIAL_SERVICES,
              portfolio: parsed.portfolio || INITIAL_PORTFOLIO,
              about: { ...INITIAL_ABOUT, ...parsed.about }
            };
            resolve(sanitized);
          } catch (e) {
            console.error("DB 로딩 에러:", e);
            resolve(this.getDefaultState());
          }
        } else {
          resolve(this.getDefaultState());
        }
      }, 800);
    });
  }

  // 로컬 컴퓨터 DB에 데이터를 영구 저장하는 함수
  async saveState(state: AppState): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        // 즉시 동기화
        localStorage.setItem(DB_KEY, JSON.stringify(state));
        console.log("로컬 DB 저장 완료");
        setTimeout(() => resolve(true), 500);
      } catch (e) {
        console.error("로컬 DB 저장 실패:", e);
        resolve(false);
      }
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
