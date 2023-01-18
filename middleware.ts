import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { protectedRoutesInfo } from './src/constants/protectedRoutes';

const protectedRoutes = Object.keys(protectedRoutesInfo).sort();

const isProtected = (route: string): boolean => {
  let left: number = 0;
  let right: number = protectedRoutes.length - 1;

  while (left <= right) {
    const mid: number = Math.floor((left + right) / 2);

    if (protectedRoutes[mid] === route) return true;
    if (route < protectedRoutes[mid]) right = mid - 1;
    else left = mid + 1;
  }

  return false;
};

const PUBLIC_FILE = /\.(.*)$/;
const SPEC = /\/[\da-f]{8}(-[\da-f]{4}){3}-[\da-f]{12}$/;

const removeSpec = (pathname: string): string => {
  if (SPEC.test(pathname.toLowerCase())) {
    return pathname.slice(0, pathname.lastIndexOf('/'));
  }
  return pathname;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }
  const route = removeSpec(pathname);

  if (isProtected(route)) {
    const access = protectedRoutesInfo[route];

    const access_token = request.cookies.get('access_token_cookie');
    const headers = access_token
      ? { Cookie: `access_token_cookie=${access_token}` }
      : undefined;

    const accepted = await access(pathname, headers);
    if (typeof accepted != 'boolean') {
      return NextResponse.redirect(request.nextUrl.origin + accepted);
    }
    if (!accepted)
      return NextResponse.redirect(request.nextUrl.origin + '/403');
  }
  return NextResponse.next();
}
