import posthog from 'posthog-js';

import cookieConsent from 'utils/cookieConsent';

try {
  if (
    process.env.NEXT_PUBLIC_POSTHOG_KEY
    && process.env.NEXT_PUBLIC_POSTHOG_PATH
    && process.env.NEXT_PUBLIC_POSTHOG_REGION
  ) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_PATH,
      cookieless_mode: 'on_reject',
      defaults: '2025-05-24',
      ui_host: `https://${process.env.NEXT_PUBLIC_POSTHOG_REGION}.posthog.com`,
    });

    const onConsent = async () => {
      const consent = await cookieConsent.read();
      if (!consent) {
        return;
      }

      if (consent.analytics) {
        posthog.opt_in_capturing();
      }
      else {
        posthog.opt_out_capturing();
      }
    };

    void onConsent();
    cookieConsent.listen(() => {
      void onConsent();
    });
  }
}
catch (error) {
  // eslint-disable-next-line no-console
  console.error(error);
}
