import { defineCliConfig } from 'sanity/cli';

import { dataset, projectId } from './studio/env';

export default defineCliConfig({
  api: {
    dataset,
    projectId,
  },
  deployment: {
    appId: process.env.SANITY_APP_ID || undefined,
  },
  studioHost: 'zinc-inception',
});
