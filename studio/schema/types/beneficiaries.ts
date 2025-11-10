import { HeartIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

import image from '../fields/image';
import title from '../fields/title';

export const beneficiariesType = defineType({
  fields: [
    title(),
    defineField({
      name: 'images',
      of: [
        image({
          description: 'Vector image (SVG) are ideal, PNG/WEBP with good resolution are also accepted. Transparent background preferred.',
        }),
      ],
      type: 'array',
      validation: rule => [
        rule.required(),
        rule.min(1),
      ],
    }),
    defineField({
      name: 'description',
      type: 'body',
    }),
    orderRankField({ type: 'beneficiaries' }),
  ],
  icon: HeartIcon,
  name: 'beneficiaries',
  orderings: [ orderRankOrdering ],
  title: 'Beneficiary',
  type: 'document',
});
