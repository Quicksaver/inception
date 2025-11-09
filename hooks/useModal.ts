'use client';

import { createContext, type ReactNode, useContext } from 'react';
import { create } from 'zustand';

export type ModalSize = '' | 'large' | 'small' | 'wide';

export interface ModalProps {
  className?: string;
  description?: ReactNode;
  size?: ModalSize;
  title?: ReactNode;
}

export interface ModalParamsObject extends ModalProps {
  [key: string]: unknown;
}

export type ModalParams = ModalParamsObject | null;

export interface ModalMethods {
  close: () => void;
  open: (props?: ModalParams) => void;
  update: (props: ModalParamsObject) => void;
}

export type ModalFC = React.FC<{ props?: ModalParams }>;

export type ModalComponent = ModalFC & ModalMethods;

export interface Modal extends ModalMethods {
  Component: ModalComponent;
  isOpen?: boolean;
  key: string;
  props?: ModalParams;
}

interface Modals {
  modals: Map<ModalComponent, Modal>;
}

const useInternalState = create<Modals>(() => ({ modals: new Map() }));

export const ModalContext = createContext<Modal | null>(null);

export function useModals() {
  return useInternalState(state => state.modals);
}

export default function useModal(Component?: ModalComponent) {
  // When not provided a component, attempt to get the state from the current modal's context.
  const context = useContext(ModalContext);
  const modals = useModals();

  if (!Component) {
    return context;
  }

  return modals.get(Component);
}

export function getModals() {
  return useInternalState.getState().modals;
}

export function setModal(modal: Modal) {
  useInternalState.setState(state => ({
    modals: new Map(state.modals).set(modal.Component, modal),
  }));
}

export function getModal(Component: ModalComponent) {
  return getModals().get(Component);
}
