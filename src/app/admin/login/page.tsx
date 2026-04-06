"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Giriş başarısız");
      }
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        <div className="bg-white rounded-2xl border border-[#e5e5ea] shadow-sm p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/taytechlogo.webp"
              alt="Taytech"
              width={140}
              height={46}
              className="h-auto"
              priority
            />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-[20px] font-semibold text-[#1d1d1f] tracking-tight">
              Yönetim Paneli
            </h1>
            <p className="text-[13px] text-[#86868b] mt-1">
              Devam etmek için giriş yapın
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-3.5">
              <div>
                <label htmlFor="username" className="block text-[12px] font-medium text-[#86868b] mb-1.5 uppercase tracking-wide">
                  Kullanıcı Adı
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  required
                  disabled={loading}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#d2d2d7] bg-[#fafafa] text-[15px] text-[#1d1d1f] placeholder-[#c7c7cc] outline-none transition-all focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 focus:bg-white disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-[12px] font-medium text-[#86868b] mb-1.5 uppercase tracking-wide">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    className="w-full h-11 px-3.5 pr-10 rounded-xl border border-[#d2d2d7] bg-[#fafafa] text-[15px] text-[#1d1d1f] placeholder-[#c7c7cc] outline-none transition-all focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 focus:bg-white disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#acacb0] hover:text-[#1d1d1f] transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#ff3b30]/5 border border-[#ff3b30]/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="text-[13px] text-[#ff3b30]">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 mt-5 rounded-xl bg-[#1d1d1f] text-white text-[15px] font-medium transition-all hover:bg-[#333] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                "Giriş Yap"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-[#c7c7cc] mt-6">
          Taytech Enerji Teknolojileri · Yetkisiz erişim yasaktır
        </p>
      </div>
    </div>
  );
}
