import { BlockquoteIcon } from '@sanity/icons';
import { defineArrayMember } from 'sanity';

import PreviewQuote from '../../components/Preview/Quote';

const quote = () => defineArrayMember({
  components: {
    preview: PreviewQuote,
  },
  fields: [
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
    },
  ],
  icon: BlockquoteIcon,
  name: 'quote',
  preview: {
    select: {
      author: 'author',
      quote: 'quote',
    },
  },
  title: 'Quote',
  type: 'object',
});

export default quote;
