import { 
  NextResponse, 
  NextRequest 
} from 'next/server';
import { createClient } from '@/app/utils/supabase/middleware';

const protectedRedirectRoute = "/briefs";

export async function middleware(
  req: NextRequest
) {
  const { 
    supabase, 
    response 
  } = await createClient(req);

  const path = new URL(req.url).pathname;

  const {
    data: { 
      user: session
    },
    error,
  } = await supabase
    .auth
    .getUser();

  if (error) {
    console.log(error);
  };

  // Redirect to login if no session
  // TODO: Implement logic to redirect to login if no session
  
  if (session && (
    path === "/" || 
    path === "/login"
  )) {
    return NextResponse
      .redirect(new URL(
        `${protectedRedirectRoute}`, 
        req.url
      )
    );
  };

  return response;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|login).*)"],
};