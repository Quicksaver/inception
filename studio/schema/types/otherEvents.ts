import { CalendarIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

import title from '../fields/title';

export const otherEventsType = defineType({
  fields: [
    title(),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'meta',
      type: 'body',
    }),
    defineField({
      name: 'description',
      type: 'body',
    }),
    orderRankField({ type: 'otherEvents' }),
  ],
  icon: CalendarIcon,
  name: 'otherEvents',
  orderings: [ orderRankOrdering ],
  title: 'Other Events',
  type: 'document',
});
