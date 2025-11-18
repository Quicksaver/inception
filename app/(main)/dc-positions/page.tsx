import Box from 'components/Box';
import Container from 'components/Container';
import IconUser from 'components/Icon/User';
import Image from 'components/Image';
import Main from 'components/Main';
import PageTitle from 'components/Page/Title';
import SanityBody from 'components/Sanity/Body';

import { fetchPositions } from 'studio/queries/positions';

import './page.scss';

export default async function DCPositionsPage() {
  const positions = await fetchPositions();

  return (
    <Main className="dc-positions-page">
      <Container className="dc-positions-page__intro">
        <PageTitle>DC Positions</PageTitle>
      </Container>

      <Container className="dc-positions-page__list">
        { positions.map(position => {
          return (
            <Box
              as="section"
              className="dc-positions-page__position"
              key={ position._id }
            >
              <div className="dc-positions-page__position-card">
                <div className="dc-positions-page__position-image">
                  <div className="dc-positions-page__position-image-placeholder">
                    <IconUser />
                  </div>

                  <Image
                    alt={ position.name || 'Position holder' }
                    sizes="144px"
                    src={ position.image }
                  />
                </div>

                <div className="dc-positions-page__position-meta">
                  <h4 className="dc-positions-page__position-name">
                    { position.name }
                  </h4>
                  <div className="dc-positions-page__position-meta-item">
                    { 'Main Supervisor: ' }
                    <strong>{ position.mainSupervisor }</strong>
                  </div>
                  <div className="dc-positions-page__position-meta-item">
                    { 'Co-Supervisor: ' }
                    <strong>{ position.coSupervisor }</strong>
                  </div>
                </div>
              </div>

              <SanityBody className="dc-positions-page__position-description">
                { position.description }
              </SanityBody>
            </Box>
          );
        }) }
      </Container>
    </Main>
  );
}
