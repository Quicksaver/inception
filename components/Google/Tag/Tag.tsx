'use client';

import Script from 'next/script';
import { useEffect, useMemo } from 'react';

import useConsent from 'hooks/useConsent';
import useSiteSettings from 'hooks/useSiteSettings';

interface WindowWithGoogleTag extends Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
}
declare const window: WindowWithGoogleTag;

// These may come from external/third-party/browser libraries, make sure we don't override.
const _gtag = (typeof window !== 'undefined' ? window.gtag : undefined) || null;
const dataLayer = (typeof window !== 'undefined' ? window.dataLayer : undefined) || [];

export function gtag() {
  // gtag expects an instance of Arguments (for some reason), not an array, which a spread of arguments would create.
  // eslint-disable-next-line prefer-rest-params
  const args = arguments;

  if (_gtag) {
    _gtag(...args);
  }
  else {
    dataLayer.push(args);
  }
}

// Expose to the global scope, as is expected of standard gtag implementations.
if (typeof window !== 'undefined') {
  window.dataLayer = dataLayer;
  window.gtag = gtag;

  // Order is important! This is meant to be the very first entry in dataLayer.
  // @ts-expect-error we cannot type function arguments due to the arguments restriction above.
  gtag('js', new Date());
}

// Keep this as a global object. In case where the GoogleTag component is unmounted (even though it should never be), we
// still want to keep track of whether we have sent a first consent call during this browsing session, as a second one
// would not take effect; we can only update from then on.
let consentModeSet = false;

export default function GoogleTag() {
  const { gtagId, gtmId } = useSiteSettings();
  const consent = useConsent();

  // Order is important! These must be sent before any `config` or `event` calls.
  useEffect(() => {
    const consentType = consentModeSet ? 'update' : 'default';

    // @ts-expect-error we cannot type function arguments due to the arguments restriction above.
    gtag('consent', consentType, {
      ad_personalization: (consent.ads ? 'granted' : 'denied'),
      ad_storage: (consent.ads ? 'granted' : 'denied'),
      ad_user_data: (consent.ads ? 'granted' : 'denied'),
      analytics_storage: (consent.analytics ? 'granted' : 'denied'),
    });

    // Note that there is no need to resend events from the dataLayer, as they are automatically reprocessed by
    // analytics after the user grants permission (this is not reflected in the realtime views, only later in the
    // reports).

    consentModeSet = true;
  }, [ consent.ads, consent.analytics ]);

  const gtagIds = useMemo(
    () => gtagId?.split(',') || [],
    [ gtagId ],
  );

  // Order is important! This must be sent after the first `consent` call with `default` values.
  useEffect(() => {
    // @ts-expect-error we cannot type function arguments due to the arguments restriction above.
    gtagIds.forEach(id => gtag('config', id));
  }, [ gtagIds ]);

  return (
    <>
      { !!gtagIds[0] && (
        <Script
          async
          id="gtag-src"
          src={ `https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}` }
        />
      ) }

      { !!gtmId && (
        <Script id="gtm">
          { `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');` }
        </Script>
      ) }
    </>
  );
}
