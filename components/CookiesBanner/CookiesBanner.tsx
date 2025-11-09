'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { create } from 'zustand';

import Button from 'components/Button';
import Container from 'components/Container';
import FormCheckbox from 'components/Form/Checkbox';

import { cookiesBanner } from 'content/config';
import useConsent, { saveConsent } from 'hooks/useConsent';
import useRendered from 'hooks/useRendered';
import useSiteSettings from 'hooks/useSiteSettings';

import './CookiesBanner.scss';

interface CookiesBannerState {
  screen: string;
  setScreen: (screen: string) => void;
}

const mandatoryKey = cookiesBanner.options.filter(([ , , mandatory ]) => mandatory).map(([ option ]) => option)[0];

export const useCookiesBannerState = create<CookiesBannerState>(set => {
  return {
    screen: 'banner',
    setScreen: (screen: string) => set({ screen }),
  };
});

export default function CookiesBanner() {
  const { cookieVersion } = useSiteSettings();
  const consent = useConsent();
  const rendered = useRendered();
  const [ options, setOptions ] = useState<{ [key: string]: boolean }>(
    cookiesBanner.options.reduce(
      (acc, [ option, , mandatory ]) => ({
        ...acc,
        [option]: consent[option] || mandatory || false,
      }),
      {},
    ),
  );

  const { screen, setScreen } = useCookiesBannerState();

  useEffect(() => {
    if (!screen && !consent[mandatoryKey]) {
      setScreen('banner');
    }
  }, [ consent, screen, setScreen ]);

  if (!rendered || !cookieVersion) {
    return null;
  }

  return (!consent[mandatoryKey] || screen === 'options') && (
    <section
      className={ clsx('cookies-banner', {
        'cookies-banner--show': screen,
      }) }
    >
      <Container className="cookies-banner__page-container">
        <div className="cookies-banner__content">
          <h5>{ cookiesBanner.title }</h5>
          <p>{ cookiesBanner.body }</p>

          { screen === 'options' && (
            <div className="cookies-banner__options">
              { cookiesBanner.options.map(([ option, label, mandatory ]) => (
                <FormCheckbox
                  checked={ options[option] }
                  disabled={ mandatory }
                  key={ option }
                  label={ label }
                  name={ `switch-${option}` }
                  onCheckedChange={ checked => setOptions({
                    ...options,
                    [option]: checked === true,
                  }) }
                />
              )) }
            </div>
          ) }
        </div>

        <div className="cookies-banner__btn-wrapper">
          { screen === 'banner' && (
            <Button
              className="cookies-banner__btn cookies-banner__btn--more"
              onClick={ () => setScreen('options') }
              theme="none"
            >
              More Options
            </Button>
          ) }

          { screen === 'banner' && (
            <Button
              className="cookies-banner__btn"
              onClick={ async () => {
                await saveConsent(
                  cookiesBanner.options.reduce(
                    (acc, [ option ]) => ({
                      ...acc,
                      [option]: true,
                    }),
                    {},
                  ),
                );
                setScreen('');
              } }
              theme="primary"
            >
              Accept All
            </Button>
          ) }

          { screen === 'options' && (
            <Button
              className="cookies-banner__btn"
              onClick={ async () => {
                await saveConsent(options);
                setScreen('');
              } }
              theme="primary"
            >
              Save Preferences
            </Button>
          ) }
        </div>
      </Container>
    </section>
  );
}
