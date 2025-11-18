import Box from 'components/Box';
import Container from 'components/Container';
import IconCalendarEvent from 'components/Icon/CalendarEvent';
import Main from 'components/Main';
import PageList from 'components/Page/List';
import PageSection from 'components/Page/Section';
import PageTitle from 'components/Page/Title';
import SanityBody from 'components/Sanity/Body';

import { fetchOtherEvents } from 'studio/queries/otherEvents';
import { fetchTraining } from 'studio/queries/training';
import { fetchTrainingEvents } from 'studio/queries/trainingEvents';

import './page.scss';

export default async function TrainingAndEventsPage() {
  const training = await fetchTraining();
  const trainingEvents = await fetchTrainingEvents();
  const otherEvents = await fetchOtherEvents();

  return (
    <Main className="training-events-page">
      { training && (
        <Container className="training-events-page__intro">
          <PageTitle>{ training.title }</PageTitle>
          <SanityBody>
            { training.description }
          </SanityBody>
        </Container>
      ) }

      { trainingEvents.length > 0 && (
        <PageSection title="Training Events">
          <PageList className="training-events-page__events-list">
            { trainingEvents.map(event => (
              <Box
                className="training-events-page__event"
                key={ event.title }
              >
                <div className="training-events-page__event-meta">
                  <div className="training-events-page__event-meta-tag">
                    <IconCalendarEvent />
                    Event
                  </div>
                  <h3>{ event.title }</h3>
                  { event.subtitle && (
                    <h6 className="training-events-page__event-subtitle">{ event.subtitle }</h6>
                  ) }
                  <SanityBody>
                    { event.meta }
                  </SanityBody>
                </div>
                <SanityBody>
                  { event.description }
                </SanityBody>
              </Box>
            )) }
          </PageList>
        </PageSection>
      ) }

      { otherEvents.length > 0 && (
        <PageSection title="Other Events">
          <PageList className="training-events-page__events-list">
            { otherEvents.map(event => (
              <Box
                className="training-events-page__event"
                key={ event.title }
              >
                <div className="training-events-page__event-meta">
                  <div className="training-events-page__event-meta-tag">
                    <IconCalendarEvent />
                    Event
                  </div>
                  <h3>{ event.title }</h3>
                  { event.subtitle && (
                    <h6 className="training-events-page__event-subtitle">{ event.subtitle }</h6>
                  ) }
                  <SanityBody>
                    { event.meta }
                  </SanityBody>
                </div>
                <SanityBody>
                  { event.description }
                </SanityBody>
              </Box>
            )) }
          </PageList>
        </PageSection>
      ) }
    </Main>
  );
}
