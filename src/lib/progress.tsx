import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface Progress {
  konsep: boolean;
  simulasi: boolean;
  eksperimen: boolean;
  quiz: number; // 0..100
  soal: boolean;
  level1: boolean;
  level2: boolean;
  level3: boolean;
}

const DEFAULT: Progress = {
  konsep: false,
  simulasi: false,
  eksperimen: false,
  quiz: 0,
  soal: false,
  level1: false,
  level2: false,
  level3: false,
};

interface Ctx {
  progress: Progress;
  set: (patch: Partial<Progress>) => void;
  reset: () => void;
}

const ProgressContext = createContext<Ctx>({ progress: DEFAULT, set: () => {}, reset: () => {} });

const KEY = 'lingkaran-lab-progress-v1';

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return { ...DEFAULT, ...(JSON.parse(raw) as Partial<Progress>) };
    } catch {
      /* abaikan */
    }
    return DEFAULT;
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      /* abaikan */
    }
  }, [progress]);

  const set = (patch: Partial<Progress>) => setProgress((p) => ({ ...p, ...patch }));
  const reset = () => setProgress(DEFAULT);

  return <ProgressContext.Provider value={{ progress, set, reset }}>{children}</ProgressContext.Provider>;
}

export const useProgress = () => useContext(ProgressContext);
