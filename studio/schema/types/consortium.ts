import { UsersIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import title from '../fields/title';

export const consortiumType = defineType({
  fields: [
    title(),
    defineField({
      name: 'content',
      type: 'body',
    }),
  ],
  icon: UsersIcon,
  name: 'consortium',
  title: 'Consortium',
  type: 'document',
});
