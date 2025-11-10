import { BookIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import title from '../fields/title';

export const trainingType = defineType({
  fields: [
    title(),
    defineField({
      name: 'description',
      type: 'body',
    }),
    defineField({
      name: 'training',
      type: 'body',
    }),
  ],
  icon: BookIcon,
  name: 'training',
  title: 'Training',
  type: 'document',
});
