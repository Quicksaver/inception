import { PreviewProps } from 'sanity';

export default function PreviewQuote({
  author = '',
  quote = '',
}: PreviewProps & {
  author?: string;
  quote?: string;
}) {
  return (
    <div
      style={ {
        alignItems: 'start',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '0.85rem',
        height: '100%',
        padding: '0 0.5rem',
      } }
    >
      { quote
        ? <div>{ quote }</div>
        : <div style={ { fontStyle: 'italic' } }>Add a quoted text</div> }
      { author
        ? (
          <div
            style={ {
              fontStyle: 'italic',
              fontWeight: 700,
            } }
          >
            { author }
          </div>
        )
        : (
          <div
            style={ {
              fontStyle: 'italic',
              fontWeight: 700,
            } }
          >
            Add an author
          </div>
        ) }
    </div>
  );
}
