"use client";
import Link from 'next/link';
import { Globe, Plus } from 'lucide-react'; // Pastikan lucide-react terpasang

export default function HighlightPage() {
  return (
    // MAIN CONTAINER (Menggunakan background merah khas dari Home kamu)
    <div className="relative h-screen w-full bg-[#cc0000] overflow-hidden font-sans flex items-center justify-center selection:bg-yellow-400 selection:text-red-900">
      
      {/* ========================================================= */}
      {/* 1. BACKGROUND ELEMENTS (100% SAMA DENGAN HOME KAMU) */}
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

      {/* ELEMEN Lingkaran Transparan, Garis Dashed, Aksen /// */}
      <div className="absolute top-[5%] left-[15%] w-[150px] h-[150px] border-[2px] border-white/10 rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-[25%] right-[30%] w-[250px] h-[250px] border-[1px] border-white/10 rounded-full z-0 pointer-events-none"></div>
      <div className="absolute top-[35%] left-[25%] w-[80px] border-t-[3px] border-dashed border-white/30 z-10 transform rotate-12"></div>
      <div className="absolute top-[12%] right-[48%] text-white/40 font-black tracking-widest text-lg transform -rotate-[20deg] z-10">///</div>
      <div className="absolute bottom-[10%] left-[45%] text-white/20 font-black tracking-widest text-sm transform rotate-45 z-10">///</div>

      {/* Ornamen Melayang (Percikan / Sparkles / Garis / Plus) */}
      <Plus className="absolute top-[52%] right-[2%] text-white opacity-90 z-10" size={32} strokeWidth={3} />
      <Plus className="absolute bottom-[20%] left-[5%] text-white opacity-40 z-10 rotate-45" size={24} strokeWidth={3} />
      <Plus className="absolute top-[18%] left-[28%] text-white opacity-30 z-10 rotate-[15deg]" size={16} strokeWidth={3} />
      <Plus className="absolute bottom-[35%] right-[35%] text-white opacity-20 z-10 -rotate-12" size={20} strokeWidth={4} />
      
      {/* Sparkles */}
      <div className="absolute top-[18%] left-[40%] flex gap-1.5 transform rotate-[20deg] z-10 opacity-90">
        <div className="w-6 h-[5px] bg-white rounded-full"></div>
        <div className="w-2 h-[5px] bg-white rounded-full"></div>
      </div>
      <div className="absolute top-[8%] right-[25%] flex gap-1.5 transform -rotate-[20deg] z-10 opacity-90">
        <div className="w-5 h-[5px] bg-white rounded-full"></div>
        <div className="w-2 h-[5px] bg-white rounded-full"></div>
      </div>
      <div className="absolute bottom-[40%] left-[10%] flex gap-1.5 transform rotate-[45deg] z-10 opacity-70">
        <div className="w-4 h-[4px] bg-white rounded-full"></div>
        <div className="w-1.5 h-[4px] bg-white rounded-full"></div>
      </div>

      {/* Ikon Globe WWW */}
      <div className="absolute top-[42%] right-[3%] z-10 flex flex-col items-center opacity-90">
        <Globe size={64} strokeWidth={1} className="text-white" />
        <div className="absolute top-[42%] text-white font-bold text-[9px] tracking-[0.2em] bg-[#b30000] px-1">WWW</div>
      </div>


      {/* ========================================================= */}
      {/* 2. KONTEN HIGHLIGHT */}
      {/* ========================================================= */}
      <div className="relative w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-stretch justify-between z-20 h-full py-8 gap-8">
        
        {/* ========================================= */}
        {/* BAGIAN KIRI: HERO PRESTASI (Style Spansix) */}
        {/* ========================================= */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center relative z-30">
          
          {/* GROUP TEKS & KOTAK JAJAR GENJANG (Persis seperti Home) */}
          <div className="relative transform -rotate-[2deg] skew-x-[-6deg] z-40 w-full h-[70vh] flex flex-col md:flex-row">
            
            {/* KOTAK MERAH GELAP DI BELAKANG */}
            <div className="absolute inset-0 bg-[#a60000] rounded-2xl md:rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.6)] border-b-[8px] border-r-[6px] border-[#7a0000] z-[-1]"></div>

            {/* LENCANA "HIGHLIGHTS" (PUTIH DI ATAS KIRI) */}
            <div className="absolute top-[-25px] left-[15px] bg-white text-[#cc0000] font-black italic text-2xl md:text-3xl px-8 py-1.5 rounded-xl rounded-bl-none rounded-br-md shadow-[rgba(139,0,0,1)_3px_5px_0px_0px] border-b-[3px] border-r-[2px] border-gray-200 z-50">
              HIGHLIGHTS
            </div>

            {/* KONTEN KIRI: Teks Juara */}
            <div className="flex-1 px-6 py-10 pt-16 flex flex-col justify-center z-30 transform skew-x-[6deg] rotate-[2deg]">
              
              {/* MENGGUNAKAN EFEK 3D DARI HOME KAMU */}
              <h2 className="text-[2.5rem] lg:text-[4rem] leading-[0.85] font-black italic text-white promo-text-3d uppercase tracking-tighter mb-6">
                JUARA VIDEO<br/>KREATIF 2020
              </h2>
              
              <p className="text-white text-sm md:text-base font-medium leading-relaxed bg-black/20 p-4 rounded-xl border border-red-400/20 backdrop-blur-sm shadow-inner">
                Karya <span className="text-[#ffde00] italic font-bold">"masterpiece"</span> dari tim ArchAnova yang berhasil meraih posisi pertama tingkat nasional. Menampilkan sinematografi luar biasa.
              </p>
              
              {/* Tombol Baca Selengkapnya */}
              <button className="mt-6 w-max bg-white hover:bg-gray-100 text-[#cc0000] font-black italic px-6 py-3 rounded-xl shadow-[rgba(139,0,0,1)_3px_5px_0px_0px] border-b-[3px] border-r-[2px] border-gray-200 transition-transform hover:-translate-y-1 text-xs md:text-sm flex items-center gap-2 group">
                BACA SELENGKAPNYA
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>

            {/* KONTEN KANAN: Foto PNG */}
            <div className="flex-1 relative p-6 flex items-center justify-center z-30 transform skew-x-[6deg] rotate-[2deg]">
              <div className="absolute inset-4 bg-[#2a2a2a] rounded-2xl border-[4px] border-gray-600 shadow-2xl overflow-hidden flex flex-col justify-center items-center">
                 {/* Gambar Fallback */}
                 <img 
                   src="/foto-juara.png" 
                   alt="Foto Juara" 
                   className="w-full h-full object-cover" 
                   onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }}
                 />
                 <span className="hidden font-black italic text-xl text-white/30 tracking-widest uppercase">FOTO PNG</span>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================= */}
        {/* BAGIAN KANAN: YOUTUBE & FLYER STACK */}
        {/* ========================================= */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6 relative z-30 h-[70vh]">
          
          {/* YOUTUBE KARTU PUTIH */}
          <div className="flex-1 bg-white rounded-[2rem] p-5 shadow-[0_15px_30px_rgba(100,0,0,0.4)] border-b-[8px] border-r-[4px] border-gray-200 flex flex-col min-h-0 relative">
            
            {/* Label Hitam */}
            <div className="absolute top-[-15px] left-[20px] bg-[#111] text-white font-black italic px-4 py-1.5 text-[12px] rounded-lg shadow-md z-20 transform -rotate-3 border-b-2 border-gray-600">
              FEATURED VIDEO
            </div>
            
            <div className="flex justify-between items-center mb-3 mt-3 shrink-0">
              <h3 className="text-xl font-black italic text-[#cc0000] uppercase tracking-wide">KARYA SINEMATIK</h3>
              <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                 <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></span>
                 <span className="font-bold text-[9px] text-gray-500 uppercase tracking-widest">LIVE</span>
              </div>
            </div>
            
            <div className="flex-1 relative w-full bg-black rounded-xl overflow-hidden shadow-inner border border-gray-300">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="YouTube video" 
                allowFullScreen>
              </iframe>
            </div>
          </div>

          {/* FLYER STACK (Gelap) */}
          <div className="h-[35%] bg-gradient-to-r from-[#1a0000] to-[#3a0000] rounded-[2rem] p-5 shadow-[0_15px_30px_rgba(0,0,0,0.6)] border-b-[6px] border-r-[4px] border-[#7a0000] flex flex-row items-center shrink-0 relative overflow-hidden group">
             
             {/* Efek grid tipis */}
             <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

            {/* Container Tumpukan 3 Flyer */}
            <div className="relative h-full aspect-[3/4] shrink-0 z-10 ml-2 mr-6 w-24 sm:w-28">
              
              {/* Flyer 3 (Belakang) */}
              <div className="absolute top-2 left-6 w-full h-full bg-gray-800 rounded-lg shadow-lg border border-gray-600 transform rotate-[12deg] opacity-50 overflow-hidden transition-all duration-500 group-hover:rotate-[20deg] group-hover:translate-x-3">
                 <img src="/flyer3.jpg" alt="Flyer 3" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>

              {/* Flyer 2 (Tengah) */}
              <div className="absolute top-1 left-3 w-full h-full bg-gray-600 rounded-lg shadow-lg border border-gray-400 transform rotate-[6deg] opacity-80 overflow-hidden transition-all duration-500 group-hover:rotate-[10deg] group-hover:translate-x-1.5">
                 <img src="/flyer2.jpg" alt="Flyer 2" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>

              {/* Flyer 1 (Utama) */}
              <div className="absolute top-0 left-0 w-full h-full bg-white rounded-lg shadow-[0_5px_15px_rgba(0,0,0,1)] overflow-hidden border-2 border-gray-300 z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-rotate-2 flex flex-col items-center justify-center">
                <img 
                  src="/flyer-terbaik.jpg" 
                  alt="Flyer Utama"
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }}
                />
                <span className="hidden font-black italic text-[#cc0000] text-[10px] z-0">3:4</span>
              </div>
            </div>
            
            {/* Teks Flyer Kanan & Tombol Navigasi Menu */}
            <div className="flex flex-col justify-center items-start z-10 flex-1">
              <h3 className="text-base md:text-xl font-black italic text-white uppercase tracking-wide leading-tight">
                DESAIN FLYER <br/><span className="text-[#ffde00]">TERBAIK</span>
              </h3>
              
              {/* TOMBOL KUNING LINK MENU */}
              <Link href="/flyer">
                <button className="mt-3 bg-[#ffde00] hover:bg-white text-[#990000] font-black italic px-5 py-2 rounded-lg shadow-[rgba(180,130,0,1)_2px_4px_0px_0px] border-b-[3px] border-[#ccaa00] text-[10px] md:text-xs uppercase transition-all hover:-translate-y-1 active:translate-y-0 flex items-center gap-1">
                  LIHAT GALERI
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </Link>
            </div>
            
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. STYLE GLOBAL (SAMA PERSIS DENGAN HOME) */}
      {/* ========================================================= */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
        
        body {
          font-family: 'Montserrat', sans-serif;
        }

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
      `}</style>
    </div>
  );
}