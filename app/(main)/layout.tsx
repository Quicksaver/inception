import type { Metadata } from 'next';
import { Roboto_Mono as RobotoMono } from 'next/font/google';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import ButtonCloseToast from 'components/Button/Close/Toast';
import CookiesBanner from 'components/CookiesBanner';
import Footer from 'components/Footer';
import GoogleTag from 'components/Google/Tag';
import Header from 'components/Header';
import ModalRenderer from 'components/Modal/Renderer';
import SiteSettings from 'components/SiteSettings/SiteSettings';

import getBaseUrl from 'utils/getBaseUrl';
import { getSiteSettings } from 'utils/siteSettings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const robotoMono = RobotoMono({
  display: 'swap',
  subsets: [ 'latin' ],
});

export async function generateMetadata(): Promise<Metadata> {
  const {
    description, shareimage, tagline, title,
  } = await getSiteSettings();

  return {
    description,
    metadataBase: new URL(getBaseUrl()),
    openGraph: shareimage.asset?.url
      ? {
        images: [ shareimage.asset.url ],
      }
      : undefined,
    title: {
      default: `${title} - ${tagline}`,
      template: `%s | ${title}`,
    },
  };
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await getSiteSettings();

  return (
    <>
      { /* SiteSettings should be the first component to render, in order to load up the siteSettings object
          before anything uses it, as to not block rendering of other components for an excessive amount of time. */ }
      <SiteSettings siteSettings={ siteSettings } />

      <head>
        <Suspense>
          <GoogleTag />
        </Suspense>
      </head>

      <body>
        <Suspense>
          <Header />
        </Suspense>

        <Suspense>
          { children }
        </Suspense>

        <Suspense>
          <Footer />
        </Suspense>

        <Suspense>
          <CookiesBanner />
          <ModalRenderer />
          <ToastContainer
            closeButton={ ButtonCloseToast }
            draggable
          />
        </Suspense>
      </body>
    </>
  );
}
