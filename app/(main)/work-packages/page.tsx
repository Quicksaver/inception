import Container from 'components/Container';
import Main from 'components/Main';
import SanityBody from 'components/Sanity/Body';

import { fetchScientificWorkPackages } from 'studio/queries/scientificWorkPackages';

import './page.scss';

export default async function WorkPackagesPage() {
  const workPackages = await fetchScientificWorkPackages();

  return (
    <Main className="work-packages-page">
      <Container className="work-packages-page__intro">
        <h1>Scientific Work Packages</h1>
      </Container>

      { workPackages.length > 0
        ? (
          <Container
            as="section"
            className="work-packages-page__section"
          >
            <div className="work-packages-page__list">
              { workPackages.map(workPackage => (
                <div
                  className="work-packages-page__item"
                  key={ workPackage.title }
                >
                  <h2>{ workPackage.title }</h2>
                  <SanityBody>
                    { workPackage.description }
                  </SanityBody>
                </div>
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
