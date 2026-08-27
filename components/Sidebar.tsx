'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, HardDrive, PenTool, StickyNote, Archive, Layers, Users, Share2, Settings } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Drive', path: '/drive', icon: HardDrive },
    { name: 'Design', path: '/design', icon: PenTool },
    { name: 'Catatan', path: '/catatan', icon: StickyNote },
    { name: 'Bahan', path: '/bahan', icon: Archive },
    { name: 'Highlight', path: '/highlight', icon: Layers },
    { name: 'Anggota', path: '/anggota', icon: Users },
    { name: 'Sosial Media', path: '/sosmed', icon: Share2 },
  ];

  return (
    <div className="w-20 bg-[#111622]/80 backdrop-blur-xl border-r border-gray-800/60 flex flex-col justify-between items-center py-6 shadow-2xl z-50 transition-all duration-300 h-screen sticky top-0">
      <div className="flex flex-col items-center w-full">
        <Link href="/">
          <div className="w-12 h-12 bg-cyan-500 text-[#0B0F19] rounded-2xl flex items-center justify-center font-extrabold text-2xl mb-8 shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:scale-105 transition-all cursor-pointer">A</div>
        </Link>
        <div className="flex flex-col space-y-5 w-full">
          {menus.map((menu, index) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.path;
            return (
              <div key={index} className="relative group flex items-center justify-center w-full">
                <Link href={menu.path} className={`relative p-3 rounded-xl transition-all duration-300 ease-in-out ${isActive ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-500'} hover:scale-110 hover:text-cyan-400 group-hover:bg-cyan-500/10`}>
                  <Icon strokeWidth={isActive ? 2 : 1.5} size={26} />
                  {isActive && <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-10 w-1.5 bg-cyan-400 rounded-r-lg shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-300"></div>}
                </Link>
                <div className="absolute left-16 bg-gray-800 text-gray-100 text-xs font-medium py-1.5 px-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible -translate-x-2.5 group-hover:translate-x-0 transition-all duration-300 ease-out shadow-lg whitespace-nowrap z-50 border border-gray-700">
                  {menu.name}
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-gray-800"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative group flex items-center justify-center w-full mt-4">
        <Link href="/admin" className={`relative p-3 rounded-xl transition-all duration-300 ease-in-out ${pathname === '/admin' ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-500'} hover:scale-110 hover:text-cyan-400 group-hover:bg-cyan-500/10`}>
          <Settings strokeWidth={pathname === '/admin' ? 2 : 1.5} size={26} />
          {pathname === '/admin' && <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-10 w-1.5 bg-cyan-400 rounded-r-lg shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-300"></div>}
        </Link>
        <div className="absolute left-16 bg-gray-800 text-gray-100 text-xs font-medium py-1.5 px-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible -translate-x-2.5 group-hover:translate-x-0 transition-all duration-300 ease-out shadow-lg whitespace-nowrap z-50 border border-gray-700">
          Admin
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-gray-800"></div>
        </div>
      </div>
    </div>
  );
}