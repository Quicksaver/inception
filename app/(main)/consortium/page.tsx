import Box from 'components/Box';
import Container from 'components/Container';
import Image from 'components/Image';
import Link from 'components/Link';
import Main from 'components/Main';
import PageList from 'components/Page/List';
import PageSection from 'components/Page/Section';
import PageTitle from 'components/Page/Title';
import SanityBody from 'components/Sanity/Body';

import { fetchAssociatedPartners } from 'studio/queries/associatedPartners';
import { fetchBeneficiaries } from 'studio/queries/beneficiaries';
import { fetchConsortium } from 'studio/queries/consortium';

import './page.scss';

const beneficiaryImageSizes = [
  {
    condition: 'until-tablet' as const,
    size: '50vw' as const,
  },
  { size: '200px' as const },
];

const partnerImageSizes = [
  {
    condition: 'max-width: 663px' as const,
    size: '100vw' as const,
  },
  {
    condition: 'max-width: 975px' as const,
    size: '50vw' as const,
  },
  {
    condition: 'until-maxcontainer' as const,
    size: '33.3vw' as const,
  },
  { size: '192px' as const },
];

export default async function ConsortiumPage() {
  const consortium = await fetchConsortium();
  const beneficiaries = await fetchBeneficiaries();
  const partners = await fetchAssociatedPartners();

  return (
    <Main className="consortium-page">
      { consortium && (
        <Container className="consortium-page__intro">
          <PageTitle>{ consortium.title }</PageTitle>
          { !!consortium.content && (
            <SanityBody>
              { consortium.content }
            </SanityBody>
          ) }
        </Container>
      ) }

      { beneficiaries.length > 0 && (
        <PageSection title="Beneficiaries">
          <PageList className="consortium-page__beneficiaries-list">
            { beneficiaries.map(item => (
              <Box
                as="article"
                className="consortium-page__beneficiary"
                key={ item.title }
              >
                { item.images.length > 0 && (
                  <div className="consortium-page__beneficiary-images">
                    { item.images.map(image => (
                      <Image
                        alt={ item.title || 'Beneficiary image' }

                        key={ image.asset?._id }
                        sizes={ beneficiaryImageSizes }
                        src={ image }
                      />
                    )) }
                  </div>
                ) }
                <div className="consortium-page__beneficiary-content">
                  <Link href={ item.link || '' }>
                    <h4>{ item.title }</h4>
                  </Link>
                  <h6>{ item.subtitle }</h6>
                  <SanityBody>
                    { item.content }
                  </SanityBody>
                </div>
              </Box>
            )) }
          </PageList>
        </PageSection>
      ) }

      { partners.length > 0 && (
        <PageSection title="Associated Partners">
          <PageList className="consortium-page__partners-list">
            { partners.map((partner, idx) => (
              <Box
                as={ Link }
                className="consortium-page__partner"
                href={ partner.link || '' }
                // eslint-disable-next-line react/no-array-index-key
                key={ idx }
                title={ partner.title || 'Partner link' }
              >
                <Image
                  alt={ partner.title || 'Partner logo' }
                  sizes={ partnerImageSizes }
                  src={ partner.image }
                />
              </Box>
            )) }
          </PageList>
        </PageSection>
      ) }
    </Main>
  );
}
