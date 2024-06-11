import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from "@/app/utils/supabase/middleware";

const protectedRedirectRoute = "/home";
const loginRoute = "/login";
const rootRoute = "/";

export async function middleware(
  request: NextRequest
) {
  const path = new URL(request.url).pathname;
  const { supabase, response } = createClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    user && (path === rootRoute || path === loginRoute)
  ) {
    return NextResponse.redirect(
      new URL(protectedRedirectRoute, request.url)
    );
  }

  // Redirect to login if user is not logged in
  if (!user && ![rootRoute, loginRoute].includes(path.toLowerCase())) {
    return NextResponse.redirect(
      new URL(loginRoute, request.url)
    );
  }
  
  // if (!user && !request.nextUrl.pathname.startsWith("/login")) {
  //   alert("You need to login first");
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // alert("You are logged in")

  // if (user) {
  //   return NextResponse.redirect(new URL("/home", request.url));
  // }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|login).*)"
  ],
};