import IconFacebook from 'components/Icon/Facebook';
import IconInstagram from 'components/Icon/Instagram';
import IconLinkedIn from 'components/Icon/LinkedIn';
import IconX from 'components/Icon/X';
import Link from 'components/Link';

import { getSiteSettings } from 'utils/siteSettings';

import './Links.scss';

const icons = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  linkedin: IconLinkedIn,
  x: IconX,
};

export default async function SocialLinks() {
  const { socials } = await getSiteSettings();

  return !!socials?.length && (
    <nav
      aria-label="Social media links"
      className="social-links"
    >
      { socials.map(({ platform, url }) => {
        const Icon = icons[platform];

        return (
          <Link
            className="social-links__link"
            href={ url }
            key={ platform }
            title={ platform }
          >
            <Icon />
          </Link>
        );
      }) }
    </nav>
  );
}
