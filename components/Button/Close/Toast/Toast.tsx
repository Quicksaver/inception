'use client';

import { CloseButtonProps } from 'react-toastify';

import ButtonClose from 'components/Button/Close';

export default function ButtonCloseToast({ closeToast }: CloseButtonProps) {
  return <ButtonClose onClick={ closeToast } />;
}
