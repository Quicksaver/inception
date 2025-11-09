'use client';

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';

import { apiVersion, dataset, projectId } from './studio/env';
import schema from './studio/schema';
import structure from './studio/structure';

const plugins = [
  structureTool({ structure }),
  media(),
];

if (process.env.NODE_ENV === 'development') {
  plugins.push(visionTool({ defaultApiVersion: apiVersion }));
}

export default defineConfig({
  basePath: '/',
  dataset,
  plugins,
  projectId,
  schema,
  title: 'Inception',
});
