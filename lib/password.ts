import bcrypt from 'bcryptjs';

/**
 * Hash a plain text password using bcrypt.
 * This file must only be imported in server-side code (never middleware or client).
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify a plain password against a bcrypt hash.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
