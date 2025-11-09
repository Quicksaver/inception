import { type SchemaPluginOptions } from 'sanity';

import { blogArticleType } from './types/blogArticle';
import { pageType } from './types/page';
import { pageBodyType } from './types/pageBody';
import { siteSettingsType } from './types/siteSettings';

const schema: SchemaPluginOptions = {
  types: [
    pageBodyType,
    blogArticleType,
    pageType,
    siteSettingsType,
  ],
};

export default schema;
