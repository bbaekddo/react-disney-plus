/**
 * Firebase 초기화 및 공용 서비스 제공자
 *
 * - 앱은 단 한 번만 초기화됩니다.
 * - 환경변수는 Vite 형식(VITE_*)을 사용합니다.
 */
import { getApp, getApps, initializeApp } from "firebase/app";
import { Auth, GoogleAuthProvider, getAuth } from "firebase/auth";

/**
 * Firebase 서비스 타입 정의
 */
interface FirebaseServices {
  readonly auth: Auth;
  readonly provider: GoogleAuthProvider;
}

/**
 * 환경변수에서 Firebase 설정을 읽어옵니다.
 * 값이 비어있으면 런타임에서 에러를 던져 빠르게 문제를 발견할 수 있게 합니다.
 */
const requiredEnv = (key: string): string => {
  const value: string | undefined = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const firebaseConfig = {
  apiKey: requiredEnv("REACT_APP_FIREBASE_API_KEY"),
  authDomain: requiredEnv("REACT_APP_FIREBASE_AUTH_DOMAIN"),
  projectId: requiredEnv("REACT_APP_FIREBASE_PROJECT_ID"),
  storageBucket: requiredEnv("REACT_APP_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: requiredEnv("REACT_APP_FIREBASE_MESSAGING_SENDER_ID"),
  appId: requiredEnv("REACT_APP_FIREBASE_APP_ID"),
} as const;

/**
 * 앱 단일 초기화 보장
 */
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

/**
 * 공용 서비스 인스턴스
 */
const auth: Auth = getAuth(app);
const provider: GoogleAuthProvider = new GoogleAuthProvider();

const firebaseServices: FirebaseServices = { auth, provider } as const;

export default firebaseServices;
