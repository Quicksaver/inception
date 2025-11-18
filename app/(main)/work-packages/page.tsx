import Box from 'components/Box';
import Container from 'components/Container';
import IconPackage from 'components/Icon/Package';
import Main from 'components/Main';
import PageTitle from 'components/Page/Title';
import SanityBody from 'components/Sanity/Body';

import { fetchScientificWorkPackages } from 'studio/queries/scientificWorkPackages';

import './page.scss';

export default async function WorkPackagesPage() {
  const workPackages = await fetchScientificWorkPackages();

  return (
    <Main className="work-packages-page">
      <Container className="work-packages-page__intro">
        <PageTitle>Scientific Work Packages</PageTitle>
      </Container>

      { workPackages.length > 0
        ? (
          <Container as="section">
            <div className="work-packages-page__list">
              { workPackages.map(workPackage => (
                <Box
                  className="work-packages-page__item"
                  key={ workPackage.title }
                >
                  <div className="work-packages-page__item-tag">
                    <IconPackage />
                    Work Package
                  </div>
                  <h4>{ workPackage.title }</h4>
                  <SanityBody>
                    { workPackage.description }
                  </SanityBody>
                </Box>
              )) }
            </div>
          </Container>
        )
        : (
          <Container>
            <p>No work packages available.</p>
          </Container>
        ) }
    </Main>
  );
}
