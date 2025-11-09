import Container from 'components/Container';
import PageTitle from 'components/Page/Title';
import SanityBody from 'components/Sanity/Body';

import type { QueryPageBySlugResult } from 'studio/sanity.types';

import './SimplePage.scss';

export default function SimplePage({
  body,
  title,
}: NonNullable<QueryPageBySlugResult>) {
  return (
    <Container className="simple-page">
      <PageTitle>{ title }</PageTitle>
      <SanityBody>{ body }</SanityBody>
    </Container>
  );
}
