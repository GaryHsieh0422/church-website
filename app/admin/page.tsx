import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/auth';
import AdminDashboard from './AdminDashboard';

// Force dynamic so we never try to statically prerender the admin
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  let userEmail = '';
  if (token) {
    const payload = await verifyJwt(token);
    if (payload) {
      userEmail = payload.email;
    }
  }

  return (
    <AdminDashboard initialUserEmail={userEmail} />
  );
}
