import getOffset, { type OffsetCoord } from 'utils/getOffset';

const coords: Record<string, Record<string, Set<HTMLElement>>> = {
  bottom: {},
  left: {},
  right: {},
  top: {},
};

const updateHeights = (coord?: OffsetCoord) => {
  if (!coord) {
    updateHeights('top');
    updateHeights('bottom');
    return;
  }

  Object.values(coords[coord]).forEach(set => {
    const elements = [ ...set ];

    elements.forEach(element => {
      element.style.height = '';
    });

    const matchOffsets = elements.reduce<Map<number, HTMLElement[]>>((acc, element) => {
      const offset = Math.round(getOffset(element, coord));

      if (!acc.has(offset)) {
        acc.set(offset, []);
      }
      acc.get(offset)?.push(element);

      return acc;
    }, new Map());

    [ ...matchOffsets.values() ].forEach(matchElements => {
      const height = Math.max(
        ...matchElements
          .map(element => getComputedStyle(element).height.replace('px', ''))
          .map(Number),
      );
      if (height) {
        matchElements.forEach(element => {
          element.style.height = `${height}px`;
        });
      }
    });
  });
};

if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => updateHeights(), { passive: true });
}

export default function matchHeight(name: string, coord: OffsetCoord = 'top') {
  return (element: HTMLElement | null) => {
    if (!element) {
      return () => undefined;
    }

    if (!(name in coords[coord])) {
      coords[coord][name] = new Set();
    }

    const elements = coords[coord][name];

    if (!elements.has(element)) {
      elements.add(element);
      updateHeights(coord);
    }

    return () => {
      element.style.height = '';

      elements.delete(element);
    };
  };
}
