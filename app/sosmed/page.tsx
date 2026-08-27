"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Activity, Camera, Video, ThumbsUp, Music, Bookmark, ShieldCheck, Globe, Plus, ExternalLink } from 'lucide-react';
import Link from 'next/link';
// IMPORT KONEKTOR SUPABASE
import { supabase } from '@/lib/supabase';

interface SosmedItem {
  id: string;
  platform: string;
  username: string;
  link: string;
}

export default function SosmedPage() {
  const [sosmeds, setSosmeds] = useState<SosmedItem[]>([]);
  const [isBooting, setIsBooting] = useState(true);

  // ==========================================
  // FETCH DATA SOSMED DARI SUPABASE
  // ==========================================
  useEffect(() => {
    const fetchSosmedFromCloud = async () => {
      const { data, error } = await supabase.from('sosmed').select('*');
      if (data && data.length > 0) {
        setSosmeds(data);
      } else {
        // Data fallback jika database masih kosong
        setSosmeds([
          { id: '1', platform: 'Instagram', username: '@archanova.official', link: 'https://instagram.com' },
          { id: '2', platform: 'YouTube', username: 'Archanova Ch', link: 'https://youtube.com' },
          { id: '3', platform: 'Facebook', username: 'Archanova Base', link: 'https://facebook.com' },
          { id: '4', platform: 'TikTok', username: '@archanova.vibes', link: 'https://tiktok.com' },
          { id: '5', platform: 'Pinterest', username: 'Archanova Ideas', link: 'https://pinterest.com' },
        ]);
      }
      setTimeout(() => setIsBooting(false), 600);
    };

    fetchSosmedFromCloud();
  }, []);

  // Helper untuk menentukan Ikon & Warna Berdasarkan Nama Platform
  const getPlatformDetails = (platformName: string) => {
    const name = platformName.toLowerCase();
    if (name.includes('instagram')) return { icon: Camera, brandHex: '#E1306C' };
    if (name.includes('youtube')) return { icon: Video, brandHex: '#FF0000' };
    if (name.includes('facebook')) return { icon: ThumbsUp, brandHex: '#1877F2' };
    if (name.includes('tiktok')) return { icon: Music, brandHex: '#000000' };
    if (name.includes('pinterest')) return { icon: Bookmark, brandHex: '#E60023' };
    return { icon: Share2, brandHex: '#cc0000' }; // Default
  };

  if (isBooting) {
    return (
      <div className="w-full min-h-screen bg-[#cc0000] flex flex-col items-center justify-center text-white">
        <Share2 className="animate-pulse mb-4 text-[#ffde00]" size={56} strokeWidth={2} />
        <p className="text-lg font-black italic tracking-widest uppercase animate-pulse">
          Accessing Network...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#cc0000] text-gray-900 font-sans relative overflow-hidden z-10 flex flex-col selection:bg-yellow-400 selection:text-red-900">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[80%] bg-[#b30000] rounded-bl-[120px] rounded-tl-[40px] transform rotate-[15deg] z-0 pointer-events-none shadow-2xl"></div>
      <div className="absolute top-[-20%] right-[10%] w-[50%] h-[70%] bg-[#990000] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] z-0 pointer-events-none transform rotate-[45deg] opacity-70 blur-xl"></div>
      
      <div className="absolute bottom-[0%] left-[-5%] w-[40%] h-[60%] z-0 pointer-events-none opacity-25" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 3px, transparent 3.5px)', backgroundSize: '22px 22px', maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)' }}></div>
      <div className="absolute top-[20%] right-[0%] w-[25%] h-[60%] z-0 pointer-events-none opacity-25" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 3px, transparent 3.5px)', backgroundSize: '22px 22px', maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)' }}></div>
      <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] z-0 opacity-20 pointer-events-none transform -rotate-[25deg]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 5px, transparent 5px, transparent 25px)', maskImage: 'radial-gradient(circle, black 30%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)' }}></div>

      <div className="absolute top-[10%] right-[45%] w-[100px] h-[100px] border-t-4 border-r-4 border-white/40 rounded-tr-full z-10 transform -rotate-12"></div>
      <div className="absolute top-[15%] right-[40%] w-[60px] h-[60px] border-t-4 border-r-4 border-white/40 rounded-tr-full z-10 transform -rotate-[30deg]"></div>
      <div className="absolute top-[5%] left-[15%] w-[150px] h-[150px] border-[2px] border-white/10 rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-[25%] right-[30%] w-[250px] h-[250px] border-[1px] border-white/10 rounded-full z-0 pointer-events-none"></div>
      <div className="absolute top-[35%] left-[25%] w-[80px] border-t-[3px] border-dashed border-white/30 z-10 transform rotate-12"></div>
      
      <div className="absolute top-[12%] right-[48%] text-white/40 font-black tracking-widest text-lg transform -rotate-[20deg] z-10">///</div>
      <div className="absolute bottom-[10%] left-[45%] text-white/20 font-black tracking-widest text-sm transform rotate-45 z-10">///</div>

      <Plus className="absolute top-[52%] right-[2%] text-white opacity-90 z-10" size={32} strokeWidth={3} />
      <Plus className="absolute bottom-[20%] left-[5%] text-white opacity-40 z-10 rotate-45" size={24} strokeWidth={3} />
      <Plus className="absolute top-[18%] left-[28%] text-white opacity-30 z-10 rotate-[15deg]" size={16} strokeWidth={3} />
      
      <div className="absolute top-[18%] left-[40%] flex gap-1.5 transform rotate-[20deg] z-10 opacity-90">
        <div className="w-6 h-[5px] bg-white rounded-full"></div>
        <div className="w-2 h-[5px] bg-white rounded-full"></div>
      </div>
      <div className="absolute top-[8%] right-[25%] flex gap-1.5 transform -rotate-[20deg] z-10 opacity-90">
        <div className="w-5 h-[5px] bg-white rounded-full"></div>
        <div className="w-2 h-[5px] bg-white rounded-full"></div>
      </div>

      <div className="absolute top-[42%] right-[3%] z-10 flex flex-col items-center opacity-90 hidden lg:flex">
        <Globe size={64} strokeWidth={1} className="text-white" />
        <div className="absolute top-[42%] text-white font-bold text-[9px] tracking-[0.2em] bg-[#b30000] px-1">WWW</div>
      </div>

      {/* KONTEN UTAMA */}
      <div className="w-full h-full relative z-20 flex flex-col max-w-[1500px] mx-auto pt-6 px-4 sm:px-6 lg:px-8 pb-6">
        
        {/* HEADER NAVIGATION */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 shrink-0">
          
          <div className="relative transform -rotate-[4deg] skew-x-[-8deg] ml-4 lg:ml-8 mt-4 z-40 w-max">
            <div className="absolute inset-0 bg-[#a60000] rounded-2xl md:rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] border-b-[6px] md:border-b-[10px] border-r-[4px] md:border-r-[6px] border-[#7a0000] z-[-1] scale-[1.05] translate-y-2"></div>
            
            <div className="absolute top-[-20px] left-[15px] bg-white text-[#cc0000] font-black italic text-[10px] md:text-xs px-4 py-1.5 rounded-xl rounded-bl-none rounded-br-md shadow-[rgba(139,0,0,1)_3px_5px_0px_0px] border-b-[2px] border-r-[2px] border-gray-200 z-50 flex items-center gap-1.5 uppercase tracking-widest">
              <ShieldCheck size={14} strokeWidth={3} /> ARCH_NOVA DB // NETWORK
            </div>

            <div className="flex flex-col items-start z-30 px-6 py-4 pb-3 pt-6">
              <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[0.8] font-black italic text-white promo-text-3d uppercase tracking-tighter whitespace-nowrap">
                JEJARING SOSIAL
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto mt-4 lg:mt-0 z-20">
            <Link href="/" className="px-6 py-3 bg-[#5a0000] hover:bg-[#3a0000] text-white font-black italic text-xs md:text-sm uppercase tracking-widest transition-colors rounded-full shadow-[0_5px_15px_rgba(100,0,0,0.4)] border-b-[3px] border-[#330000] flex items-center gap-2 shrink-0 hover:-translate-y-1">
              <ArrowLeft size={16} strokeWidth={3} /> EXIT
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col justify-center min-h-0 pt-2 px-1">
          
          {/* BANNER CARD UTAMA */}
          <div className="w-full max-w-[1400px] mx-auto mb-10 md:mb-14 relative px-2 md:px-4 z-30 animate-fade-in-up">
            <div className="relative transform -skew-x-6 w-full group">
               <div className="absolute inset-0 bg-[#7a0000] rounded-3xl translate-y-3 translate-x-2 md:translate-y-4 md:translate-x-3 shadow-[0_20px_40px_rgba(100,0,0,0.6)]"></div>
               <div className="relative w-full h-[140px] md:h-[200px] bg-black rounded-3xl overflow-hidden border-[4px] md:border-[6px] border-white flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1974&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transform skew-x-6 scale-110 group-hover:scale-125 transition-transform duration-[1.5s] ease-out" 
                  />
                  <div className="relative z-10 w-full px-8 md:px-16 transform skew-x-6 flex flex-col items-start">
                     <div className="bg-[#ffde00] text-[#990000] px-3 py-1 md:px-4 md:py-1.5 rounded-lg text-[10px] md:text-xs font-black italic uppercase tracking-widest shadow-md flex items-center gap-2 mb-2 border-b-[3px] border-[#ccaa00]">
                        <Activity size={16} strokeWidth={3} className="animate-pulse" /> GLOBAL_HUB
                     </div>
                     <h2 className="text-3xl md:text-5xl lg:text-6xl font-black italic text-white uppercase tracking-tighter drop-shadow-2xl promo-text-3d">
                        STAY CONNECTED.
                     </h2>
                  </div>
               </div>
            </div>
          </div>

          {/* GRID KARTU SOSMED BERDASARKAN SUPABASE */}
          <div className="w-full flex items-center justify-center relative pb-6 z-30">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-8 w-full max-w-[1400px] px-4 mx-auto">
              
              {sosmeds.map((item, index) => {
                const details = getPlatformDetails(item.platform);
                const Icon = details.icon;
                return (
                  <a 
                    key={item.id}
                    href={item.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block group transform -skew-x-6 animate-fade-in-up cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                     <div className="absolute inset-0 bg-[#7a0000] rounded-2xl translate-y-2 translate-x-2 transition-transform duration-300 group-hover:translate-y-4 group-hover:translate-x-3 group-active:translate-y-1 group-active:translate-x-1 shadow-xl"></div>
                     
                     <div className="relative bg-white border-[3px] md:border-[4px] border-white rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:-translate-x-1 group-active:translate-y-1 group-active:translate-x-1 shadow-md">
                        <div className="transform skew-x-6 flex flex-col items-center w-full">
                           <div className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 flex items-center justify-center rounded-2xl shadow-[0_8px_15px_rgba(0,0,0,0.2)] transform group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: details.brandHex }}>
                              <Icon className="w-6 h-6 md:w-8 md:h-8" color="#ffffff" strokeWidth={2.5} />
                           </div>
                           
                           <h3 className="font-black italic text-sm md:text-lg uppercase tracking-tighter text-[#cc0000] group-hover:text-[#990000] transition-colors leading-none mb-2 md:mb-3 text-center truncate w-full">
                              {item.platform}
                           </h3>
                           
                           <div className="bg-[#ffde00] w-full py-1.5 md:py-2 rounded-lg border-b-[2px] md:border-b-[3px] border-[#ccaa00] flex justify-center items-center shadow-inner group-hover:bg-[#cc0000] group-hover:border-[#990000] transition-colors duration-300">
                              <span className="text-[#990000] group-hover:text-white font-black italic text-[8px] md:text-[10px] uppercase tracking-widest truncate px-2 transition-colors duration-300">
                                 {item.username}
                              </span>
                           </div>
                        </div>
                     </div>
                  </a>
                );
              })}

            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
        body { font-family: 'Montserrat', sans-serif; }
        a { -webkit-tap-highlight-color: transparent; }
        .promo-text-3d {
          text-shadow: 
            1px 1px 0 #7a0000, 2px 2px 0 #7a0000, 3px 3px 0 #7a0000, 4px 4px 0 #7a0000,
            5px 5px 0 #7a0000, 6px 6px 0 #7a0000, 7px 7px 0 #7a0000, 8px 8px 0 #7a0000,
            9px 9px 0 #7a0000, 10px 10px 0 #5c0000, 11px 11px 0 #5c0000, 12px 12px 0 #5c0000,
            13px 13px 25px rgba(0,0,0,0.6);
        }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}