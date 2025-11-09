import { useMemo } from 'react';

import useRendered from 'hooks/useRendered';

// Bug: when using url(#xxx) to fetch a linear gradient, the browser will fetch the very first one
// it finds in the DOM tree. So we need to make sure each id is entirely unique.
let counter = 0;

const useUniqueId = () => {
  const rendered = useRendered();

  return useMemo(() => (rendered ? counter++ : 0), [ rendered ]);
};

export default useUniqueId;
