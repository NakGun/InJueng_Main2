
import { AppState } from '../types';
import { INITIAL_SETTINGS, INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_ABOUT } from '../constants';

const LOCAL_STORAGE_KEY = 'injeng_ec_cache';
const CLOUD_API_URL = 'https://api.npoint.io/46e4b9868e64c2d334e3'; // 예시용 공개 JSON 저장소 (실제 운영 시 전용 DB 권장)

class DatabaseService {
  private static instance: DatabaseService;
  private fileHandle: any = null;
  
  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // 1. 온라인 데이터 가져오기 (방문사용자용)
  async fetchState(): Promise<AppState> {
    try {
      // 먼저 온라인 클라우드에서 최신 데이터를 가져옵니다.
      const response = await fetch(CLOUD_API_URL);
      if (response.ok) {
        const data = await response.json();
        console.log("Cloud DB 로드 완료");
        return this.sanitizeState(data);
      }
    } catch (e) {
      console.warn("Cloud DB 로드 실패, 로컬 캐시 사용:", e);
    }

    // 클라우드 실패 시 브라우저 캐시 확인
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) return this.sanitizeState(JSON.parse(cached));

    return this.getDefaultState();
  }

  // 2. 내 컴퓨터의 로컬 파일 연결하기 (관리자용)
  async connectLocalFile(): Promise<boolean> {
    try {
      // @ts-ignore - 브라우저 파일 시스템 API 사용
      const [handle] = await window.showOpenFilePicker({
        types: [{
          description: 'JSON Database File',
          accept: { 'application/json': ['.json'] },
        }],
      });
      this.fileHandle = handle;
      return true;
    } catch (e) {
      console.error("파일 연결 취소 또는 에러:", e);
      return false;
    }
  }

  // 3. 로컬 파일 및 온라인 클라우드 동시 저장
  async saveState(state: AppState): Promise<boolean> {
    try {
      // A. 브라우저 캐시 저장
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));

      // B. 내 컴퓨터의 로컬 파일에 직접 쓰기 (연결되어 있다면)
      if (this.fileHandle) {
        const writable = await this.fileHandle.createWritable();
        await writable.write(JSON.stringify(state, null, 2));
        await writable.close();
        console.log("로컬 파일 시스템 동기화 완료");
      }

      // C. 온라인 클라우드 저장 (다른 사람들이 볼 수 있게 반영)
      // 실제 운영 환경에서는 유료 DB나 API 서버의 PUT 요청으로 처리됩니다.
      await fetch(CLOUD_API_URL, {
        method: 'POST', // npoint 등 저장소 서비스에 따라 메서드가 다를 수 있음
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });

      console.log("온라인 클라우드 배포 완료");
      return true;
    } catch (e) {
      console.error("저장 중 오류 발생:", e);
      return false;
    }
  }

  // 데이터 무결성 검사
  private sanitizeState(parsed: any): AppState {
    return {
      settings: { ...INITIAL_SETTINGS, ...(parsed.settings || {}) },
      services: parsed.services || INITIAL_SERVICES,
      portfolio: parsed.portfolio || INITIAL_PORTFOLIO,
      about: { ...INITIAL_ABOUT, ...(parsed.about || {}) }
    };
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
