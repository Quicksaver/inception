import { BlockElementIcon, CogIcon, LinkIcon } from '@sanity/icons';
import {
  defineField,
  defineType,
  type StringRule,
  type UrlRule,
} from 'sanity';

import description from '../fields/description';
import shareimage from '../fields/shareimage';
import title from '../fields/title';

export const siteSettingsType = defineType({
  fields: [
    title({
      description: 'The title of the website. Appears in the browser tab and search engine results.',
    }),
    description({
      description: 'A snippet summarizing the website, typically around 160 characters. It appears under the page title in search engine results.',
    }),
    shareimage(),
    defineField({
      description: 'Change this to reset cookie settings and force users to re-accept cookies. Suggested to set a date; e.g. 2024-03-01',
      name: 'cookieVersion',
      type: 'string',
    }),
    defineField({
      description: 'i.e. the Measurement ID for Google Analytics',
      name: 'gtagId',
      title: 'GoogleTag ID',
      type: 'string',
    }),
    defineField({
      description: 'i.e. the Container ID for Google Tag Manager',
      name: 'gtmId',
      title: 'GTM ID',
      type: 'string',
    }),
    defineField({
      name: 'socials',
      of: [
        {
          fields: [
            defineField({
              name: 'platform',
              options: {
                list: [
                  'facebook',
                  'instagram',
                  'linkedin',
                  'x',
                ],
              },
              type: 'string',
              validation: (rule: StringRule) => [
                rule.required(),
              ],
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (rule: UrlRule) => [
                rule.required(),
              ],
            }),
          ],
          icon: LinkIcon,
          type: 'object',
        },
      ],
      type: 'array',
    }),
    defineField({
      name: 'headerNavigation',
      of: [
        {
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (rule: StringRule) => [
                rule.required(),
              ],
            }),
            defineField({
              name: 'path',
              type: 'string',
              validation: (rule: StringRule) => [
                rule.required(),
              ],
            }),
            defineField({
              description: 'Check this to only show this link to authenticated users',
              initialValue: false,
              name: 'authenticated',
              type: 'boolean',
            }),
            defineField({
              description: 'Check this if this links to a single page (i.e. about us), rather than the root of a section (i.e. the user dashboard)',
              initialValue: false,
              name: 'exact',
              type: 'boolean',
            }),
            defineField({
              description: 'Optional feature flag required to show this navigation item',
              name: 'featureFlag',
              type: 'string',
            }),
          ],
          icon: LinkIcon,
          type: 'object',
        },
      ],
      type: 'array',
    }),
    defineField({
      name: 'footerNavigation',
      of: [
        {
          fields: [
            defineField({
              name: 'label',
              title: 'Block Label',
              type: 'string',
            }),
            defineField({
              name: 'links',
              of: [
                {
                  fields: [
                    defineField({
                      name: 'label',
                      type: 'string',
                      validation: (rule: StringRule) => [
                        rule.required(),
                      ],
                    }),
                    defineField({
                      name: 'path',
                      type: 'string',
                      validation: (rule: StringRule) => [
                        rule.required(),
                      ],
                    }),
                    defineField({
                      description: 'Optional feature flag required to show this navigation item',
                      name: 'featureFlag',
                      type: 'string',
                    }),
                  ],
                  icon: LinkIcon,
                  type: 'object',
                },
              ],
              title: 'Links',
              type: 'array',
            }),
          ],
          icon: BlockElementIcon,
          type: 'object',
        },
      ],
      type: 'array',
    }),
    defineField({
      name: 'footerMessage',
      title: 'Footer Message',
      type: 'string',
    }),
  ],
  icon: CogIcon,
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
});
