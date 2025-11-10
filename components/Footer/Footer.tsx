import Container from 'components/Container';
import FooterNavigation from 'components/Footer/Navigation';
import Link from 'components/Link';
import Logo from 'components/Logo';

import { getSiteSettings } from 'utils/siteSettings';

import './Footer.scss';

export default async function Footer() {
  const { footerMessage } = await getSiteSettings();

  return (
    <footer className="footer">
      <Container>
        <div className="footer__navigation">
          <Link
            className="footer__link-home"
            href="/"
            title="Home"
          >
            <Logo />
          </Link>

          <div className="footer__divider" />

          <FooterNavigation />
        </div>

        <div className="footer__divider" />

        <div className="footer__copyright">
          { footerMessage }
        </div>
      </Container>
    </footer>
  );
}
