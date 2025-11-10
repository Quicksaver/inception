import Container from 'components/Container';
import Image from 'components/Image';
import Link from 'components/Link';
import Main from 'components/Main';
import SanityBody from 'components/Sanity/Body';

import { fetchAssociatedPartners } from 'studio/queries/associatedPartners';
import { fetchBeneficiaries } from 'studio/queries/beneficiaries';
import { fetchConsortium } from 'studio/queries/consortium';

import './page.scss';

export default async function ConsortiumPage() {
  const consortium = await fetchConsortium();
  const beneficiaries = await fetchBeneficiaries();
  const partners = await fetchAssociatedPartners();

  return (
    <Main className="consortium-page">
      { consortium && (
        <Container className="consortium-page__section">
          <h1>{ consortium.title }</h1>
          <SanityBody>
            { consortium.content }
          </SanityBody>
        </Container>
      ) }

      { beneficiaries.length > 0 && (
        <Container
          as="section"
          className="consortium-page__section consortium-page__beneficiaries"
        >
          <h2>Beneficiaries</h2>
          <div className="consortium-page__beneficiaries-list">
            { }
            { beneficiaries.map(item => (
              <div
                className="consortium-page__beneficiary"
                key={ item.title }
              >
                { item.images.length > 0 && (
                  <div className="consortium-page__beneficiary-images">
                    { item.images.map((image, idx) => (
                      <Image
                        alt={ item.title || 'Beneficiary image' }
                        // eslint-disable-next-line react/no-array-index-key
                        key={ idx }
                        src={ image }
                      />
                    )) }
                  </div>
                ) }
                <div className="consortium-page__beneficiary-content">
                  <Link href={ item.link || '' }>
                    <h3>{ item.title }</h3>
                  </Link>
                  <h4>{ item.subtitle }</h4>
                  <SanityBody>
                    { item.content }
                  </SanityBody>
                </div>
              </div>
            )) }
          </div>
        </Container>
      ) }

      { partners.length > 0 && (
        <Container
          as="section"
          className="consortium-page__section consortium-page__partners"
        >
          <h2>Associated Partners</h2>
          <div className="consortium-page__partners-list">
            { partners.map((partner, idx) => (
              <Link
                className="consortium-page__partner"
                href={ partner.link || '' }
                // eslint-disable-next-line react/no-array-index-key
                key={ idx }
                title={ partner.title || 'Partner link' }
              >
                <Image
                  alt={ partner.title || 'Partner logo' }
                  src={ partner.image }
                />
              </Link>
            )) }
          </div>
        </Container>
      ) }
    </Main>
  );
}
