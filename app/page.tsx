'use client'

import { useState, useEffect } from 'react';
import { Globe, Plus, Gift, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  
  const [mainTitle, setMainTitle] = useState("ARCHANOVA");
  const [subTitle, setSubTitle] = useState("JURNALIS");
  const [mainImage, setMainImage] = useState("https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop");

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 300);
    const savedTitle = localStorage.getItem('archanova_judul');
    const savedImage = localStorage.getItem('archanova_gambar');
    
    // Memisah judul jika ada spasinya
    if (savedTitle) {
      const parts = savedTitle.split(' ');
      setMainTitle(parts[0] || "ARCHANOVA");
      if(parts.length > 1) setSubTitle(parts.slice(1).join(' '));
    }
    if (savedImage) setMainImage(savedImage);
    
    return () => clearTimeout(timer);
  }, []);

  if (isBooting) return <div className="min-h-screen bg-[#d30b0b]"></div>;

  return (
    <div className="relative min-h-screen w-full bg-[#cc0000] overflow-hidden font-sans flex items-center justify-center selection:bg-yellow-400 selection:text-red-900">
      
      {/* ========================================================= */}
      {/* 1. BACKGROUND ELEMENTS (SEMAKIN RUMIT & PADAT) */}
      {/* ========================================================= */}
      
      {/* Gelombang Latar Belakang Kanan Atas */}
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[80%] bg-[#b30000] rounded-bl-[120px] rounded-tl-[40px] transform rotate-[15deg] z-0 pointer-events-none shadow-2xl"></div>
      <div className="absolute top-[-20%] right-[10%] w-[50%] h-[70%] bg-[#990000] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] z-0 pointer-events-none transform rotate-[45deg] opacity-70 blur-xl"></div>
      
      {/* Pola Titik-Titik (Halftone) Kiri Bawah & Kanan */}
      <div 
        className="absolute bottom-[0%] left-[-5%] w-[40%] h-[60%] z-0 pointer-events-none opacity-25" 
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 3px, transparent 3.5px)', backgroundSize: '22px 22px', maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)' }}>
      </div>
      <div 
        className="absolute top-[20%] right-[0%] w-[25%] h-[60%] z-0 pointer-events-none opacity-25" 
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 3px, transparent 3.5px)', backgroundSize: '22px 22px', maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)' }}>
      </div>

      {/* Pola Garis Diagonal (Stripes) Kanan Bawah */}
      <div 
        className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] z-0 opacity-20 pointer-events-none transform -rotate-[25deg]"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 5px, transparent 5px, transparent 25px)', maskImage: 'radial-gradient(circle, black 30%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)' }}>
      </div>

      {/* Ornamen Garis Melengkung Putih (Abstract Curves) */}
      <div className="absolute top-[10%] right-[45%] w-[100px] h-[100px] border-t-4 border-r-4 border-white/40 rounded-tr-full z-10 transform -rotate-12"></div>
      <div className="absolute top-[15%] right-[40%] w-[60px] h-[60px] border-t-4 border-r-4 border-white/40 rounded-tr-full z-10 transform -rotate-[30deg]"></div>

      {/* ELEMEN TAMBAHAN BARU: Lingkaran Transparan, Garis Dashed, Aksen /// */}
      <div className="absolute top-[5%] left-[15%] w-[150px] h-[150px] border-[2px] border-white/10 rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-[25%] right-[30%] w-[250px] h-[250px] border-[1px] border-white/10 rounded-full z-0 pointer-events-none"></div>
      <div className="absolute top-[35%] left-[25%] w-[80px] border-t-[3px] border-dashed border-white/30 z-10 transform rotate-12"></div>
      <div className="absolute top-[12%] right-[48%] text-white/40 font-black tracking-widest text-lg transform -rotate-[20deg] z-10">///</div>
      <div className="absolute bottom-[10%] left-[45%] text-white/20 font-black tracking-widest text-sm transform rotate-45 z-10">///</div>

      {/* Ornamen Melayang (Percikan / Sparkles / Garis / Plus) */}
      <Plus className="absolute top-[52%] right-[2%] text-white opacity-90 z-10" size={32} strokeWidth={3} />
      <Plus className="absolute bottom-[20%] left-[5%] text-white opacity-40 z-10 rotate-45" size={24} strokeWidth={3} />
      {/* Ekstra Plus */}
      <Plus className="absolute top-[18%] left-[28%] text-white opacity-30 z-10 rotate-[15deg]" size={16} strokeWidth={3} />
      <Plus className="absolute bottom-[35%] right-[35%] text-white opacity-20 z-10 -rotate-12" size={20} strokeWidth={4} />
      
      {/* Sparkle 1 (Kiri atas) */}
      <div className="absolute top-[18%] left-[40%] flex gap-1.5 transform rotate-[20deg] z-10 opacity-90">
        <div className="w-6 h-[5px] bg-white rounded-full"></div>
        <div className="w-2 h-[5px] bg-white rounded-full"></div>
      </div>
      
      {/* Sparkle 2 (Kanan atas) */}
      <div className="absolute top-[8%] right-[25%] flex gap-1.5 transform -rotate-[20deg] z-10 opacity-90">
        <div className="w-5 h-[5px] bg-white rounded-full"></div>
        <div className="w-2 h-[5px] bg-white rounded-full"></div>
      </div>

      {/* Sparkle 3 (Ekstra Tengah Kiri) */}
      <div className="absolute bottom-[40%] left-[10%] flex gap-1.5 transform rotate-[45deg] z-10 opacity-70">
        <div className="w-4 h-[4px] bg-white rounded-full"></div>
        <div className="w-1.5 h-[4px] bg-white rounded-full"></div>
      </div>

      {/* Ikon Globe WWW (Kanan Tengah) */}
      <div className="absolute top-[42%] right-[3%] z-10 flex flex-col items-center opacity-90">
        <Globe size={64} strokeWidth={1} className="text-white" />
        <div className="absolute top-[42%] text-white font-bold text-[9px] tracking-[0.2em] bg-[#b30000] px-1">WWW</div>
      </div>


      {/* ========================================================= */}
      {/* 2. KONTEN UTAMA */}
      {/* ========================================================= */}
      <div className="relative w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between z-20 h-full mt-10 lg:mt-0 pt-16 lg:pt-0">
        
        {/* ========================================= */}
        {/* BAGIAN KIRI: TIPOGRAFI & KARTU */}
        {/* ========================================= */}
        <div className="w-full lg:w-[60%] flex flex-col items-start relative z-30">
          
          {/* GROUP TEKS & KOTAK JAJAR GENJANG (SKEWED & ROTATED) */}
          <div className="relative transform -rotate-[4deg] skew-x-[-8deg] mb-12 ml-4 lg:ml-10 z-40">
            
            {/* 1. KOTAK MERAH GELAP (JAJAR GENJANG DI BELAKANG TEKS) */}
            <div className="absolute inset-0 bg-[#a60000] rounded-2xl md:rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] border-b-[6px] md:border-b-[10px] border-r-[4px] md:border-r-[6px] border-[#7a0000] z-[-1] scale-[1.05] translate-y-2"></div>

            {/* 2. LENCANA "SISTEM" (PUTIH DI ATAS KIRI) */}
            <div className="absolute top-[-25px] left-[15px] bg-white text-[#cc0000] font-black italic text-2xl md:text-3xl lg:text-4xl px-8 py-1.5 rounded-xl rounded-bl-none rounded-br-md shadow-[rgba(139,0,0,1)_3px_5px_0px_0px] border-b-[3px] border-r-[2px] border-gray-200 z-50">
              Spansix
            </div>

            {/* 3. TEKS UTAMA (ARCHANOVA JURNALIS) */}
            <div className="flex flex-col items-start z-30 px-6 py-6 pb-4 pt-10">
              <h1 className="text-[4rem] sm:text-[6rem] lg:text-[7.5rem] leading-[0.8] font-black italic text-white promo-text-3d uppercase tracking-tighter">
                {mainTitle}
              </h1>
              <h1 className="text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] leading-[0.8] font-black italic text-white promo-text-3d uppercase tracking-tighter mt-1 md:mt-2">
                {subTitle}
              </h1>
            </div>

            {/* 4. PITA KUNING (DI BAWAH KIRI) */}
            <div className="absolute bottom-[-15px] lg:bottom-[-20px] left-[30px] bg-[#ffde00] text-[#990000] font-black italic text-sm md:text-lg lg:text-xl px-6 py-2 rounded-lg rounded-tl-none shadow-[rgba(180,130,0,1)_2px_4px_0px_0px] border-b-[3px] border-[#ccaa00] z-50">
              PUSAT ARSIP KREATIF SEKOLAH!
            </div>
            
          </div>

          {/* GROUP KARTU PUTIH BAWAH (TIDAK MIRING) */}
          <div className="w-full max-w-[650px] flex flex-col gap-4 relative z-30 lg:ml-6 mt-4">
            
            {/* KARTU PUTIH UTAMA (Mengatasi terpotongnya KARYA) */}
            {/* Menghapus overflow-hidden dan memperlebar area fleksibel */}
            <Link href="/highlight" className="bg-white rounded-[2rem] p-5 sm:p-7 shadow-[0_15px_30px_rgba(100,0,0,0.4)] border-[3px] border-[#f0f0f0] border-b-[6px] border-gray-200 flex flex-row items-center justify-between transform transition-transform hover:-translate-y-2 group relative z-40 overflow-visible">
              
              {/* Ornamen Kilauan Merah */}
              <div className="absolute top-4 right-[25%] flex gap-1.5 transform rotate-[25deg]">
                <div className="w-1.5 h-3 bg-[#cc0000] rounded-full"></div>
                <div className="w-1.5 h-4 bg-[#cc0000] rounded-full -translate-y-1"></div>
                <div className="w-1.5 h-3 bg-[#cc0000] rounded-full transform rotate-45"></div>
              </div>

              {/* Kiri: Daftar Ekstensi File (Animasi Baru Berurutan) */}
              <div className="flex flex-col gap-2.5 w-[35%] z-10 shrink-0">
                <div className="bg-[#cc0000] text-white font-black text-center rounded-[10px] px-2 py-1.5 text-lg sm:text-2xl shadow-[inset_0_-3px_6px_rgba(0,0,0,0.2)] tracking-wider border border-red-800 animate-pulse-seq-1">Berani</div>
                <div className="bg-[#cc0000] text-white font-black text-center rounded-[10px] px-2 py-1.5 text-lg sm:text-2xl shadow-[inset_0_-3px_6px_rgba(0,0,0,0.2)] tracking-wider border border-red-800 animate-pulse-seq-2">Profesional</div>
                <div className="bg-[#cc0000] text-white font-black text-center rounded-[10px] px-2 py-1.5 text-lg sm:text-2xl shadow-[inset_0_-3px_6px_rgba(0,0,0,0.2)] tracking-wider border border-red-800 animate-pulse-seq-3">Kreatif</div>
              </div>

              {/* Kanan: Teks Raksasa Akses Karya (DIPERBAIKI ANTI POTONG) */}
              <div className="flex-1 flex flex-col items-start pl-4 sm:pl-8 cursor-pointer relative overflow-visible z-20">
                <span className="text-gray-900 font-black text-lg sm:text-xl ml-1 mb-[-10px] z-10 uppercase tracking-widest">AKSES</span>
                <div className="flex items-start w-full overflow-visible">
                  <span className="text-[#d30b0b] font-black text-2xl sm:text-4xl mt-3 sm:mt-5 mr-1 sm:mr-2">Ke</span>
                  {/* Teks "KARYA" yang dibiarkan leluasa */}
                  <span className="text-[#d30b0b] font-black text-[3.8rem] sm:text-[5.5rem] leading-none tracking-tighter group-hover:scale-[1.03] transition-transform origin-left drop-shadow-sm whitespace-nowrap">
                    KARYA
                  </span>
                </div>
              </div>
            </Link>

            {/* DUA KARTU MERAH BAWAH */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              
              <Link href="/design" className="bg-gradient-to-r from-[#de0000] to-[#b30000] rounded-[1.2rem] p-4 shadow-[inset_0_4px_10px_rgba(255,255,255,0.2),_0_10px_20px_rgba(100,0,0,0.5)] border border-[#ff4d4d] flex items-center gap-4 hover:-translate-y-1 transition-transform group">
                <div className="bg-white text-[#d30b0b] p-3 rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
                  <Gift size={32} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-lg sm:text-xl leading-tight uppercase tracking-wide">GALERI<br/>DESIGN</span>
                  <span className="text-red-200 text-[10px] sm:text-xs mt-0.5 font-medium leading-tight">Siap jualan, tinggal pakai!</span>
                </div>
              </Link>

              <Link href="/drive" className="bg-gradient-to-r from-[#de0000] to-[#b30000] rounded-[1.2rem] p-4 shadow-[inset_0_4px_10px_rgba(255,255,255,0.2),_0_10px_20px_rgba(100,0,0,0.5)] border border-[#ff4d4d] flex items-center gap-4 hover:-translate-y-1 transition-transform group">
                <div className="bg-white text-[#d30b0b] p-3 rounded-2xl shadow-inner group-hover:rotate-45 transition-transform">
                  <Settings size={32} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-lg sm:text-xl leading-tight uppercase tracking-wide">CLOUD<br/>DRIVE</span>
                  <span className="text-red-200 text-[10px] sm:text-xs mt-0.5 font-medium leading-tight">Manajemen otomatis, lebih mudah!</span>
                </div>
              </Link>

            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* BAGIAN KANAN: GAMBAR MODEL & BALON KATA */}
        {/* ========================================= */}
        <div className="w-full lg:w-[40%] h-[50vh] lg:h-[95vh] relative mt-16 lg:mt-0 flex justify-center items-end z-20 pointer-events-none">
          
          <img 
            src={mainImage} 
            alt="Model Promosi" 
            className="w-auto h-full max-h-[85vh] object-contain object-bottom relative z-20 drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] pointer-events-auto transition-transform duration-700 hover:scale-[1.02]"
          />

          {/* Balon Kata (Speech Bubble) */}
          <div className="absolute top-[10%] lg:top-[25%] right-[5%] lg:right-[-5%] z-30 bg-white text-[#990000] font-black p-4 lg:p-5 rounded-[1.5rem] shadow-[0_15px_25px_rgba(100,0,0,0.4)] transform rotate-3 animate-float max-w-[150px] text-center text-sm lg:text-[15px] leading-tight border-2 border-gray-100 pointer-events-auto">
            JADI <span className="text-[#cc0000]">KREATOR</span><br/>UNTUNG<br/>MAKSIMAL!
            
            {/* Ekor Balon Kata */}
            <div className="absolute bottom-[-18px] left-[25px] w-0 h-0 border-l-[20px] border-l-transparent border-t-[25px] border-t-white border-r-[5px] border-r-transparent transform -rotate-[15deg] filter drop-shadow-md"></div>
          </div>

        </div>

      </div>

      <style jsx global>{`
        /* CUSTOM FONT & EFEK 3D SOLID (IDENTIK DENGAN REFERENSI) */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
        
        body {
          font-family: 'Montserrat', sans-serif;
        }

        /* 
          EFEK 3D SOLID UNTUK JUDUL 
          Menumpuk shadow merah gelap secara diagonal 
        */
        .promo-text-3d {
          text-shadow: 
            1px 1px 0 #7a0000,
            2px 2px 0 #7a0000,
            3px 3px 0 #7a0000,
            4px 4px 0 #7a0000,
            5px 5px 0 #7a0000,
            6px 6px 0 #7a0000,
            7px 7px 0 #7a0000,
            8px 8px 0 #7a0000,
            9px 9px 0 #7a0000,
            10px 10px 0 #5c0000,
            11px 11px 0 #5c0000,
            12px 12px 0 #5c0000,
            13px 13px 25px rgba(0,0,0,0.6);
        }

        /* Animasi Mengambang Balon Kata */
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        .animate-float {
          animation: floatSlow 4s ease-in-out infinite;
        }

        /* ANIMASI BARU: Urutan Denyut untuk Tombol Format File */
        @keyframes pulseSeq {
          0%, 100% { transform: scale(1); filter: brightness(1); box-shadow: inset 0 -3px 6px rgba(0,0,0,0.2); }
          50% { transform: scale(1.04); filter: brightness(1.2); box-shadow: inset 0 -3px 6px rgba(0,0,0,0.1), 0 0 15px rgba(255,100,100,0.6); }
        }
        .animate-pulse-seq-1 { animation: pulseSeq 3s infinite 0s; }
        .animate-pulse-seq-2 { animation: pulseSeq 3s infinite 1s; }
        .animate-pulse-seq-3 { animation: pulseSeq 3s infinite 2s; }
      `}</style>
    </div>
  );
}