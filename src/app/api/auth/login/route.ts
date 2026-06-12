import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";
import { createSession, SESSION_COOKIE, SESSION_DURATION } from "@/lib/auth";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 dakika

const failedAttempts = new Map<string, { count: number; firstAttempt: number }>();

function isRateLimited(ip: string): boolean {
  const entry = failedAttempts.get(ip);
  if (!entry) return false;

  if (Date.now() - entry.firstAttempt > WINDOW_MS) {
    failedAttempts.delete(ip);
    return false;
  }

  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string) {
  const entry = failedAttempts.get(ip);
  if (!entry || Date.now() - entry.firstAttempt > WINDOW_MS) {
    failedAttempts.set(ip, { count: 1, firstAttempt: Date.now() });
  } else {
    entry.count += 1;
  }
}

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

async function verifyPassword(password: string): Promise<boolean> {
  // Tercihen bcrypt hash kullan; yoksa düz metin karşılaştırmaya düş
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return safeCompare(password, adminPassword);
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Çok fazla başarısız deneme. 15 dakika sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Kullanıcı adı ve şifre gerekli" },
        { status: 400 }
      );
    }

    const adminUsername = process.env.ADMIN_USERNAME;
    if (!adminUsername || (!process.env.ADMIN_PASSWORD_HASH && !process.env.ADMIN_PASSWORD)) {
      return NextResponse.json(
        { error: "Sunucu yapılandırma hatası" },
        { status: 500 }
      );
    }

    const isUsernameValid = safeCompare(username, adminUsername);
    const isPasswordValid = await verifyPassword(password);

    if (!isUsernameValid || !isPasswordValid) {
      recordFailedAttempt(ip);
      return NextResponse.json(
        { error: "Kullanıcı adı veya şifre hatalı" },
        { status: 401 }
      );
    }

    failedAttempts.delete(ip);

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
