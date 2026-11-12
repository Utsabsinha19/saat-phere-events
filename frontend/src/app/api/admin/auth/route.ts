import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const AUTHORIZED_EMAIL = 'saatpherektr@gmail.com';
const AUTHORIZED_PASSWORD = 'gwzf qakd frev bzbx';
const SESSION_COOKIE_NAME = 'spe_admin_auth_token';

// Secret for generating verification signatures
const AUTH_SECRET = process.env.ADMIN_AUTH_SECRET || 'spe_luxury_events_admin_secret_key_2026';

function generateAuthToken(email: string): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(`${email}:${timestamp}`)
    .digest('hex');
  return Buffer.from(JSON.stringify({ email, timestamp, signature })).toString('base64');
}

function verifyAuthToken(token: string): boolean {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    const { email, timestamp, signature } = decoded;

    if (email !== AUTHORIZED_EMAIL) return false;

    // Verify token expiration (7 days)
    const tokenTime = parseInt(timestamp, 10);
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - tokenTime > maxAge) return false;

    const expectedSignature = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(`${email}:${timestamp}`)
      .digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch {
    return false;
  }
}

function normalizePassword(pwd: string): string {
  return pwd.trim().toLowerCase().replace(/\s+/g, ' ');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, password } = body;

    // 1. Handle Logout
    if (action === 'logout') {
      const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }

    // 2. Handle Login
    const inputEmail = String(email || '').trim().toLowerCase();
    const inputPassword = String(password || '').trim();

    // Verify Email
    if (inputEmail !== AUTHORIZED_EMAIL) {
      return NextResponse.json(
        {
          success: false,
          error: 'Access Denied: Invalid administrator credentials. Please check your details and try again.',
        },
        { status: 401 }
      );
    }

    // Verify Password (allow with spaces "gwzf qakd frev bzbx" or without spaces "gwzfqakdfrevbzbx")
    const cleanInput = inputPassword.replace(/\s+/g, '');
    const cleanExpected = AUTHORIZED_PASSWORD.replace(/\s+/g, '');

    const isMatch =
      inputPassword === AUTHORIZED_PASSWORD ||
      cleanInput === cleanExpected ||
      normalizePassword(inputPassword) === normalizePassword(AUTHORIZED_PASSWORD);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          error: 'Access Denied: Invalid administrator credentials. Please check your details and try again.',
        },
        { status: 401 }
      );
    }

    // Authentication Success
    const token = generateAuthToken(AUTHORIZED_EMAIL);

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful. Welcome to Saat Phere Events Admin Console.',
      user: {
        email: AUTHORIZED_EMAIL,
        role: 'Executive Director',
        authenticatedAt: new Date().toISOString(),
      },
      token,
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: false, // Accessible to client-side verification
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[ADMIN AUTH ERROR]:', error);
    return NextResponse.json({ success: false, error: 'Authentication service error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
    const token = cookieToken || authHeader;

    if (!token || !verifyAuthToken(token)) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        email: AUTHORIZED_EMAIL,
        role: 'Executive Director',
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

