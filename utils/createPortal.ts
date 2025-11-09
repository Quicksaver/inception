import type { ReactNode } from 'react';
import { createPortal as reactDomCreatePortal } from 'react-dom';

const createPortal = (children: ReactNode, parent?: HTMLElement | null) => {
  if (typeof document === 'undefined') {
    return null;
  }

  return reactDomCreatePortal(children, parent ?? document.body);
};

export default createPortal;
