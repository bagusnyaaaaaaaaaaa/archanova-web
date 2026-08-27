'use client'

import { useState, useEffect, useMemo } from 'react';
import { Search, ArrowLeft, Layers, Database, ExternalLink, Calendar, FileText, ShieldCheck, HardDrive, Copy, Check, Globe, Plus, AlignLeft, ChevronRight, Quote } from 'lucide-react';
import Link from 'next/link';
// MENGHUBUNGKAN HALAMAN DRIVE KE SUPABASE
import { supabase } from '@/lib/supabase';

interface DriveItem {
  id: string;
  judul: string;
  kategori: string;
  tanggal: string;
  deskripsi: string;
  link: string; 
  gambarPreview: string;
  updatedAt: number;
}

export default function DrivePage() {
  const [drives, setDrives] = useState<DriveItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedDrive, setSelectedDrive] = useState<DriveItem | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ==========================================
  // FETCH DATA SUPABASE
  // ==========================================
  useEffect(() => {
    const fetchDrivesFromCloud = async () => {
      const { data, error } = await supabase.from('drive').select('*');
      if (data) {
        setDrives(data);
      } else if (error) {
        console.error("Gagal mengambil data drive:", error);
      }
      setTimeout(() => setIsBooting(false), 800);
    };

    fetchDrivesFromCloud();
  }, []);

  const sortedDrives = [...drives].sort((a, b) => b.updatedAt - a.updatedAt);

  const categories = useMemo(() => {
    const catList = drives.map(d => d.kategori).filter(Boolean);
    return Array.from(new Set(catList)).sort();
  }, [drives]);

  const filteredDrives = sortedDrives.filter(drive => {
    const matchSearch = 
      drive.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
      drive.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === "Semua" || drive.kategori === selectedCategory;
    return matchSearch && matchCategory;
  });

  const displayedDrives = filteredDrives.slice(0, 10);

  useEffect(() => {
    if (displayedDrives.length > 0) {
      const isSelectedStillValid = displayedDrives.some(d => d.id === selectedDrive?.id);
      if (!isSelectedStillValid) {
        handleSelectDrive(displayedDrives[0]);
      }
    } else {
      setSelectedDrive(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory, drives]);

  const handleSelectDrive = (drive: DriveItem) => {
    if (selectedDrive?.id === drive.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedDrive(drive);
      setIsTransitioning(false);
    }, 200); 
  };

  const handleCopyLink = (link: string) => { 
    navigator.clipboard.writeText(link); 
    setIsCopied(true); 
    setTimeout(() => setIsCopied(false), 2000); 
  };

  if (isBooting) {
    return (
      <div className="w-full min-h-screen bg-[#cc0000] flex flex-col items-center justify-center text-white">
        <Database className="animate-pulse mb-4 text-[#ffde00]" size={56} strokeWidth={2} />
        <p className="text-lg font-black italic tracking-widest uppercase animate-pulse">
          Accessing Cloud Archive...
        </p>
      </div>
    );
  }

  return (
    // LOCK SCREEN: 100vh, tidak ada scroll di body utama
    <div className="w-full h-screen bg-[#cc0000] text-gray-900 font-sans relative overflow-hidden z-10 flex flex-col selection:bg-yellow-400 selection:text-red-900">
      
      {/* ========================================================= */}
      {/* 1. BACKGROUND ELEMENTS */}
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
      <Plus className="absolute bottom-[35%] right-[35%] text-white opacity-20 z-10 -rotate-12" size={20} strokeWidth={4} />
      
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
      <div className="w-full h-full relative z-20 flex flex-col max-w-[1500px] mx-auto pt-6 px-4 sm:px-6 lg:px-8 pb-6">
        
        {/* HEADER NAVIGATION */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 shrink-0">
          
          <div className="relative transform -rotate-[4deg] skew-x-[-8deg] ml-4 lg:ml-8 mt-4 z-40 w-max">
            <div className="absolute inset-0 bg-[#a60000] rounded-2xl md:rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] border-b-[6px] md:border-b-[10px] border-r-[4px] md:border-r-[6px] border-[#7a0000] z-[-1] scale-[1.05] translate-y-2"></div>
            
            <div className="absolute top-[-20px] left-[15px] bg-white text-[#cc0000] font-black italic text-[10px] md:text-xs px-4 py-1.5 rounded-xl rounded-bl-none rounded-br-md shadow-[rgba(139,0,0,1)_3px_5px_0px_0px] border-b-[2px] border-r-[2px] border-gray-200 z-50 flex items-center gap-1.5 uppercase tracking-widest">
              <ShieldCheck size={14} strokeWidth={3} /> ARCH_NOVA DB // VERIFIED
            </div>

            <div className="flex flex-col items-start z-30 px-6 py-4 pb-3 pt-6">
              <h1 className="text-[3rem] lg:text-[4.5rem] leading-[0.8] font-black italic text-white promo-text-3d uppercase tracking-tighter whitespace-nowrap">
                ARSIP DRIVE
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto mt-4 lg:mt-0 z-20">
            <div className="flex-1 lg:w-64 flex items-center bg-white rounded-full px-5 py-3 shadow-[0_5px_15px_rgba(100,0,0,0.3)] transition-all border-2 border-transparent focus-within:border-white/50">
              <Search className="text-[#cc0000] mr-2.5" size={18} strokeWidth={3} />
              <input 
                type="text" 
                placeholder="Cari arsip..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="w-full bg-transparent border-none outline-none text-[#990000] text-xs lg:text-sm font-bold italic placeholder-gray-400" 
              />
            </div>

            <div className="w-auto min-w-[150px] flex items-center bg-white rounded-full px-5 py-3 shadow-[0_5px_15px_rgba(100,0,0,0.3)] relative cursor-pointer hover:bg-gray-50 transition-colors">
               <Layers className="text-[#cc0000] mr-2" size={18} strokeWidth={3} />
               <select
                 value={selectedCategory}
                 onChange={(e) => setSelectedCategory(e.target.value)}
                 className="w-full bg-transparent border-none outline-none text-[#990000] text-xs lg:text-sm font-bold italic cursor-pointer appearance-none z-10 pr-4"
               >
                 <option value="Semua">Semua Kategori</option>
                 {categories.map((cat) => (
                   <option key={cat} value={cat}>{cat}</option>
                 ))}
               </select>
               <div className="absolute right-5 pointer-events-none text-[#cc0000]">
                 <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
            </div>

            <Link href="/" className="px-6 py-3 bg-[#5a0000] hover:bg-[#3a0000] text-white font-black italic text-xs md:text-sm uppercase tracking-widest transition-colors rounded-full shadow-[0_5px_15px_rgba(100,0,0,0.4)] flex items-center gap-2 shrink-0">
              <ArrowLeft size={16} strokeWidth={3} /> EXIT
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MASTER-DETAIL LAYOUT */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 flex-1 min-h-0 z-20">
          
          {/* ========================== */}
          {/* SISI KIRI: DAFTAR ARSIP */}
          {/* ========================== */}
          <div className="w-full lg:w-[35%] flex flex-col gap-3.5 overflow-y-auto hide-scrollbar pr-2 pb-10 lg:pb-0 pt-2">
            {displayedDrives.length > 0 ? (
              displayedDrives.map((drive, index) => {
                const isSelected = selectedDrive?.id === drive.id;
                return (
                  <div 
                    key={drive.id}
                    onClick={() => handleSelectDrive(drive)}
                    className={`relative p-4 md:p-5 rounded-[1.2rem] cursor-pointer transition-all duration-300 animate-fade-in-up border-2 group flex items-center gap-4 ${
                      isSelected 
                      ? 'bg-gradient-to-r from-white to-gray-100 border-white shadow-[0_8px_20px_rgba(0,0,0,0.4)] transform scale-[1.02] z-10' 
                      : 'bg-gradient-to-r from-[#990000]/80 to-[#7a0000]/60 border-[#ff4d4d]/30 text-white hover:border-[#ff4d4d] hover:-translate-y-1 z-0 backdrop-blur-sm shadow-md'
                    }`}
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-1/2 bg-[#ffde00] rounded-r-full shadow-[2px_0_10px_#ffde00]"></div>
                    )}
                    
                    <div className={`p-3 rounded-xl shrink-0 transition-colors ${
                      isSelected ? 'bg-[#cc0000] text-white shadow-[0_4px_10px_rgba(200,0,0,0.5)]' : 'bg-black/20 text-white group-hover:bg-white/20'
                    }`}>
                      <FileText size={22} strokeWidth={2.5} />
                    </div>
                    
                    <div className="flex-1 overflow-hidden">
                      <h3 className={`font-black italic text-sm md:text-base truncate uppercase leading-tight transition-colors ${isSelected ? 'text-[#cc0000]' : 'text-white'}`}>
                        {drive.judul}
                      </h3>
                      <p className={`text-[10px] font-extrabold uppercase tracking-widest mt-1.5 truncate ${isSelected ? 'text-gray-500' : 'text-[#ffde00]/80'}`}>
                        {drive.kategori} &bull; {drive.tanggal}
                      </p>
                    </div>

                    {isSelected && (
                       <ChevronRight className="text-[#cc0000] animate-pulse mr-1" size={20} strokeWidth={3} />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-40 bg-black/20 backdrop-blur-sm rounded-3xl border border-white/10 text-white/50">
                <Search size={32} strokeWidth={2} className="mb-2" />
                <p className="font-bold text-xs uppercase tracking-widest">Data Tidak Ditemukan</p>
              </div>
            )}
          </div>

          {/* ========================== */}
          {/* SISI KANAN: PREVIEW PANEL (DIPERBAIKI 1000% LEBIH DINAMIS) */}
          {/* ========================== */}
          <div className="w-full lg:w-[65%] flex flex-col bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(100,0,0,0.6)] border-b-[8px] border-r-[6px] border-[#a60000] overflow-hidden relative p-5 md:p-6 lg:p-7">
            
            {selectedDrive ? (
              <div key={selectedDrive.id} className={`flex flex-col h-full w-full flex-1 min-h-0 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                
                {/* 1. GAMBAR SAMPUL (BERBINGKAI & GRADASI) */}
                <div className="w-full mx-auto h-[160px] sm:h-[200px] lg:h-[240px] bg-[#1a0505] rounded-[1.5rem] overflow-hidden relative shadow-inner border-4 border-gray-100 shrink-0 group mb-5">
                  <img 
                    src={selectedDrive.gambarPreview} 
                    alt={selectedDrive.judul} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {/* Gradasi Bawah untuk memberi kedalaman */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>
                  
                  {/* Badge Kategori Menyatu dengan Gradasi */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 z-20">
                    <span className="bg-[#ffde00] text-[#990000] px-3.5 py-1.5 rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.5)] text-[10px] sm:text-xs font-black italic uppercase tracking-widest border-b-[3px] border-[#ccaa00]">
                      {selectedDrive.kategori}
                    </span>
                  </div>
                </div>

                {/* 2. AREA DETAIL */}
                <div className="flex flex-col flex-1 min-h-0 pb-1">
                  
                  {/* Judul & Tanggal (Lebih Rapi & Sejajar) */}
                  <div className="shrink-0 flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                    <div className="flex-1 pr-4">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black italic text-[#cc0000] uppercase tracking-tight leading-none drop-shadow-sm line-clamp-2">
                        {selectedDrive.judul}
                      </h2>
                    </div>
                    <div className="shrink-0 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 flex items-center text-red-800 text-[10px] font-extrabold uppercase tracking-widest h-max">
                      <Calendar size={14} strokeWidth={3} className="mr-1.5 text-red-600" /> {selectedDrive.tanggal}
                    </div>
                  </div>

                  {/* KOTAK DESKRIPSI (TIDAK MONOTON LAGI, ELEGAN & TERANG) */}
                  <div className="flex-1 min-h-[100px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-[1.2rem] p-5 lg:p-6 shadow-inner border-[3px] border-gray-200 border-l-[8px] border-l-[#cc0000] mb-5 flex flex-col relative overflow-hidden group">
                    
                    {/* Watermark Quote Icon */}
                    <Quote className="absolute -right-4 -bottom-4 text-gray-200 opacity-60 transform -rotate-12 group-hover:scale-110 transition-transform duration-500" size={120} strokeWidth={1} />
                    
                    <h4 className="shrink-0 text-[11px] font-black italic text-[#990000] uppercase tracking-widest mb-3 flex items-center gap-2 relative z-10">
                      <AlignLeft size={16} strokeWidth={3} className="text-[#cc0000]" /> KETERANGAN ARSIP
                    </h4>
                    
                    <div className="flex-1 overflow-y-auto hide-scrollbar pr-2 relative z-10">
                      <p className="text-gray-800 text-sm sm:text-base font-bold leading-relaxed whitespace-pre-wrap break-words italic">
                        "{selectedDrive.deskripsi || "Tidak ada deskripsi spesifik yang tercatat untuk file arsip ini."}"
                      </p>
                    </div>
                  </div>

                  {/* 3. TOMBOL AKSI (GAYA GAME / PROMO BUTTONS) */}
                  <div className="shrink-0 flex flex-col sm:flex-row gap-4 mt-auto">
                     
                     <button 
                       onClick={() => handleCopyLink(selectedDrive.link)} 
                       className={`sm:w-[35%] font-black italic text-[11px] uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all transform -skew-x-6 shadow-[0_5px_15px_rgba(0,0,0,0.1)] ${
                          isCopied 
                          ? 'bg-green-500 border-b-[4px] border-green-700 text-white translate-y-1 shadow-none' 
                          : 'bg-gray-100 hover:bg-[#ffde00] border-b-[4px] border-gray-300 hover:border-[#ccaa00] text-red-900 hover:translate-y-[-2px]'
                       }`}
                     >
                        <span className="skew-x-6 flex items-center gap-2">
                          {isCopied ? <><Check size={16} strokeWidth={3} /> TERSALIN!</> : <><Copy size={16} strokeWidth={3}/> SALIN TAUTAN</>}
                        </span>
                     </button>

                     <a 
                       href={selectedDrive.link} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex-1 bg-gradient-to-r from-[#e60000] to-[#cc0000] text-white font-black italic text-[12px] uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all transform -skew-x-6 shadow-[0_10px_20px_rgba(200,0,0,0.4)] border-b-[4px] border-[#8b0000] hover:translate-y-[-2px] hover:shadow-[0_15px_25px_rgba(200,0,0,0.5)] active:translate-y-1 active:shadow-none active:border-b-0"
                     >
                        <span className="skew-x-6 flex items-center gap-2">
                          <ExternalLink size={18} strokeWidth={3}/> BUKA ARSIP SEKARANG
                        </span>
                     </a>
                  </div>

                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                <HardDrive size={72} strokeWidth={1} className="mb-4 text-gray-300" />
                <p className="font-black italic uppercase tracking-widest text-sm">Pilih arsip untuk melihat detail</p>
              </div>
            )}
          </div>

        </div>
      </div>

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
        
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.99); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
        
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}