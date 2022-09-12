import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getApiUrl } from '@utils/getServerUrl';

const protectedRoutesInfo: { [key: string]: number } = {
  '/task/add': 3,
  '/task/edit': 3,
  '/edu/assignment_schema/add': 3,
  '/edu/assignment_schema/edit': 3,
  '/edu/assignment/add': 3,
  '/edu/assignment/edit': 3,
};
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

// This function can be marked `async` if using `await` inside
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
    const users_level_responce = await fetch(
      `${process.env.API_ENDPOINT}/api/accessLevel`,
      {
        method: 'GET',
        headers: {
          Cookie: `access_token_cookie=${request.cookies.get(
            'access_token_cookie'
          )}`,
        },
      }
    );
    if (users_level_responce.status === 403) {
      if (!request.cookies.get('user'))
        return NextResponse.redirect(
          request.nextUrl.origin + `/signin?referrer=${pathname}`
        );
      return NextResponse.redirect(request.nextUrl.origin + '/403');
    }
    if (users_level_responce.status !== 200)
      return NextResponse.redirect(request.nextUrl.origin + `/500`);
    const users_level = users_level_responce.json();
    console.log(accessLevel, users_level);
  }
  return NextResponse.next();
}
