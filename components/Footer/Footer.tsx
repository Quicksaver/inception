import Container from 'components/Container';
import FooterNavigation from 'components/Footer/Navigation';
import Link from 'components/Link';
import Logo from 'components/Logo';
import OrnamentText2 from 'components/Ornament/Text2';

import { getSiteSettings } from 'utils/siteSettings';

import './Footer.scss';

export default async function Footer() {
  const { footerMessage } = await getSiteSettings();

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
        </div>

        <FooterNavigation />
        <OrnamentText2 />

        <div className="footer__copyright">
          { footerMessage }
        </div>
      </Container>
    </footer>
  );
}
