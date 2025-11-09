import { create } from 'zustand';

export interface GlobalError {
  error: string;
}

type GlobalException = GlobalError | null;

export interface GlobalExceptionState {
  clearGlobalException: () => void;
  globalException: GlobalException;
  setGlobalException: (globalException: GlobalException) => void;
}

const useGlobalException = create<GlobalExceptionState>(set => ({
  clearGlobalException: () => set({ globalException: null }),
  globalException: null,
  setGlobalException: globalException => set({ globalException }),
}));

export default useGlobalException;
