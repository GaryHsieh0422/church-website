import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d'; // 7 days session

if (!JWT_SECRET) {
  console.warn('⚠️ JWT_SECRET is not set in environment variables!');
}

const secret = new TextEncoder().encode(JWT_SECRET || 'dev-secret-change-me-in-production');

/**
 * Sign a JWT for an admin user.
 */
export async function signJwt(payload: { userId: string; email: string }): Promise<string> {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secret);
}

/**
 * Verify a JWT token. Returns payload if valid, null otherwise.
 */
export async function verifyJwt(token: string): Promise<{ userId: string; email: string } | null> {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}

/**
 * Cookie name for the admin JWT.
 */
export const ADMIN_TOKEN_COOKIE = 'admin_token';
