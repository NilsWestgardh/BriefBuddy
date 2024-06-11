import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/app/utils/supabase/middleware";

const routes = {
  root: "/",
  login: "/login",
  home: "/home",
};

export async function middleware(
  request: NextRequest
) {
  const {
    supabase,
    response
  } = createClient(request);

  const path = new URL(request.url).pathname;

  const isProtectedRoute = path !== routes.root && path !== routes.login;

  if (!isProtectedRoute) {
    return response;
  }

  const { 
    data: { 
      user: session 
    }
  } = await supabase
    .auth
    .getUser()

  if (!session) {
    return NextResponse.redirect(
      new URL(routes.login, request.url)
    );
  }

  if (session && (
    path === routes.login || path === routes.root
  )) {
    return NextResponse.redirect(
      new URL(routes.home, request.url)
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|login).*)"],
};