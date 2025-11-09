import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const POSTHOG_PATH = process.env.NEXT_PUBLIC_POSTHOG_PATH;

export default function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  const shouldSkipPosthogPath = !!POSTHOG_PATH && POSTHOG_PATH !== '/' && pathname.startsWith(POSTHOG_PATH);

  // If the path is not the PostHog path, and it ends with a trailing slash (but is not just '/'), remove the
  // trailing slash; this emulates the original behavior with `skipTrailingSlashRedirect: false` in next.config.js
  if (!shouldSkipPosthogPath && pathname.length > 1 && pathname.endsWith('/')) {
    const baseUrl = new URL(nextUrl);
    baseUrl.pathname = pathname.replace(/\/+$/, '') || '/';

    const redirectUrl = nextUrl.clone();
    redirectUrl.href = baseUrl.href;

    // We can't set `pathname` directly on redirectUrl because it sets an internal trailingSlash value that we cannot
    // override. The goal is to remove the trailing slash, but in then end the url would still have it.

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
