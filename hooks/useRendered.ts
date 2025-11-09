import { useEffect, useState } from 'react';

export default function useRendered() {
  const [ rendered, setRendered ] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setRendered(true), []);

  return rendered;
}
