export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION
  || process.env.SANITY_STUDIO_API_VERSION
  || '2025-02-21';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_API_DATASET || '';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_API_PROJECT_ID || '';
export const token = process.env.SANITY_API_READ_TOKEN || '';
