import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { createSession, SESSION_COOKIE, SESSION_DURATION } from "@/lib/auth";

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Kullanıcı adı ve şifre gerekli" },
        { status: 400 }
      );
    }

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: "Sunucu yapılandırma hatası" },
        { status: 500 }
      );
    }

    const isUsernameValid = safeCompare(username, adminUsername);
    const isPasswordValid = safeCompare(password, adminPassword);

    if (!isUsernameValid || !isPasswordValid) {
      return NextResponse.json(
        { error: "Kullanıcı adı veya şifre hatalı" },
        { status: 401 }
      );
    }

    const token = await createSession();

    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
