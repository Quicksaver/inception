import { defineField } from 'sanity';

export default function alt(params?: { [key: string]: unknown }) {
  return defineField({
    name: 'alt',
    title: 'Alternative text',
    type: 'string',
    ...params,
  });
}
