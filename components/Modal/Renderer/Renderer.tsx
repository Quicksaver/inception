'use client';

import { useMemo } from 'react';

import {
  type Modal,
  useModals,
} from 'hooks/useModal';

const ModalRenderer = () => {
  const modals = useModals();
  const modalsArray = useMemo(() => [ ...modals.values() ], [ modals ]);

  return modalsArray
    .filter(modal => modal.isOpen)
    .map((modal: Modal) => {
      return (
        <modal.Component
          key={ modal.key }
          props={ modal.props }
        />
      );
    });
};

export default ModalRenderer;
