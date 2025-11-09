export type OffsetCoord = 'bottom' | 'height' | 'left' | 'right' | 'top' | 'width';

export default function getOffset(el: HTMLElement | null, coord: OffsetCoord): number {
  if (!el) {
    return 0;
  }

  const rect = el.getBoundingClientRect();
  const parentOffset = el.offsetParent instanceof HTMLElement
    ? getOffset(el.offsetParent, coord)
    : 0;

  return (rect[coord] || 0) + parentOffset;
}
