import './Monospace.scss';

export default function Monospace({ children }: { children: React.ReactNode }) {
  return (
    <span className="monospace">
      { children }
    </span>
  );
}
