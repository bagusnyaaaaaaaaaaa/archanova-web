'use client'

import { useState, useEffect, useMemo } from 'react';
import { Search, ArrowLeft, Layers, PenTool, ExternalLink, Calendar, ShieldCheck, Copy, Check, Link as LinkIcon, Plus, AlignLeft, ChevronLeft, ChevronRight, X, User, Quote, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface DesignItem {
  id: string;
  judul: string;
  tanggal: string;
  kategori: string;
  designer: string;
  deskripsi: string;
  linkDesign: string;
  gambarPreview: string;
  updatedAt: number;
}

export default function DesignPage() {
  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10; 

  const [isCopied, setIsCopied] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchDesignsFromCloud = async () => {
      const { data, error } = await supabase.from('design').select('*');
      if (data) {
        setDesigns(data);
      } else if (error) {
        console.error("Gagal mengambil data design:", error);
      }
      setTimeout(() => setIsBooting(false), 500);
    };

    fetchDesignsFromCloud();
  }, []);

  const sortedDesigns = [...designs].sort((a, b) => b.updatedAt - a.updatedAt);

  const categories = useMemo(() => {
    const catList = designs.map(d => d.kategori).filter(Boolean);
    return Array.from(new Set(catList)).sort();
  }, [designs]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const filteredDesigns = sortedDesigns.filter(design => {
    const matchSearch = 
      design.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
      design.designer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === "All" || design.kategori === selectedCategory;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredDesigns.length / ITEMS_PER_PAGE));
  const currentDesigns = filteredDesigns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleSelectDesign = (design: DesignItem) => {
    if (selectedDesign?.id === design.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedDesign(design);
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
      <div className="w-full min-h-screen bg-[#ce0202] flex flex-col items-center justify-center text-white">
        <ImageIcon className="animate-pulse mb-4 text-[#ffde00]" size={56} strokeWidth={2} />
        <p className="text-lg font-black italic tracking-widest uppercase animate-pulse">
          Memuat Galeri...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#ce0202] text-gray-900 font-sans relative overflow-hidden z-10 flex flex-col selection:bg-yellow-400 selection:text-red-900">
      
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[80%] bg-[#b30000] rounded-bl-[120px] rounded-tl-[40px] transform rotate-[15deg] z-0 pointer-events-none shadow-2xl"></div>
      <div className="absolute top-[-20%] right-[10%] w-[50%] h-[70%] bg-[#990000] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] z-0 pointer-events-none transform rotate-[45deg] opacity-70 blur-xl"></div>
      
      <div className="absolute bottom-[0%] left-[-5%] w-[40%] h-[60%] z-0 pointer-events-none opacity-25" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 3px, transparent 3.5px)', backgroundSize: '22px 22px', maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)' }}></div>
      <div className="absolute top-[20%] right-[0%] w-[25%] h-[60%] z-0 pointer-events-none opacity-25" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 3px, transparent 3.5px)', backgroundSize: '22px 22px', maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)' }}></div>
      
      <div className="absolute top-[10%] right-[45%] w-[100px] h-[100px] border-t-4 border-r-4 border-white/40 rounded-tr-full z-10 transform -rotate-12"></div>
      
      <div className="absolute top-[12%] right-[48%] text-white/40 font-black tracking-widest text-lg transform -rotate-[20deg] z-10">
        ///
      </div>

      <Plus className="absolute top-[52%] right-[2%] text-white opacity-90 z-10" size={32} strokeWidth={3} />
      <Plus className="absolute bottom-[20%] left-[5%] text-white opacity-40 z-10 rotate-45" size={24} strokeWidth={3} />
      
      <div className="w-full relative z-20 flex flex-col max-w-[1600px] mx-auto pt-6 px-4 sm:px-6 lg:px-8 shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          
          <div className="relative transform -rotate-[4deg] skew-x-[-8deg] ml-4 lg:ml-8 mt-2 z-40 w-max">
            <div className="absolute inset-0 bg-[#a60000] rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] border-b-[8px] border-r-[5px] border-[#7a0000] z-[-1] scale-[1.05] translate-y-1"></div>
            
            <div className="absolute top-[-15px] left-[15px] bg-white text-[#cc0000] font-black italic text-[9px] md:text-[11px] px-4 py-1.5 rounded-xl rounded-bl-none rounded-br-md shadow-[rgba(139,0,0,1)_3px_4px_0px_0px] border-b-[2px] border-r-[2px] border-gray-200 z-50 flex items-center gap-1.5 uppercase tracking-widest">
              <ShieldCheck size={14} strokeWidth={3} /> VERIFIEDVISUAL_ARCHIVE // PORTFOLIO
            </div>

            <div className="flex flex-col items-start z-30 px-6 py-4 pb-3 pt-5">
              <h1 className="text-[2.5rem] lg:text-[4rem] leading-[0.8] font-black italic text-white promo-text-3d uppercase tracking-tighter whitespace-nowrap">
                GALERI DESAIN
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto mt-2 lg:mt-0 z-20">
            <div className="flex-1 lg:w-64 flex items-center bg-white rounded-full px-5 py-3 shadow-[0_5px_15px_rgba(100,0,0,0.3)] transition-all border-2 border-transparent focus-within:border-white/50">
              <Search className="text-[#cc0000] mr-2.5" size={18} strokeWidth={3} />
              <input 
                type="text" 
                placeholder="Cari Karya..." 
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
                 <option value="All">Semua Kategori</option>
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
      </div>

      <div className="w-full flex-1 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 pb-6 min-h-0 flex flex-col z-20">
        <div className="bg-white flex-1 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col p-6 lg:p-8 relative overflow-hidden">
          
          <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden w-full">
            {currentDesigns.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 justify-items-center items-center w-full h-full min-h-0">
                {currentDesigns.map((design, index) => {
                  const isSelected = selectedDesign?.id === design.id;

                  return (
                    <div 
                      key={design.id}
                      onClick={() => handleSelectDesign(design)}
                      // KUNCI UTAMA: Lebar dibatasi agar pas 5 kolom, tinggi akan menyesuaikan aspect-ratio kontennya secara otomatis
                      className={`relative flex flex-col p-2 lg:p-3 rounded-[1.2rem] lg:rounded-[1.5rem] cursor-pointer bg-white transition-all duration-300 w-full max-w-[180px] lg:max-w-[200px] xl:max-w-[220px] group border-[3px] animate-fade-in-up
                        ${isSelected 
                          ? 'border-[#ffde00] shadow-[0_0_20px_rgba(255,222,0,0.6)] transform scale-[1.02] z-10' 
                          : 'border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.08)] hover:border-gray-300 hover:-translate-y-1'
                        }
                      `}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      {/* CONTAINER GAMBAR: DIKUNCI ABSOLUT 3:4 */}
                      <div className="w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200">
                        <img 
                          src={design.gambarPreview} 
                          alt={design.judul} 
                          // Menggunakan object-cover agar flyer 3:4 memenuhi ruang dengan sempurna
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 bg-[#cc0000] text-white px-2 py-1 rounded shadow-md text-[7px] sm:text-[8px] font-black italic uppercase tracking-widest border border-[#ff4d4d]">
                          {design.kategori}
                        </div>
                      </div>
                      
                      {/* AREA TEKS */}
                      <div className="shrink-0 flex flex-col justify-center relative pt-3 pb-1 w-full">
                        <h3 className={`font-black italic text-[10px] xl:text-xs truncate uppercase leading-tight transition-colors mb-0.5 pr-8 ${isSelected ? 'text-[#cc0000]' : 'text-gray-900'}`}>
                          {design.judul}
                        </h3>
                        <div className="flex items-center text-[8px] xl:text-[9px] text-gray-500 font-extrabold uppercase tracking-widest truncate pr-8">
                          <User size={10} strokeWidth={3} className="text-[#cc0000] mr-1 shrink-0" /> OLEH: {design.designer}
                        </div>
                        
                        <div className="absolute bottom-1 right-0 w-6 h-6 xl:w-7 xl:h-7 rounded-md bg-red-50 border border-red-200 flex items-center justify-center text-[#cc0000] shadow-sm group-hover:bg-[#cc0000] group-hover:text-white transition-colors">
                          <LinkIcon size={10} strokeWidth={3} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 h-full">
                <Search size={64} strokeWidth={2} className="mb-4 text-gray-300" />
                <p className="font-black italic uppercase tracking-widest text-lg">Karya Tidak Ditemukan</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="shrink-0 flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-black italic uppercase tracking-widest text-xs xl:text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-[#8b0000] text-white border-[3px] border-[#cc0000] shadow-[0_0_15px_rgba(139,0,0,0.4)] hover:border-[#ffde00] hover:shadow-[0_0_20px_rgba(255,222,0,0.4)]"
              >
                <ArrowLeft size={16} strokeWidth={3} /> PREV
              </button>

              <div className="font-black italic text-gray-800 uppercase tracking-[0.2em] text-xs xl:text-sm bg-gray-100 px-6 py-2.5 rounded-full border-2 border-gray-200">
                HALAMAN <span className="text-[#cc0000] text-sm xl:text-base">{currentPage}</span> // {totalPages}
              </div>

              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-black italic uppercase tracking-widest text-xs xl:text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-[#8b0000] text-white border-[3px] border-[#cc0000] shadow-[0_0_15px_rgba(139,0,0,0.4)] hover:border-[#ffde00] hover:shadow-[0_0_20px_rgba(255,222,0,0.4)]"
              >
                NEXT <ArrowLeft size={16} strokeWidth={3} className="transform rotate-180" />
              </button>
            </div>
          )}

        </div>
      </div>

      {selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-black/80 backdrop-blur-md animate-fade-in">
          
          <div className="relative w-full max-w-5xl max-h-[95vh] rounded-[2rem] bg-white border-[6px] border-white/20 shadow-[0_0_80px_rgba(204,0,0,0.5)] overflow-hidden flex flex-col md:flex-row animate-slide-up">
            
            <button 
              onClick={() => setSelectedDesign(null)} 
              className="absolute top-4 right-4 z-50 p-2.5 bg-red-100 text-[#cc0000] hover:text-white hover:bg-[#cc0000] rounded-full transition-all duration-300 hover:rotate-90 shadow-lg border border-red-200"
            >
              <X size={20} strokeWidth={3} />
            </button>
            
            <div className="w-full md:w-[45%] bg-[#0a0202] p-6 lg:p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.15)_0%,transparent_70%)] pointer-events-none"></div>
              
              <div className="relative w-full aspect-[3/4] max-w-sm rounded-[1.5rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-[4px] border-gray-800">
                <img 
                  src={selectedDesign.gambarPreview} 
                  alt={selectedDesign.judul} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            <div className="w-full md:w-[55%] p-6 lg:p-10 flex flex-col overflow-y-auto hide-scrollbar bg-gray-50">
              
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#ffde00] text-[#990000] border-b-[3px] border-[#ccaa00] px-4 py-1.5 rounded-lg text-[10px] font-black italic uppercase tracking-widest shadow-sm transform -skew-x-6">
                  <span className="skew-x-6 inline-block">{selectedDesign.kategori}</span>
                </span>
              </div>

              <h2 className="text-3xl lg:text-5xl font-black text-[#cc0000] uppercase tracking-tighter leading-tight mb-4 italic drop-shadow-sm">
                {selectedDesign.judul}
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
                <div className="flex-1">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1 flex items-center gap-1.5"><User size={14} className="text-[#cc0000]" /> DIBUAT OLEH</div>
                  <div className="text-sm font-black text-gray-900 uppercase">{selectedDesign.designer}</div>
                </div>
                <div className="w-px bg-gray-200 hidden sm:block"></div>
                <div className="flex-1">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1 flex items-center gap-1.5"><Calendar size={14} className="text-[#cc0000]"/> TANGGAL RILIS</div>
                  <div className="text-sm font-black text-gray-900">{selectedDesign.tanggal}</div>
                </div>
              </div>

              <div className="flex-1 mb-8 relative bg-gray-100 p-5 rounded-2xl border-2 border-gray-200">
                <Quote className="absolute -right-2 -bottom-2 text-white drop-shadow-sm transform -rotate-12" size={100} strokeWidth={1} />
                <h4 className="text-[11px] font-black text-[#990000] uppercase tracking-widest mb-3 flex items-center gap-2 relative z-10 italic">
                  <AlignLeft size={16} strokeWidth={3} className="text-[#cc0000]" /> KETERANGAN KARYA
                </h4>
                <div className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-bold italic relative z-10">
                  &quot;{selectedDesign.deskripsi || "Tidak ada keterangan tambahan untuk karya desain ini."}&quot;
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 shrink-0">
                <button 
                  onClick={() => handleCopyLink(selectedDesign.linkDesign)} 
                  className={`sm:w-[35%] font-black italic text-[11px] uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all transform -skew-x-6 border-b-[4px] shadow-[4px_4px_0px_rgba(0,0,0,0.1)] ${
                    isCopied 
                    ? 'bg-green-500 border-green-700 text-white translate-y-1 shadow-none' 
                    : 'bg-white hover:bg-[#ffde00] border-gray-300 hover:border-[#ccaa00] text-red-900 hover:translate-y-[-2px]'
                  }`}
                >
                  <span className="skew-x-6 flex items-center gap-2">
                    {isCopied ? <><Check size={16} strokeWidth={3} /> TERSALIN!</> : <><Copy size={16} strokeWidth={3}/> SALIN TAUTAN</>}
                  </span>
                </button>

                <a 
                  href={selectedDesign.linkDesign} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-[#e60000] to-[#cc0000] text-white font-black italic text-[12px] uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all transform -skew-x-6 shadow-[0_10px_20px_rgba(200,0,0,0.4)] border-b-[4px] border-[#8b0000] hover:translate-y-[-2px] hover:shadow-[0_15px_25px_rgba(200,0,0,0.5)] active:translate-y-1 active:shadow-none active:border-b-0"
                >
                  <span className="skew-x-6 flex items-center gap-2">
                    <ExternalLink size={18} strokeWidth={3}/> BUKA FILE SUMBER
                  </span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
        body { font-family: 'Montserrat', sans-serif; }
        
        .promo-text-3d {
          text-shadow: 1px 1px 0 #7a0000, 2px 2px 0 #7a0000, 3px 3px 0 #7a0000, 4px 4px 0 #7a0000, 5px 5px 0 #7a0000, 6px 6px 0 #7a0000, 7px 7px 0 #7a0000, 8px 8px 0 #7a0000, 9px 9px 0 #7a0000, 10px 10px 0 #5c0000, 11px 11px 0 #5c0000, 12px 12px 0 #5c0000, 13px 13px 25px rgba(0,0,0,0.6);
        }

        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }

        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}} />

    </div>
  );
}