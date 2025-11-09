import { create } from 'zustand';

interface HeaderMenuState {
  close: () => void;
  isOpen: boolean;
  open: () => void;
  toggle: () => void;
}

const useHeaderMenu = create<HeaderMenuState>(set => {
  return {
    close: () => set({ isOpen: false }),
    isOpen: false,
    open: () => set({ isOpen: true }),
    toggle: () => set(state => ({ isOpen: !state.isOpen })),
  };
});

export default useHeaderMenu;
