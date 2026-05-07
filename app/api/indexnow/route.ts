import { NextRequest, NextResponse } from 'next/server';
import { submitToIndexNow } from '@/lib/indexnow';

type IndexNowRequestBody = {
  urls?: string[];
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IndexNowRequestBody;
    const urls = Array.isArray(body.urls) ? body.urls : [];

    const result = await submitToIndexNow({ urls });

    return NextResponse.json(
      {
        success: result.ok,
        status: result.status,
        submittedUrls: result.submittedUrls,
        response: result.text,
      },
      { status: result.ok ? 200 : 502 },
    );
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
