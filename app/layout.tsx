import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Archanova",
  description: "Pusat arsip dan kolaborasi kreatif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-[#0B0F19] text-gray-100 font-sans relative overflow-x-hidden">
        {/* Efek Cahaya Global (Diperbaiki: Hanya menggunakan 'fixed') */}
        <div className="fixed top-1/2 left-1/3 -translate-y-1/2 w-150 h-150 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed top-20 right-20 w-100 h-100 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

        {/* Sidebar dipanggil di sini */}
        <Sidebar />
        
        <main className="flex-1 relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}