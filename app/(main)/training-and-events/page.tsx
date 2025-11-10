import Container from 'components/Container';
import Main from 'components/Main';
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
        <Container className="training-events-page__section">
          <h1>{ training.title }</h1>
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
          <h2>Training Events</h2>
          <div className="training-events-page__events-list">
            { trainingEvents.map(event => (
              <div
                className="training-events-page__event"
                key={ event.title }
              >
                <h3>{ event.title }</h3>
                { event.subtitle && (
                  <p className="training-events-page__event-subtitle">{ event.subtitle }</p>
                ) }
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
          <h2>Other Events</h2>
          <div className="training-events-page__events-list">
            { otherEvents.map(event => (
              <div
                className="training-events-page__event"
                key={ event.title }
              >
                <h3>{ event.title }</h3>
                { event.subtitle && (
                  <p className="training-events-page__event-subtitle">{ event.subtitle }</p>
                ) }
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
