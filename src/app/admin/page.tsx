"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navbar */}
      <nav className="h-14 bg-white/80 backdrop-blur-xl border-b border-[#e5e5ea] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/taytechlogo.webp" alt="Taytech" width={110} height={36} className="h-auto" />
            <span className="text-[12px] font-medium text-[#86868b] bg-[#f5f5f7] px-2.5 py-1 rounded-md">
              Admin
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-[13px] text-[#86868b] hover:text-[#1d1d1f] transition-colors"
          >
            Çıkış Yap
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-[28px] font-semibold text-[#1d1d1f] tracking-tight">
            Hoş geldiniz
          </h1>
          <p className="text-[15px] text-[#86868b] mt-1.5">
            Taytech yönetim paneli
          </p>
        </div>

        <div className="max-w-sm mx-auto">
          <Link
            href="/admin/urunler"
            className="group block bg-white rounded-2xl border border-[#e5e5ea] p-6 hover:border-[#d2d2d7] hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f5f5f7] flex items-center justify-center text-[#86868b] group-hover:text-[#1d1d1f] group-hover:bg-[#e8e8ed] transition-colors mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">
              Ürün Yönetimi
            </div>
            <div className="text-[14px] text-[#86868b]">
              Ürünleri görüntüle, düzenle ve yönet
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-[13px] font-medium text-[#0071e3]">
              Ürünlere Git
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
