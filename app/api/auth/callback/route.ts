"use server";

import { createClient } from "@/app/utils/supabase/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const protectedRedirectRoute = "/home";

export async function GET(
  req: NextRequest
) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Exchange code for session
    const { 
      error 
    } = await supabase
      .auth
      .exchangeCodeForSession(code);

    if (error) {
      return Response.redirect(
        `${url.origin}/login?error=${encodeURIComponent(error.message)}`
      );
    }
    // Ensure the correct redirection to the protected route
    Response.redirect(`${url.origin}${protectedRedirectRoute}`) // Changed from just url.origin

  } else {
    console.log("No code to exchange for session found.");
    return Response.redirect(`${url.origin}/login?error=No code provided.`);
  }
}
