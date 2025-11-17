import Container from 'components/Container';
import Main from 'components/Main';
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
        <Container
          as="section"
          className="training-events-page__section training-events-page__events"
        >
          <h4>Training Events</h4>
          <div className="training-events-page__events-list">
            { trainingEvents.map(event => (
              <div
                className="training-events-page__event"
                key={ event.title }
              >
                <div className="training-events-page__event-meta">
                  <h4>{ event.title }</h4>
                  { event.subtitle && (
                    <h6 className="training-events-page__event-subtitle">{ event.subtitle }</h6>
                  ) }
                </div>
                <SanityBody>
                  { event.description }
                </SanityBody>
              </div>
            )) }
          </div>
        </Container>
      ) }

      { otherEvents.length > 0 && (
        <Container
          as="section"
          className="training-events-page__section training-events-page__events"
        >
          <h4>Other Events</h4>
          <div className="training-events-page__events-list">
            { otherEvents.map(event => (
              <div
                className="training-events-page__event"
                key={ event.title }
              >
                <div className="training-events-page__event-meta">
                  <h4>{ event.title }</h4>
                  { event.subtitle && (
                    <h6 className="training-events-page__event-subtitle">{ event.subtitle }</h6>
                  ) }
                </div>
                <SanityBody>
                  { event.description }
                </SanityBody>
              </div>
            )) }
          </div>
        </Container>
      ) }
    </Main>
  );
}
