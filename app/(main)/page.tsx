import Container from 'components/Container';
import Main from 'components/Main';
import SanityBody from 'components/Sanity/Body';

import { fetchAbout } from 'studio/queries/about';

import './page.scss';

export default async function MainPage() {
  const about = await fetchAbout();

  if (!about) {
    return (
      <Main>
        <Container>
          <p>No content available.</p>
        </Container>
      </Main>
    );
  }

  return (
    <Main className="homepage">
      <Container>
        { about.sections?.map(section => (
          <div
            className="homepage__section"
            key={ section._key }
          >
            <SanityBody>
              { section.content }
            </SanityBody>
          </div>
        )) }
      </Container>
    </Main>
  );
}
