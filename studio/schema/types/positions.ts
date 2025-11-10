import { UserIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';
import type { StringRule } from 'sanity';

import image from '../fields/image';
import name from '../fields/name';

export const positionsType = defineType({
  fields: [
    defineField({
      name: 'position',
      type: 'string',
      validation: (rule: StringRule) => [
        rule.required(),
      ],
    }),
    defineField({
      name: 'mainSupervisor',
      title: 'Main Supervisor',
      type: 'string',
      validation: (rule: StringRule) => [
        rule.required(),
      ],
    }),
    defineField({
      name: 'coSupervisor',
      title: 'Co-Supervisor',
      type: 'string',
      validation: (rule: StringRule) => [
        rule.required(),
      ],
    }),
    image({
      description: 'Upload good resolution images, ideally square ones.',
    }),
    name({}),
    defineField({
      name: 'description',
      type: 'body',
    }),
    orderRankField({ type: 'positions' }),
  ],
  icon: UserIcon,
  name: 'positions',
  orderings: [ orderRankOrdering ],
  preview: {
    prepare(selection) {
      const { name: _name, position } = selection as { name: string; position: string };
      return {
        title: `${position} - ${_name}`,
      };
    },
    select: {
      name: 'name',
      position: 'position',
    },
  },
  title: 'DC Position',
  type: 'document',
});
