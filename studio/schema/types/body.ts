import { defineArrayMember, defineType } from 'sanity';
import type { ArrayDefinition, Rule } from 'sanity';

import IconSubscript from '../../components/Icon/Subscript';
import IconSuperscript from '../../components/Icon/Superscript';
import Subscript from '../../components/Subscript';
import Superscript from '../../components/Superscript';

type BodyParams = Partial<Omit<ArrayDefinition, 'of' | 'type'>> & {
  name: string;
  of?: ArrayDefinition['of'];
};

export default function body(params: BodyParams) {
  return defineType({
    type: 'array',
    ...params,
    of: [
      defineArrayMember({
        lists: [
          { title: 'Bullet List', value: 'bullet' },
          { title: 'Numbered List', value: 'number' },
        ],

        // Marks let you mark up inline text in the Portable Text Editor
        marks: {
        // Annotations can be any object structure – e.g. a link or a footnote.
          annotations: [
            {
              fields: [
                {
                  name: 'href',
                  title: 'URL',
                  type: 'url',
                  validation: (rule: Rule) => rule.uri({
                    allowRelative: true,
                    scheme: [ 'http', 'https', 'mailto', 'tel' ],
                  }),
                },
              ],
              name: 'link',
              title: 'URL',
              type: 'object',
            },
          ],
          // Decorators usually describe a single property – e.g. a typographic preference or highlighting
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Underline', value: 'underline' },
            { title: 'Strikethrough', value: 'strike-through' },
            { title: 'Code', value: 'code' },
            {
              component: Superscript,
              icon: IconSuperscript,
              title: 'Superscript',
              value: 'superscript',
            },
            {
              component: Subscript,
              icon: IconSubscript,
              title: 'Subscript',
              value: 'subscript',
            },
          ],
        },

        // Styles let you define what blocks can be marked up as. The default set corresponds with HTML tags, but
        // you can set any title or value you want, and decide how you want to deal with it where you want to use
        // your content.
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
        ],

        type: 'block',
      }),

      ...(params.of ?? []),
    ],
  });
}
