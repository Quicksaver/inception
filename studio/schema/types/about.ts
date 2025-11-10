import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import title from '../fields/title';

export const aboutType = defineType({
  fields: [
    title(),
    defineField({
      description: 'Each section represents a block on the homepage.',
      name: 'sections',
      of: [
        {
          fields: [
            title({
              description: 'Section title will not appear on the page, it is just for easy reference',
              name: 'name',
            }),
            defineField({
              name: 'content',
              type: 'body',
            }),
          ],
          type: 'object',
        },
      ],
      type: 'array',
    }),
  ],
  icon: DocumentTextIcon,
  name: 'about',
  title: 'About',
  type: 'document',
});
