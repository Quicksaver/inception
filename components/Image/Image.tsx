'use client';

import NextImage, {
  type ImageProps as NextImageProps,
  type StaticImageData,
} from 'next/image';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { create } from 'zustand';

import useRendered from 'hooks/useRendered';
import useWindowSize from 'hooks/useWindowSize';
import { remotePatterns } from 'next.config';
import { type ImageSrcSanity } from 'studio/schema/fields/image';
import breakpoints, { type BreakpointKey } from 'utils/breakpoints';

const keys = Object.keys(breakpoints) as BreakpointKey[];

type ImageSrc = [ ImageSrcSanity | StaticImageData | string, BreakpointKey ][] | null | string;

type ImageSizesCondition = ''
  | `${'max' | 'min'}-width: ${number}px`
  | `${'only' | 'until'}-${BreakpointKey}`
  | BreakpointKey;

type ImageSizesSize = `${number}${'px' | 'vw'}`;

export interface ImageProps extends Omit<NextImageProps, 'sizes' | 'src'> {
  maxWidth?: null | number;
  minWidth?: null | number;
  onCurrentSrcChange?: ((src: null | string) => void) | null;
  sizes?: string | undefined | {
    condition?: ImageSizesCondition;
    size: ImageSizesSize;
  }[];
  src?: ImageSrc | ImageSrcSanity | StaticImageData;
}

const useInternalImageState = create(
  (): { failedSrcs: string[] } => ({ failedSrcs: [] }),
);

export default function Image({
  alt,
  height,
  maxWidth = null,
  minWidth = null,
  onCurrentSrcChange = null,
  preload = false,
  sizes = undefined,
  src = '',
  style,
  width,
  ...props
}: ImageProps) {
  const realSrc = (src && ((src as StaticImageData).src || (src as ImageSrcSanity).asset?.url || src as string)) || '';
  const { width: windowWidth } = useWindowSize();
  const rendered = useRendered();

  const realSizes = useMemo(
    () => {
      if (!sizes || typeof sizes === 'string') {
        return sizes;
      }

      const values = sizes.reduce((acc: string[], { condition = '', size }) => {
        const split = condition.split('-');

        const breakpoint = split[0] as string | undefined;
        const forRealBreakpoint = split[1] as BreakpointKey | undefined;

        if (!breakpoint) {
          acc.push(size);
        }
        else if (breakpoint in breakpoints) {
          acc.push(`(min-width: ${breakpoints[breakpoint as BreakpointKey]}px) ${size}`);
        }
        else if (forRealBreakpoint && forRealBreakpoint in breakpoints) {
          switch (breakpoint) {
            case 'only': {
              const idx = keys.indexOf(forRealBreakpoint);
              const maxBreakpoint = idx > 0 ? keys[idx - 1] : undefined;
              acc.push(`(min-width: ${breakpoints[forRealBreakpoint]}px)${maxBreakpoint ? ` and (max-width: ${breakpoints[maxBreakpoint] - 0.1}px)` : ''} ${size}`);
              break;
            }

            case 'until':
              acc.push(`(max-width: ${breakpoints[forRealBreakpoint] - 0.1}px) ${size}`);
              break;

            default:
              break;
          }
        }
        else {
          acc.push(`(${condition}) ${size}`);
        }

        return acc;
      }, []);

      return values.join(', ');
    },
    [ sizes ],
  );

  const [ failed, setFailed ] = useState(false);
  const [ currentSrc, setCurrentSrc ] = useState<null | string>(null);
  const { failedSrcs } = useInternalImageState();

  useEffect(() => {
    setFailed(false);
  }, [ realSrc ]);

  const failedSrc = useMemo(() => failedSrcs.includes(realSrc), [ failedSrcs, realSrc ]);

  const onLoad = useCallback((event: React.SyntheticEvent) => {
    setFailed(false);
    setCurrentSrc((event.target as HTMLImageElement).currentSrc);
  }, []);

  const onError = useCallback(() => {
    setFailed(true);

    if (realSrc) {
      useInternalImageState.setState({
        failedSrcs: [
          ...useInternalImageState.getState().failedSrcs,
          realSrc,
        ],
      });
    }
  }, [ realSrc ]);

  const imgStyle = useMemo(() => {
    const _style = { ...style };

    if (failed || !currentSrc) {
      _style.visibility = 'hidden';
    }

    return _style;
  }, [ currentSrc, failed, style ]);

  const options = useMemo(
    () => {
      const _options: Pick<NextImageProps, 'fill' | 'height' | 'src' | 'style' | 'width'> & { style: React.CSSProperties } = {
        src: realSrc,
        style: { ...imgStyle },
      };

      if (src && Array.isArray(src)) {
        return _options;
      }

      const srcWidth = (
        src
        && (
          (src as StaticImageData).width
          || (src as ImageSrcSanity).asset?.metadata?.dimensions?.width
        )
      ) || width || 0;
      const srcHeight = (
        src
        && (
          (src as StaticImageData).height
          || (src as ImageSrcSanity).asset?.metadata?.dimensions?.height)
      ) || height || 0;

      if (srcWidth && srcHeight) {
        _options.height = srcHeight;
        _options.width = srcWidth;

        return _options;
      }

      if (imgStyle.width && imgStyle.height) {
        _options.height = Number(imgStyle.height);
        _options.width = Number(imgStyle.width);

        return _options;
      }

      _options.fill = !width && !height;
      _options.src = realSrc;

      // We don't want next/image to add inline styles
      if (!width && !height) {
        _options.style.bottom = undefined;
        _options.style.color = undefined;
        _options.style.height = undefined;
        _options.style.left = undefined;
        _options.style.position = undefined;
        _options.style.right = undefined;
        _options.style.top = undefined;
        _options.style.width = undefined;
      }

      return _options;
    },
    [ height, imgStyle, realSrc, src, width ],
  );

  const pure = useMemo(
    () => {
      if (src && Array.isArray(src)) {
        return null;
      }

      if (!realSrc) {
        return null;
      }

      if (/\.(gif|svg)$/.test(realSrc)) {
        return true;
      }

      if (realSrc.startsWith('/') && !realSrc.startsWith('//')) {
        return false;
      }

      if (!remotePatterns.find(
        pattern => new RegExp(`^${pattern.protocol || 'http(s)?'}://${pattern.hostname}`).test(realSrc),
      )) {
        return true;
      }

      return false;
    },
    [ realSrc, src ],
  );

  useEffect(() => {
    onCurrentSrcChange?.(pure ? realSrc : currentSrc);
  }, [ currentSrc, onCurrentSrcChange, realSrc, pure ]);

  if (src && Array.isArray(src)) {
    let lastBreakpoint: BreakpointKey | undefined;

    return src.map(([ arrSrc, maxBreakpoint ]) => {
      const currentLastBreakpoint = lastBreakpoint;
      // eslint-disable-next-line react-hooks/immutability
      lastBreakpoint = maxBreakpoint;

      const _arrSrc = (arrSrc && ((arrSrc as StaticImageData).src || (arrSrc as ImageSrcSanity).asset?.url || arrSrc as string)) || '';

      return (
        <Image
          alt={ alt }
          height={ height }
          key={ `${_arrSrc}-${maxBreakpoint}` }
          maxWidth={ breakpoints[maxBreakpoint] }
          minWidth={ currentLastBreakpoint ? breakpoints[currentLastBreakpoint] : undefined }
          onCurrentSrcChange={ onCurrentSrcChange }
          preload={ preload }
          sizes={ sizes }
          src={ arrSrc }
          style={ style }
          width={ width }
          { ...props }
        />
      );
    });
  }

  if (!realSrc || failed || failedSrc) {
    return null;
  }

  if (maxWidth && (windowWidth >= maxWidth || !rendered)) {
    return null;
  }

  if (minWidth && (windowWidth < minWidth || !rendered)) {
    return null;
  }

  if (pure) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={ alt }
        loading={ preload ? 'eager' : 'lazy' }
        onError={ onError }
        onLoad={ onLoad }
        src={ realSrc }
        style={ imgStyle }
        { ...props }
      />
    );
  }

  return (
    <NextImage
      alt={ alt }
      onError={ onError }
      onLoad={ onLoad }
      preload={ preload }
      sizes={ realSizes }
      { ...options }
      { ...props }
    />
  );
}
