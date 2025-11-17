import isNumeric from 'utils/isNumeric';

export interface BlogParameters {
  page: number;
  perPage: number;
  query: string;
  tag: string;
}

const defaultBlogParameters = {
  page: 1,
  perPage: 6,
  query: '',
  tag: '',
};

let blogParameters: BlogParameters = defaultBlogParameters;

export const processBlogParameters = (parameters?: string[]) => (parameters || [])
  .reduce((acc, cur) => {
    if (cur) {
      const value = decodeURIComponent(cur);
      if (isNumeric(value)) {
        return {
          ...acc,
          page: Number(value),
        };
      }

      if (value.startsWith('tag:')) {
        return {
          ...acc,
          tag: value.slice(4),
        };
      }

      if (value) {
        return {
          ...acc,
          query: value,
        };
      }
    }

    return acc;
  }, defaultBlogParameters);

export const getBlogParameters = () => blogParameters;

export const setBlogParameters = (parameters: string[]) => {
  blogParameters = processBlogParameters(parameters);
  return blogParameters;
};

export function blogUrlBuilder(params: Partial<BlogParameters> = blogParameters) {
  const current = getBlogParameters();

  const parameters = [
    // eslint-disable-next-line no-nested-ternary
    'query' in params
      ? (params.query
        ? encodeURIComponent(params.query)
        : null)
      : current.query,
    // eslint-disable-next-line no-nested-ternary
    'tag' in params
      ? (params.tag
        ? `tag:${params.tag}`
        : null)
      : (current.tag
        ? `tag:${current.tag}`
        : null
      ),
    'page' in params ? params.page : current.page,
  ].filter(Boolean);

  return parameters.length
    ? `/news/${parameters.join('/')}`
    : '/news';
}
