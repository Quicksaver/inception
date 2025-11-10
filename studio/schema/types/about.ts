import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import title from '../fields/title';

export const aboutType = defineType({
  fields: [
    title(),
    defineField({
      name: 'content',
      type: 'pageBody',
    }),
  ],
  icon: DocumentTextIcon,
  name: 'about',
  title: 'About',
  type: 'document',
});
