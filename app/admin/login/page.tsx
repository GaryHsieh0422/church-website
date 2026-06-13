"use client";

import { useState, useEffect } from "react";

// Prevent static prerendering (needs Supabase env at runtime)
export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Auto-redirect to dashboard if we already have a valid JWT token
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          router.replace("/admin");
        }
      } catch {
        // no valid token, stay on login page
      }
    };
    checkToken();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // Successfully logged in → go to admin dashboard
      router.replace("/admin");
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfaf0] via-[#f9f0d8] to-[#f0e2b8] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              雅博堂管理後台
            </h1>
            <p className="text-gray-500 mt-2 text-sm font-sans">請登入以管理內容</p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                電郵地址
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="admin@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                密碼
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 transition-colors text-white font-semibold py-3 rounded-xl text-lg shadow-md active:scale-[0.985]"
            >
              {loading ? "登入中..." : "登入"}
            </button>
          </form>

      
        </div>
      </div>
    </div>
  );
}
