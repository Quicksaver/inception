import Link from 'components/Link';

import features from 'utils/features';
import { getSiteSettings } from 'utils/siteSettings';

import './Navigation.scss';

export default async function FooterNavigation() {
  const { footerNavigation } = await getSiteSettings();

  const filteredItems = footerNavigation
    ?.map(item => ({
      ...item,
      links: item.links?.filter(({ featureFlag }) => {
        if (featureFlag && !features[featureFlag as keyof typeof features]) {
          return false;
        }

        return true;
      }),
    }))
    .filter(item => item.links?.length);

  return !!filteredItems?.length && (
    <nav className="footer-navigation">
      { filteredItems.map(({ label, links }) => (
        <div
          className="footer-navigation__block"
          key={ label }
        >
          <span className="footer-navigation__block-label">
            { label }
          </span>
          <menu>
            { links?.map(link => (
              <li
                className="footer-navigation__item"
                key={ link.label }
              >
                <Link
                  className="footer-navigation__link"
                  href={ link.path }
                >
                  { link.label }
                </Link>
              </li>
            )) }
          </menu>
        </div>
      )) }
    </nav>
  );
}
