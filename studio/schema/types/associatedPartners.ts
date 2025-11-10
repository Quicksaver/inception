import { LinkIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineType } from 'sanity';

import image from '../fields/image';
import title from '../fields/title';

export const associatedPartnersType = defineType({
  fields: [
    title(),
    image({
      description: 'Vector image (SVG) are ideal, PNG/WEBP with good resolution are also accepted. Transparent background preferred.',
    }),
    orderRankField({ type: 'associatedPartners' }),
  ],
  icon: LinkIcon,
  name: 'associatedPartners',
  orderings: [ orderRankOrdering ],
  title: 'Associated Partner',
  type: 'document',
});
