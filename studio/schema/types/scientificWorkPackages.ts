import { PackageIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

import title from '../fields/title';

export const scientificWorkPackagesType = defineType({
  fields: [
    title(),
    defineField({
      name: 'description',
      type: 'body',
    }),
    orderRankField({ type: 'scientificWorkPackages' }),
  ],
  icon: PackageIcon,
  name: 'scientificWorkPackages',
  orderings: [ orderRankOrdering ],
  title: 'Scientific Work Packages',
  type: 'document',
});
