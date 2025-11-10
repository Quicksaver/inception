import Container from 'components/Container';
import Image from 'components/Image';
import Main from 'components/Main';
import SanityBody from 'components/Sanity/Body';

import { fetchPositions } from 'studio/queries/positions';

import './page.scss';

export default async function DCPositionsPage() {
  const positions = await fetchPositions();

  return (
    <Main className="dc-positions-page">
      <Container className="dc-positions-page__intro">
        <h1>DC Positions</h1>
      </Container>

      { positions.map(position => {
        return (
          <Container
            as="section"
            className="dc-positions-page__position"
            key={ position._id }
          >
            <div className="dc-positions-page__position-image">
              <Image
                alt={ position.name || 'Position holder' }
                src={ position.image }
              />
            </div>

            <div className="dc-positions-page__position-content">
              <div className="dc-positions-page__position-header">
                <h2>{ position.position }</h2>
                { position.name && (
                  <p className="dc-positions-page__position-name">{ position.name }</p>
                ) }
              </div>

              <div className="dc-positions-page__position-meta">
                <div className="dc-positions-page__position-meta-item">
                  <strong>Main Supervisor:</strong>
                  { ' ' }
                  { position.mainSupervisor }
                </div>
                <div className="dc-positions-page__position-meta-item">
                  <strong>Co-Supervisor:</strong>
                  { ' ' }
                  { position.coSupervisor }
                </div>
              </div>

              { position.description && (
                <SanityBody className="dc-positions-page__position-description">
                  { position.description }
                </SanityBody>
              ) }
            </div>
          </Container>
        );
      }) }
    </Main>
  );
}
