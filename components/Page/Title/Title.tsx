export default function PageTitle({ children = null }: { children?: React.ReactNode }) {
  return (
    <h1 className="page-title">
      { children }
    </h1>
  );
}
