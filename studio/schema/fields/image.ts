import { defineField } from 'sanity';

import type { SanityImageAsset } from 'studio/sanity.types';

export default function image(params: {
  [key: string]: unknown;
  options?: {
    [key: string]: unknown;
  };
}) {
  return defineField({
    name: 'image',
    type: 'image',
    ...params,
    options: {
      accept: 'image/*',
      ...params.options,
    },
  });
}

export interface ImageSrcSanity {
  asset: null | SanityImageAsset;
}
