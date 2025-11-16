import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType, StringRule } from 'sanity';

import alt from '../fields/alt';
import imageField from '../fields/image';
import title from '../fields/title';

import body from './body';

export const aboutType = defineType({
  fields: [
    title(),
    defineField({
      description: 'Each section represents a block on the homepage.',
      name: 'sections',
      of: [
        {
          fields: [
            defineField(
              body({
                name: 'leftColumn',
                title: 'Left box',
              }),
            ),
            defineField(
              body({
                name: 'rightColumn',
                title: 'Right box',
              }),
            ),
          ],
          name: 'twoColumns',
          title: 'Boxes side-by-side',
          type: 'object',
        },
        {
          fields: [
            defineField(
              body({
                name: 'content',
              }),
            ),
          ],
          name: 'editorial',
          title: 'Fill two columns',
          type: 'object',
        },
        {
          fields: [
            defineField(
              body({
                name: 'content',
              }),
            ),
            imageField({
              description: 'Upload good resolution images, ideally 4:3 format.',
            }),
            alt({
              title: 'Alternative text for image',
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'imagePosition',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' },
                ],
              },
              title: 'Image position',
              type: 'string',
            }),
          ],
          name: 'withImage',
          title: 'Section with image',
          type: 'object',
        },
        {
          fields: [
            defineField(
              body({
                name: 'content',
              }),
            ),
          ],
          name: 'simple',
          title: 'Simple content',
          type: 'object',
        },
      ],
      type: 'array',
    }),
    defineField(
      body({
        name: 'lastSection',
      }),
    ),
  ],
  icon: DocumentTextIcon,
  name: 'about',
  title: 'About',
  type: 'document',
});
