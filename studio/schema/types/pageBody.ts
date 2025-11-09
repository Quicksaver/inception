import image from '../members/image';
import quote from '../members/quote';

import body from './body';

/**
 * This is the schema type for block content used in the page document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'pageBody'
 *  }
 */

export const pageBodyType = body({
  name: 'pageBody',
  of: [
    image(),
    quote(),
  ],
});
