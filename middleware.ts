import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from "@/app/utils/supabase/middleware";

export async function middleware(
  request: NextRequest
) {
  const { supabase, response } = createClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

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