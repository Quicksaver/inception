import { type SchemaPluginOptions } from 'sanity';

import { aboutType } from './types/about';
import { associatedPartnersType } from './types/associatedPartners';
import { beneficiariesType } from './types/beneficiaries';
import { blogArticleType } from './types/blogArticle';
import body from './types/body';
import { consortiumType } from './types/consortium';
import { otherEventsType } from './types/otherEvents';
import { pageType } from './types/page';
import { pageBodyType } from './types/pageBody';
import { positionsType } from './types/positions';
import { scientificWorkPackagesType } from './types/scientificWorkPackages';
import { siteSettingsType } from './types/siteSettings';
import { trainingType } from './types/training';
import { trainingEventsType } from './types/trainingEvents';

const schema: SchemaPluginOptions = {
  types: [
    pageBodyType,

    aboutType,
    associatedPartnersType,
    beneficiariesType,
    blogArticleType,
    body({
      name: 'body',
    }),
    consortiumType,
    otherEventsType,
    pageType,
    positionsType,
    scientificWorkPackagesType,
    siteSettingsType,
    trainingEventsType,
    trainingType,
  ],
};

export default schema;
