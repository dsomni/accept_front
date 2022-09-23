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

// const apiUrl = getApiUrl();

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
    const accessLevel = protectedRoutesInfo[route];
    const access_token = request.cookies.get('access_token_cookie');
    const headers = access_token
      ? {
          Cookie: `access_token_cookie=${request.cookies.get(
            'access_token_cookie'
          )}`,
        }
      : undefined;
    const user_level_response = await fetch(
      `${process.env.API_ENDPOINT}/api/accessLevel`,
      {
        method: 'GET',
        headers: headers,
      }
    );

    if (user_level_response.status === 401) {
      return NextResponse.redirect(
        request.nextUrl.origin + `/signin?referrer=${pathname}`
      );
    }
    if (user_level_response.status === 403) {
      return NextResponse.redirect(request.nextUrl.origin + '/403');
    }
    if (user_level_response.status !== 200)
      return NextResponse.redirect(request.nextUrl.origin + `/500`);
    const user_level = await user_level_response.json();
    console.log(user_level);

    if (user_level < accessLevel)
      return NextResponse.redirect(request.nextUrl.origin + '/403');
  }
  return NextResponse.next();
}
