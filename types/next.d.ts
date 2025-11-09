export interface PagePropsWithSlug {
  params: Promise<{
    slug: string;
  }>;
}
