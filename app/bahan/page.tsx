"use client";

import { useState, useEffect } from 'react';
import { Search, ArrowLeft, Package, X, ShieldCheck, Download, Globe, Plus, Box } from 'lucide-react';
import Link from 'next/link';
// MENGHUBUNGKAN HALAMAN BAHAN KE SUPABASE
import { supabase } from '@/lib/supabase';

interface BahanItem {
  id: string;
  judul: string;
  kategori: string;
  gambar: string;
  updatedAt: number;
}

export default function BahanPage() {
  const [bahans, setBahans] = useState<BahanItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBahan, setSelectedBahan] = useState<BahanItem | null>(null);
  const [isBooting, setIsBooting] = useState(true);

  // ==========================================
  // FETCH DATA SUPABASE
  // ==========================================
  useEffect(() => {
    const fetchBahansFromCloud = async () => {
      const { data, error } = await supabase.from('bahan').select('*');
      if (data) {
        setBahans(data.sort((a, b) => b.updatedAt - a.updatedAt));
      } else if (error) {
        console.error("Gagal mengambil data bahan:", error);
      }
      setTimeout(() => setIsBooting(false), 800);
    };

    fetchBahansFromCloud();
  }, []);

  // Filter pencarian
  const filteredBahans = bahans.filter(bahan => 
    bahan.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bahan.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // FUNGSI DOWNLOAD GAMBAR
  const handleDownload = (base64Image: string, namaFile: string) => {
    const a = document.createElement("a");
    a.href = base64Image;
    a.download = `archanova-${namaFile.replace(/\s+/g, '-').toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // ==========================================
  // LOADING SCREEN (TEMA ARCHNOVA RED)
  // ==========================================
  if (isBooting) {
    return (
      <div className="w-full min-h-screen bg-[#cc0000] flex flex-col items-center justify-center text-white">
        <Package className="animate-pulse mb-4 text-[#ffde00]" size={56} strokeWidth={2} />
        <p className="text-lg font-black italic tracking-widest uppercase animate-pulse">
          Loading Assets Library...
        </p>
      </div>
    );
  }

  return (
    // LOCK SCREEN: 100vh agar rapi dalam satu layar
    <div className="w-full h-screen bg-[#cc0000] text-gray-900 font-sans relative overflow-hidden z-10 flex flex-col selection:bg-yellow-400 selection:text-red-900">
      
      {/* ========================================================= */}
      {/* 1. BACKGROUND ELEMENTS (100% SAMA DENGAN HOME) */}
      {/* ========================================================= */}
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

      {/* ========================================================= */}
      {/* 2. KONTEN UTAMA */}
      {/* ========================================================= */}
      <div className="w-full h-full relative z-20 flex flex-col max-w-[1600px] mx-auto pt-6 px-4 sm:px-6 lg:px-12 pb-6">
        
        {/* HEADER NAVIGATION (Tema ArchNova) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 shrink-0">
          
          {/* JUDUL 3D MIRING */}
          <div className="relative transform -rotate-[4deg] skew-x-[-8deg] ml-4 lg:ml-8 mt-4 z-40 w-max">
            <div className="absolute inset-0 bg-[#a60000] rounded-2xl md:rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] border-b-[6px] md:border-b-[10px] border-r-[4px] md:border-r-[6px] border-[#7a0000] z-[-1] scale-[1.05] translate-y-2"></div>
            
            <div className="absolute top-[-20px] left-[15px] bg-white text-[#cc0000] font-black italic text-[10px] md:text-xs px-4 py-1.5 rounded-xl rounded-bl-none rounded-br-md shadow-[rgba(139,0,0,1)_3px_5px_0px_0px] border-b-[2px] border-r-[2px] border-gray-200 z-50 flex items-center gap-1.5 uppercase tracking-widest">
              <ShieldCheck size={14} strokeWidth={3} /> VISUAL ASSETS // MATERIAL
            </div>

            <div className="flex flex-col items-start z-30 px-6 py-4 pb-3 pt-6">
              <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[0.8] font-black italic text-white promo-text-3d uppercase tracking-tighter whitespace-nowrap">
                BAHAN DESAIN
              </h1>
            </div>
          </div>

          {/* KANAN: Kapsul Pencarian & Exit */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto mt-4 lg:mt-0 z-20">
            <div className="flex-1 lg:w-80 flex items-center bg-white rounded-full px-5 py-3 shadow-[0_5px_15px_rgba(100,0,0,0.3)] transition-all border-2 border-transparent focus-within:border-white/50">
              <Search className="text-[#cc0000] mr-2.5" size={18} strokeWidth={3} />
              <input 
                type="text" 
                placeholder="Cari elemen, ornamen, atau gambar..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="w-full bg-transparent border-none outline-none text-[#990000] text-xs lg:text-sm font-bold italic placeholder-gray-400" 
              />
            </div>

            <Link href="/" className="px-6 py-3 bg-[#5a0000] hover:bg-[#3a0000] text-white font-black italic text-xs md:text-sm uppercase tracking-widest transition-colors rounded-full shadow-[0_5px_15px_rgba(100,0,0,0.4)] border-b-[3px] border-[#330000] flex items-center gap-2 shrink-0 hover:-translate-y-1">
              <ArrowLeft size={16} strokeWidth={3} /> EXIT
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* AREA GRID BAHAN DESAIN (PINTEREST MASONRY) */}
        {/* ========================================================= */}
        <div className="flex-1 w-full overflow-y-auto hide-scrollbar pb-10">
          {filteredBahans.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-5 lg:gap-6 pt-2 px-2">
              {filteredBahans.map((bahan, index) => (
                <div 
                  key={bahan.id} 
                  onClick={() => setSelectedBahan(bahan)}
                  className="break-inside-avoid mb-5 lg:mb-6 cursor-pointer group bg-white rounded-[1.5rem] overflow-hidden shadow-[0_10px_30px_rgba(100,0,0,0.4)] border-b-[6px] border-r-[4px] border-gray-200 hover:border-gray-300 transition-all hover:-translate-y-2 animate-fade-in-up flex flex-col"
                  style={{ animationDelay: `${(index % 10) * 40}ms` }}
                >
                  
                  {/* Container Gambar */}
                  <div className="w-full bg-gray-100 relative p-4 flex items-center justify-center overflow-hidden border-b-2 border-gray-100">
                    {/* Pattern Tipis */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none"></div>
                    
                    <img 
                      src={bahan.gambar} 
                      alt={bahan.judul} 
                      className="w-full h-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500 relative z-10 max-h-[300px]" 
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />

                    {/* Badge Kategori Miring Kuning */}
                    <div className="absolute top-3 left-3 bg-[#ffde00] text-[#990000] px-3 py-1 rounded-lg text-[9px] font-black italic uppercase tracking-widest transform -skew-x-6 border-b-[2px] border-[#ccaa00] z-20">
                      <span className="skew-x-6 inline-block">{bahan.kategori}</span>
                    </div>
                  </div>

                  {/* Info Panel & Download Kecil */}
                  <div className="p-4 bg-white flex flex-col items-start gap-2">
                    <h3 className="font-black italic text-[#cc0000] text-sm md:text-base uppercase leading-tight line-clamp-2">
                      {bahan.judul}
                    </h3>
                    <div className="w-full flex justify-between items-center mt-1">
                      <span className="text-[9px] font-extrabold text-gray-400 tracking-widest uppercase">
                        TAP UNTUK PREVIEW
                      </span>
                      <div className="bg-gray-100 p-2 rounded-full text-gray-500 group-hover:bg-[#cc0000] group-hover:text-white transition-colors shadow-sm">
                        <Download size={14} strokeWidth={2.5}/>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center min-h-[50vh] bg-white/10 backdrop-blur-sm rounded-[2rem] border-2 border-white/20 shadow-inner">
              <Box className="text-white/50 mb-4" size={64} strokeWidth={1.5} />
              <p className="text-lg font-black italic text-white uppercase tracking-widest">Bahan Tidak Ditemukan</p>
            </div>
          )}
        </div>

      </div>

      {/* ========================================================= */}
      {/* MODAL / PREVIEW PANEL (100% ANTI-POTONG, RAPI, KEREN) */}
      {/* ========================================================= */}
      {selectedBahan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-black/80 backdrop-blur-md animate-fade-in">
          
          {/* Modal Container: Tinggi di-fix kan ke 85vh, strukturnya fleksibel di dalam */}
          <div className="relative w-full max-w-5xl h-[85vh] rounded-[2rem] bg-white border-b-[8px] border-r-[6px] border-gray-300 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-slide-up">
            
            {/* Tombol Close */}
            <button 
              onClick={() => setSelectedBahan(null)} 
              className="absolute top-4 right-4 z-50 p-2.5 bg-[#cc0000] text-white hover:bg-[#990000] rounded-full border-2 border-white backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:scale-110 shadow-lg"
            >
              <X size={20} strokeWidth={3} />
            </button>
            
            {/* 1. AREA GAMBAR (Flex-1: Mengambil sisa ruang dengan aman) */}
            <div className="relative flex-1 w-full bg-gray-100 flex flex-col items-center justify-center border-b-2 border-gray-200">
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,0,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.2)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
              <div className="absolute inset-4 bg-[#cc0000] opacity-5 transform -skew-x-6 rotate-1 rounded-3xl z-0"></div>
              
              {/* Gambar dibungkus dengan padding agar tidak menabrak batas layar */}
              <div className="absolute inset-0 p-8 md:p-12 flex items-center justify-center">
                <img 
                  src={selectedBahan.gambar} 
                  alt={selectedBahan.judul} 
                  /* CLASS PENTING: object-contain memastikan gambar TAMPIL PENUH tanpa terpotong (gepeng) */
                  className="w-auto h-auto max-w-full max-h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.3)] relative z-10" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </div>

            {/* 2. AREA PANEL BAWAH (Shrink-0: Dijamin tidak akan ketendang keluar layar) */}
            <div className="shrink-0 w-full p-5 md:p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white z-20">
              
              <div className="flex-1 text-center sm:text-left">
                <span className="bg-[#ffde00] text-[#990000] border-b-[2px] border-[#ccaa00] px-3 py-1 rounded-lg text-[9px] md:text-[10px] font-black italic uppercase tracking-widest inline-block mb-3 transform -skew-x-6 shadow-sm">
                  <span className="skew-x-6 block">KATEGORI: {selectedBahan.kategori}</span>
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black italic text-[#cc0000] uppercase tracking-tight leading-tight line-clamp-1">
                  {selectedBahan.judul}
                </h2>
              </div>

              {/* Tombol Download Besar */}
              <button 
                onClick={() => handleDownload(selectedBahan.gambar, selectedBahan.judul)}
                className="w-full sm:w-auto bg-[#cc0000] hover:bg-[#a60000] text-white font-black italic text-xs md:text-sm uppercase tracking-widest px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_6px_0px_#7a0000] border-2 border-[#ff4d4d] hover:translate-y-[4px] hover:shadow-none active:translate-y-[4px] active:shadow-none shrink-0"
              >
                <Download size={20} strokeWidth={3} /> UNDUH BAHAN
              </button>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. STYLE GLOBAL & ANIMATIONS */}
      {/* ========================================================= */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
        body { font-family: 'Montserrat', sans-serif; }
        
        .promo-text-3d {
          text-shadow: 
            1px 1px 0 #7a0000, 2px 2px 0 #7a0000, 3px 3px 0 #7a0000, 4px 4px 0 #7a0000,
            5px 5px 0 #7a0000, 6px 6px 0 #7a0000, 7px 7px 0 #7a0000, 8px 8px 0 #7a0000,
            9px 9px 0 #7a0000, 10px 10px 0 #5c0000, 11px 11px 0 #5c0000, 12px 12px 0 #5c0000,
            13px 13px 25px rgba(0,0,0,0.6);
        }

        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}</style>
    </div>
  );
}