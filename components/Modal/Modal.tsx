import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { isValidElement, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ButtonClose from 'components/Button/Close';

import useModal, {
  getModal,
  type Modal,
  type ModalComponent,
  ModalContext,
  type ModalFC,
  type ModalMethods,
  type ModalParamsObject,
  type ModalProps,
  setModal,
} from 'hooks/useModal';

import './Modal.scss';

export default function Modal({
  children = null,
  className = '',
  close,
  description = undefined,
  noClose = false,
  size = '',
  title = undefined,
}: ModalMethods & ModalProps & {
  children?: ReactNode;
  className?: (() => string) | string;
  noClose?: boolean;
}) {
  const handleOutsideEvent = useCallback((event: Event) => {
    if (noClose) {
      event.preventDefault();
    }
  }, [ noClose ]);

  return (
    <DialogPrimitive.Root
      onOpenChange={ isOpen => {
        if (!isOpen && !noClose) {
          close();
        }
      } }
      open
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={ clsx('modal', className, {
            [`modal--${size}`]: size,
          }) }
        >
          <DialogPrimitive.Content
            className="modal__content"
            onEscapeKeyDown={ handleOutsideEvent }
            onInteractOutside={ handleOutsideEvent }
            onPointerDownOutside={ handleOutsideEvent }
          >
            { !noClose && (
              <DialogPrimitive.Close asChild>
                <ButtonClose />
              </DialogPrimitive.Close>
            ) }

            { !!title && (
              <DialogPrimitive.Title asChild={ isValidElement(title) }>
                { title }
              </DialogPrimitive.Title>
            ) }

            { !!description && (
              <DialogPrimitive.Description asChild={ isValidElement(description) }>
                { description }
              </DialogPrimitive.Description>
            ) }

            { children }
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function wrapModal<T extends Modal>(
  WrappedComponent: FC<T>,
  params?: ModalProps & {
    onClose?: () => Partial<T>;
  },
) {
  const modal: Modal = {
    Component: ((({ props }) => {
      const _state = (useModal(modal.Component) || {}) as T;

      return (
        <ModalContext.Provider value={ _state }>
          <Modal
            close={ modal.close }
            open={ modal.open }
            update={ modal.update }
            {
              ...Object.entries(params || {})
                .reduce<ModalProps>((acc, [ key, value ]) => {
                  if (![ 'onClose' ].includes(key)) {
                    const propKey = key as keyof ModalProps;

                    // @ts-expect-error we are already filtering the valid keys
                    acc[propKey] = value as ModalProps[typeof propKey];
                  }
                  return acc;
                }, {}) }
            {
              ...[ 'className', 'description', 'size', 'title' ]
                .reduce<ModalProps>((acc, key) => {
                  if (props?.[key] !== undefined) {
                    // @ts-expect-error we are already filtering the valid keys
                    acc[key] = props[key];
                  }
                  else if (params && params[key as keyof ModalProps] !== undefined) {
                    // @ts-expect-error we are already filtering the valid keys
                    acc[key] = params[key as keyof ModalProps];
                  }
                  return acc;
                }, {})
            }
          >
            <WrappedComponent
              { ...params }
              { ...props }
              { ..._state }
              { ..._state.props }
              key={ _state.key || '' }
            />
          </Modal>
        </ModalContext.Provider>
      );
    }) as ModalFC) as ModalComponent,
    key: uuidv4(),
    props: null,

    open: props => {
      setModal({
        ...modal,
        isOpen: true,
        props,
      });
    },

    update: (props: ModalParamsObject) => {
      setModal({
        ...modal,
        isOpen: true,
        props: {
          ...getModal(modal.Component)?.props,
          ...props,
        },
      });
    },

    close: () => {
      setModal({
        ...modal,
        isOpen: false,
        props: null,
        ...(params?.onClose?.() || {}),
      });
    },
  };

  modal.Component.close = modal.close;
  modal.Component.open = modal.open;

  setModal(modal);

  return modal.Component;
}
