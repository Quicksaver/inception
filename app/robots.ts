export default function robots() {
  return {
    rules: [
      {
        disallow: process.env.NEXT_PUBLIC_BUILD_ENVIRONMENT === 'production' ? '' : '/',
        userAgent: '*',
      },
    ],
  };
}
