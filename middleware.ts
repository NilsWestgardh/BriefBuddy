import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from "@/app/utils/supabase/middleware";

export async function middleware(
  req: NextRequest
) {
  const { 
    supabase, 
    response 
  } = await createClient(req);

  const {
    data: { user }
  } = await supabase
  .auth
  .getUser();
  
  if (!user && !req.nextUrl.pathname.startsWith("/login")) {
    console.log("Redirecting to /login")
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("User is authenticated")
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};