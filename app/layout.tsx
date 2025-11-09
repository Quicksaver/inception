// Import the global styles first to avoid CSS order issues, i.e. css modules could be bundled
// before the global styles, which includes external imports (i.e. fonts) that need to be at the
// top of the CSS file.
import 'scss/root.scss';

// NOTE: There's a bug that prevents Nextjs from bundling the global css in the correct order:
// https://github.com/vercel/next.js/issues/64921
// Server component global styles are bundled after server component module styles; global
// precedence seems to be only applied for client components, so we import them as client styles.
// This currently does not apply here, but if we import extra server components with their own
// module styles, we will need to import the root global styles as a client component module style.

import './layout.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className="theme--light"
      lang="en"
    >
      { children }
    </html>
  );
}
