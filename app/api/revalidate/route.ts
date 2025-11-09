import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { SanityDocument } from 'next-sanity';
import { parseBody } from 'next-sanity/webhook';

type WebhookResponseDocument = SanityDocument<{
  slug?: { current: string };
}>;

interface WebhookPayload {
  after?: null | WebhookResponseDocument;
  before?: null | WebhookResponseDocument;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response('Missing environment variable SANITY_REVALIDATE_SECRET', { status: 500 });
    }

    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      request,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(JSON.stringify({ isValidSignature, message }), { status: 401 });
    }

    if (!body) {
      return new Response(JSON.stringify({ message: 'Invalid body received' }), { status: 400 });
    }

    const { after, before } = body;
    const type = after?._type || before?._type;

    if (!type) {
      // eslint-disable-next-line no-console
      console.log({ body });
      return new Response(JSON.stringify({ message: 'Bad Request' }), { status: 400 });
    }

    switch (type) {
      case 'blogArticle':
      case 'page': {
        revalidateTag(type, 'max');

        if (after?.slug?.current) {
          revalidateTag(`${type}:${after.slug.current}`, 'max');
        }

        if (before?.slug?.current && before.slug.current !== after?.slug?.current) {
          revalidateTag(`${type}:${before.slug.current}`, 'max');
        }

        const message = `Marked ${type} for revalidation: ${after?.slug?.current || before?.slug?.current}`;

        // eslint-disable-next-line no-console
        console.log(message);
        return NextResponse.json({ message });
      }

      default: {
        revalidateTag(type, 'max');

        const message = `Marked tag "${type}" for revalidation`;

        // eslint-disable-next-line no-console
        console.log(message);
        return NextResponse.json({ message });
      }
    }
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return new Response((error as Error).message, { status: 500 });
  }
}
