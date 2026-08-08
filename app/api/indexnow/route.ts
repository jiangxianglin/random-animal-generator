import { NextRequest, NextResponse } from 'next/server';
import {
  getAllIndexNowUrls,
  submitAllSiteUrlsToIndexNow,
  submitToIndexNow,
} from '@/lib/indexnow';

type IndexNowRequestBody = {
  urls?: string[];
  all?: boolean;
};

function isAuthorized(request: NextRequest) {
  const secret = process.env.INDEXNOW_SECRET || process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';

  if (isVercelCron) {
    return true;
  }

  if (!secret) {
    return false;
  }

  return authHeader === `Bearer ${secret}`;
}

async function handleSubmit(request: NextRequest, body?: IndexNowRequestBody) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized.' },
      { status: 401 },
    );
  }

  const urls = Array.isArray(body?.urls) ? body.urls : [];
  const submitAll = body?.all === true || urls.length === 0;

  const result = submitAll
    ? await submitAllSiteUrlsToIndexNow()
    : await submitToIndexNow({ urls });

  return NextResponse.json(
    {
      success: result.ok,
      status: result.status,
      submittedUrls: result.submittedUrls,
      response: result.text,
      mode: submitAll ? 'all' : 'urls',
    },
    { status: result.ok ? 200 : 502 },
  );
}

/** Vercel Cron + manual GET trigger (requires auth / cron header). */
export async function GET(request: NextRequest) {
  try {
    return await handleSubmit(request, { all: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'IndexNow submission failed.',
        availableUrls: getAllIndexNowUrls(),
      },
      { status: 400 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as IndexNowRequestBody;
    return await handleSubmit(request, body);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'IndexNow submission failed.',
      },
      { status: 400 },
    );
  }
}
