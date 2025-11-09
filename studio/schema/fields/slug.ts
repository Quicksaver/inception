import { defineField } from 'sanity';

export default function slug(
  source: string,
  params?: {
    [key: string]: unknown;
    options?: {
      [key: string]: unknown;
    };
  },
) {
  return defineField({
    name: 'slug',
    type: 'slug',
    ...params,
    options: {
      source,
      ...params?.options,
    },
  });
}
