import './Divider.scss';

export default function Divider({ children = null }: { children?: React.ReactNode }) {
  return (
    <div className="divider">
      { children }
    </div>
  );
}
