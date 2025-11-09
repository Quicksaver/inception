import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import type {
  DatetimeRule,
  ImageRule,
  SlugRule,
  StringRule,
} from 'sanity';

import alt from '../fields/alt';
import image from '../fields/image';
import slug from '../fields/slug';
import title from '../fields/title';

export const blogArticleType = defineType({
  fields: [
    title(),
    slug('title', {
      validation: (rule: SlugRule) => [
        rule.required(),
      ],
    }),
    defineField({
      initialValue: false,
      name: 'published',
      type: 'boolean',
    }),
    defineField({
      name: 'publishTime',
      title: 'Publish Time',
      type: 'datetime',
      validation: (rule: DatetimeRule) => [
        rule.required(),
      ],
    }),
    defineField({
      name: 'author',
      type: 'string',
      validation: (rule: StringRule) => [
        rule.required(),
      ],
    }),
    defineField({
      description: 'A short summary of the article.',
      name: 'abstract',
      type: 'text',
      validation: (rule: StringRule) => [
        rule.required(),
        rule.max(160).warning('Abstract should be under 160 characters for SEO purposes.'),
      ],
    }),
    image({
      fields: [ alt() ],
      name: 'coverImage',
      title: 'Cover Image',
      validation: (rule: ImageRule) => [ rule.required() ],
    }),
    defineField({
      name: 'body',
      type: 'pageBody',
    }),
  ],
  icon: DocumentTextIcon,
  name: 'blogArticle',
  title: 'Blog Article',
  type: 'document',
});
