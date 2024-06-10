import { 
  NextResponse, 
  NextRequest 
} from "next/server";
import { createClient } from "@/app/utils/supabase/middleware";

export async function middleware(
  request: NextRequest
) {
  const { 
    supabase, 
    response 
  } = await createClient(request);

  const path = new URL(request.url).pathname;

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
  }

  if (!session) {
    return NextResponse
      .redirect(
        new URL(
          "/login", 
          request.url
        )
      );
  }

  if (session && (
    path === "/" || 
    path === "/login"
  )) {
    return NextResponse
      .redirect(new URL(
        "/home", 
        request.url
      )
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|login).*)"],
};