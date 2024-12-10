import { type NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
  const { ip } = request;
  const { device, browser, os } = userAgent(request);

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-user-device', device.type || 'unknown');
  requestHeaders.set('x-user-browser', browser.name || 'unknown');
  requestHeaders.set('x-user-os', os.name || 'unknown');
  requestHeaders.set('DT-SMSF-IP-Origin', ip || 'unknown');

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};
