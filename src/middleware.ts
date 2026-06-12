import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "taytech_admin_session";

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin API rotaları: oturum yoksa 401 döndür
  if (pathname.startsWith("/api/admin")) {
    if (await isAuthenticated(request)) {
      return NextResponse.next();
    }
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  if (pathname === "/admin/login") {
    if (await isAuthenticated(request)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (await isAuthenticated(request)) {
      return NextResponse.next();
    }

    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/" });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
