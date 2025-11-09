'use client';

import {
  type ElementType,
  type Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Image, { type ImageProps } from 'components/Image';

import useRendered from 'hooks/useRendered';
import createPortal from 'utils/createPortal';
import getOffset from 'utils/getOffset';

interface ImageBackgroundProps extends Pick<ImageProps, 'children' | 'preload' | 'sizes' | 'src' | 'style'> {
  as?: ElementType;
  className?: string;
  ref?: Ref<HTMLElement | null>;
}

type Coords = {
  [key: string]: number;
};

export default function ImageBackground({
  as: Component = 'div',
  children,
  className = '',
  preload,
  ref = null,
  sizes,
  src,
  style,
  ...props
}: ImageBackgroundProps) {
  const imageRef = useRef<HTMLElement | null>(null);
  const [ currentSrc, setCurrentSrc ] = useState<null | string>(null);
  const [ coords, setCoords ] = useState<Coords>({
    height: 1,
    left: 0,
    top: 0,
    width: 1,
  });
  const rendered = useRendered();

  const elementStyle = useMemo(() => ({
    ...style,
    backgroundImage: currentSrc ? `url(${currentSrc})` : null,
  }), [ currentSrc, style ]);

  const updateCoords = useCallback(() => {
    if (imageRef.current) {
      const newCoords: Coords = {
        height: imageRef.current.offsetHeight,
        left: getOffset(imageRef.current, 'left'),
        top: getOffset(imageRef.current, 'top'),
        width: imageRef.current.offsetWidth,
      };

      if (Object.entries(coords).some(([ key, value ]) => value !== newCoords[key as keyof Coords])) {
        setCoords(newCoords);
      }
    }
  }, [ coords ]);

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener('resize', updateCoords, {
      passive: true,
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [ updateCoords ]);

  return (
    <>
      { rendered && !!src && createPortal(
        <Image
          alt="invisible to be loaded in the background"
          className={ className }
          onCurrentSrcChange={ setCurrentSrc }
          preload={ preload }
          sizes={ sizes }
          src={ src }
          style={ {
            display: 'block',
            opacity: 0,
            padding: 0,
            pointerEvents: 'none',
            position: 'absolute',
            visibility: 'hidden',
            ...coords,
          } }
        />,
      ) }

      <Component
        className={ className }
        ref={ (element: HTMLElement | null) => {
          if (typeof ref === 'function') {
            ref(element);
          }
          else if (typeof ref === 'object' && ref && 'current' in ref) {
            // eslint-disable-next-line react-hooks/immutability
            ref.current = element;
          }

          imageRef.current = element;
          updateCoords();
        } }
        style={ elementStyle }
        { ...props }
      >
        { children }
      </Component>
    </>
  );
}
