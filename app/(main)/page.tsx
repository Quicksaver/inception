import clsx from 'clsx';

import Container from 'components/Container';
import Image from 'components/Image';
import Logo from 'components/Logo';
import Main from 'components/Main';
import OrnamentEllipsis from 'components/Ornament/Ellipsis';
import SanityBody from 'components/Sanity/Body';

import { fetchAbout } from 'studio/queries/about';

import './page.scss';

const withImageSizes = [
  {
    condition: 'until-portrait' as const,
    size: '100vw' as const,
  },
  {
    condition: 'until-maxcontainer' as const,
    size: '41.5vw' as const,
  },
  { size: '484px' as const },
];

export default async function MainPage() {
  const about = await fetchAbout();

  if (!about) {
    return (
      <Main>
        <Container>
          <p>No content available.</p>
        </Container>
      </Main>
    );
  }

  return (
    <Main className="homepage">
      { about.sections?.map(section => {
        switch (section._type) {
          case 'editorial':
            return (
              <div
                className="homepage__section homepage__section--editorial"
                key={ section._key }
              >
                <Container>
                  <SanityBody>
                    { section.content }
                  </SanityBody>
                </Container>
              </div>
            );

          case 'simple':
            return (
              <Container
                className="homepage__section homepage__section--simple"
                key={ section._key }
              >
                <SanityBody>
                  { section.content }
                </SanityBody>
              </Container>
            );

          case 'twoColumns':
            return (
              <Container
                className="homepage__section homepage__section--two-columns"
                key={ section._key }
              >
                <SanityBody>
                  { section.leftColumn }
                </SanityBody>
                <SanityBody>
                  { section.rightColumn }
                </SanityBody>
              </Container>
            );

          case 'withImage':
            return (
              <Container
                className={ clsx('homepage__section', 'homepage__section--with-image', {
                  [`homepage__section--image-${section.imagePosition}`]: !!section.imagePosition,
                }) }
                key={ section._key }
              >
                <SanityBody>
                  { section.content }
                </SanityBody>
                <div className="homepage__section-image">
                  <div className="homepage__section-image-artifact-1" />
                  <div className="homepage__section-image-artifact-2" />
                  <div className="homepage__section-image-artifact-3" />

                  <Image
                    alt={ section.alt }
                    sizes={ withImageSizes }
                    src={ section.image }
                  />
                </div>
              </Container>
            );

          default:
            return null;
        }
      }) }

      { !!about.lastSection && (
        <Container className="homepage__section homepage__section--last">
          <div className="homepage__section-logo">
            <OrnamentEllipsis />
            <Logo />
          </div>

          <SanityBody>
            { about.lastSection }
          </SanityBody>
        </Container>
      ) }
    </Main>
  );
}
