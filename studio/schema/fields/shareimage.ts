import { type Rule } from 'sanity';

import image from './image';

export default function shareimage(params?: { [key: string]: unknown }) {
  return image({
    description: 'The image that appears when the page is shared on social media. JPG/PNG 1200x630 under 8Mb is recommended.',
    name: 'shareimage',
    options: {
      accept: 'image/jpeg, image/png',
    },
    title: 'Share Image',
    validation: (rule: Rule) => [
      rule.required(),
    ],
    ...params,
  });
}
