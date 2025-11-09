import Main from 'components/Main';

export default async function MainSlugLayout({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      { children }
    </Main>
  );
}
