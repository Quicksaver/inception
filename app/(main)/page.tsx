import Container from 'components/Container';
import Main from 'components/Main';
import SanityBody from 'components/Sanity/Body';

import { fetchAbout } from 'studio/queries/about';

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
    <Main>
      <Container>
        <h1>{ about.title }</h1>
        <SanityBody>
          { about.content }
        </SanityBody>
      </Container>
    </Main>
  );
}
