import Container from 'components/Container';
import FooterNavigation from 'components/Footer/Navigation';
import Image from 'components/Image';
import Link from 'components/Link';
import Logo from 'components/Logo';
import OrnamentText from 'components/Ornament/Text';
import SanityBody from 'components/Sanity/Body';
import SocialLinks from 'components/Social/Links';

import { getSiteSettings } from 'utils/siteSettings';

import './Footer.scss';

export default async function Footer() {
  const { disclaimerImages, disclaimerMessage, footerMessage } = await getSiteSettings();

  return (
    <footer className="footer">
      <Container>
        <div className="footer__brand">
          <Link
            className="footer__link-home"
            href="/"
            title="Home"
          >
            <Logo />
          </Link>
          <SocialLinks />
        </div>

        <FooterNavigation />

        <div className="footer__disclaimer">
          <OrnamentText />

          <div className="footer__disclaimer-images">
            { disclaimerImages.map(image => (
              <Image
                alt={ image.alt || 'Disclaimer Image' }
                className="footer__disclaimer-image"
                key={ image._key }
                src={ image }
              />
            )) }
          </div>
          <SanityBody>
            { disclaimerMessage }
          </SanityBody>
        </div>

        <OrnamentText />

        <div className="footer__copyright">
          { footerMessage }
        </div>
      </Container>
    </footer>
  );
}
