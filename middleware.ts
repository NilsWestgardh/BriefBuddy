import { 
  NextResponse, 
  NextRequest 
} from "next/server";
import { createClient } from "@/app/utils/supabase/middleware";

const protectedRedirectRoute = "/home";
const loginRoute = "/login";
const rootRoute = "/";

export async function middleware(
  req: NextRequest
) {
  const path = new URL(req.url).pathname;
  const { 
    supabase, 
    response 
  } = await createClient(req);

  const {
    data: { user },
    error,
  } = await supabase
  .auth
  .getUser();

  if (error) {
    console.log(error);
  }

  // Redirect authenticated users from root or login to protected route
  if (user && (path === rootRoute || user && path === loginRoute)) {
    return NextResponse.redirect(new URL(protectedRedirectRoute, req.url));
  }

  // Redirect unauthenticated users from protected routes to login
  if (!user && ![rootRoute, loginRoute].includes(path.toLowerCase())) {
    return NextResponse.redirect(new URL(loginRoute, req.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|login).*)"],
};