import { ImageIcon } from '@sanity/icons';
import { defineArrayMember } from 'sanity';

import alt from '../fields/alt';
import imageField from '../fields/image';

const image = () => defineArrayMember(
  imageField({
    fields: [
      alt(),
      {
        name: 'subtitle',
        type: 'string',
      },
    ],
    icon: ImageIcon,
  }),
);

export default image;
