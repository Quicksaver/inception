'use client';

import { use } from 'react';
import { create } from 'zustand';

import cookieConsent, { type Consent } from 'utils/cookieConsent';

const useInternalState = create<Consent | null | undefined>(set => {
  cookieConsent.listen(consent => set(consent));

  return undefined;
});

export async function saveConsent(newConsent: Consent) {
  const consent = {
    ...useInternalState.getState(),
    ...newConsent,
  };

  await cookieConsent.save(consent);
  useInternalState.setState(consent);
}

const defaultConsent = cookieConsent.read();
const emptyConsent = {} as Consent;

export default function useConsent() {
  let consent = useInternalState();

  if (consent === undefined) {
    consent = use(defaultConsent);
    useInternalState.setState(consent);
  }

  return consent || emptyConsent;
}
