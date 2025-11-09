import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import type { Rule, TypedObject } from 'sanity';

import shareimage from '../fields/shareimage';
import slug from '../fields/slug';
import title from '../fields/title';

export interface Page {
  body: TypedObject | TypedObject[];
  title: string;
}

export const pageType = defineType({
  fields: [
    title(),
    slug('title', {
      validation: (rule: Rule) => [
        rule.required(),
      ],
    }),
    shareimage({
      validation: null,
    }),
    defineField({
      name: 'body',
      type: 'pageBody',
    }),
  ],
  icon: DocumentsIcon,
  name: 'page',
  title: 'Simple Page',
  type: 'document',
});
