"use client";

import Sidebar from "./Sidebar";

export default function AdminLayout({ children }: any) {
  return (
    <div className="flex min-h-screen bg-[#070707] text-white">

    
      <Sidebar />

      <main className="flex-1 p-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          {children}
        </div>
      </main>

    </div>
  );
}