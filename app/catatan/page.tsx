"use client";

import { useState, useEffect, useMemo } from 'react';
import { Search, Calendar, User, FileText, ArrowLeft, X, CheckSquare, ListTodo, Plus, Check, Activity, ShieldCheck, Globe } from 'lucide-react';
import Link from 'next/link';
// IMPORT KONEKTOR SUPABASE
import { supabase } from '@/lib/supabase';

// Struktur Data
interface AbsensiRecord {
  memberId: string;
  nama: string;
  status: 'Izin' | 'Sakit' | 'Alpa';
}

interface NoteItem { 
  id: string; 
  judul: string; 
  tanggal: string; 
  penulis: string; 
  gambarPreview: string; 
  isiCatatan: string;
  absen: AbsensiRecord[];
  updatedAt?: number;
}

interface Member {
  id: string;
  nama: string;
  angkatan: string;
}

export default function CatatanPage() {
  const [items, setItems] = useState<NoteItem[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<NoteItem | null>(null);
  
  const [activeTab, setActiveTab] = useState<'catatan' | 'absen'>('catatan');
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<'Izin' | 'Sakit' | 'Alpa'>('Izin');
  const [isBooting, setIsBooting] = useState(true);

  // ==========================================
  // FETCH DATA SUPABASE (CATATAN & ANGGOTA)
  // ==========================================
  useEffect(() => {
    const fetchData = async () => {
      const { data: catatanData, error: errCatatan } = await supabase.from('catatan').select('*');
      if (catatanData) {
        setItems(catatanData.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)));
      } else if (errCatatan) {
        console.error("Gagal mengambil data catatan:", errCatatan);
      }

      const { data: anggotaData } = await supabase.from('anggota').select('*');
      if (anggotaData) {
        setMembers(anggotaData);
      }

      setTimeout(() => setIsBooting(false), 800);
    };

    fetchData();
  }, []);

  const angkatanList = useMemo(() => {
    return Array.from(new Set(members.map(m => m.angkatan).filter(Boolean))).sort();
  }, [members]);

  const filteredItems = items.filter(item => 
    item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.penulis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==========================================
  // FUNGSI SIMPAN ABSENSI KETIDAKHADIRAN KE SUPABASE
  // ==========================================
  const handleAddAbsen = async () => {
    if (!selectedMember || !selectedItem) return;

    const memberData = members.find(m => m.id === selectedMember);
    if (!memberData) return;

    const currentAbsen = selectedItem.absen || [];

    if (currentAbsen.some(a => a.memberId === selectedMember)) {
      alert("Anggota ini sudah tercatat status ketidakhadirannya!");
      return;
    }

    const newAbsen: AbsensiRecord = { memberId: memberData.id, nama: memberData.nama, status: selectedStatus };
    const updatedAbsenList = [...currentAbsen, newAbsen];
    const updatedItem = { ...selectedItem, absen: updatedAbsenList };
    
    setSelectedItem(updatedItem);
    const updatedItemsList = items.map(item => item.id === updatedItem.id ? updatedItem : item);
    setItems(updatedItemsList);
    setSelectedMember("");

    const { error } = await supabase.from('catatan').update({ absen: updatedAbsenList }).eq('id', updatedItem.id);
    if (error) {
      alert("Gagal menyimpan data ke server!");
      console.error(error);
    }
  };

  if (isBooting) {
    return (
      <div className="w-full min-h-screen bg-[#cc0000] flex flex-col items-center justify-center text-white">
        <FileText className="animate-pulse mb-4 text-[#ffde00]" size={56} strokeWidth={2} />
        <p className="text-lg font-black italic tracking-widest uppercase animate-pulse">
          Syncing Data Logs...
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
              <Activity size={14} strokeWidth={3} /> DATA_LOGS // MEETINGS
            </div>

            <div className="flex flex-col items-start z-30 px-6 py-4 pb-3 pt-6">
              <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[4.5rem] leading-[0.8] font-black italic text-white promo-text-3d uppercase tracking-tighter whitespace-nowrap">
                CATATAN &<br/>NOTULENSI
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto mt-4 lg:mt-0 z-20">
            <div className="flex-1 lg:w-72 flex items-center bg-white rounded-full px-5 py-3 shadow-[0_5px_15px_rgba(100,0,0,0.3)] transition-all border-2 border-transparent focus-within:border-white/50">
              <Search className="text-[#cc0000] mr-2.5" size={18} strokeWidth={3} />
              <input 
                type="text" 
                placeholder="Cari catatan..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="w-full bg-transparent border-none outline-none text-[#990000] text-xs lg:text-sm font-bold italic placeholder-gray-400" 
              />
            </div>

            <Link href="/" className="px-6 py-3 bg-[#5a0000] hover:bg-[#3a0000] text-white font-black italic text-xs md:text-sm uppercase tracking-widest transition-colors rounded-full shadow-[0_5px_15px_rgba(100,0,0,0.4)] border-b-[3px] border-[#330000] flex items-center gap-2 shrink-0">
              <ArrowLeft size={16} strokeWidth={3} /> EXIT
            </Link>
          </div>
        </div>

        {/* AREA GRID CATATAN */}
        <div className="flex-1 w-full overflow-y-auto hide-scrollbar pb-10">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4 px-2">
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id} 
                  onClick={() => { setSelectedItem(item); setActiveTab('catatan'); }} 
                  className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_10px_30px_rgba(100,0,0,0.4)] border-b-[6px] border-r-[4px] border-gray-200 hover:border-gray-300 transition-all hover:-translate-y-2 cursor-pointer group flex flex-col animate-fade-in-up"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <div className="w-full aspect-video bg-gray-100 relative overflow-hidden border-b-2 border-gray-100">
                    <img 
                      src={item.gambarPreview} 
                      alt={item.judul} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1 bg-white">
                    <h3 className="font-black italic text-[#cc0000] text-base lg:text-lg uppercase leading-tight line-clamp-2 mb-3">
                      {item.judul}
                    </h3>
                    <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100 text-gray-500 text-[10px] font-extrabold uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><User size={14} className="text-[#cc0000]" strokeWidth={2.5}/> {item.penulis}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#cc0000]" strokeWidth={2.5}/> {item.tanggal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center min-h-[50vh] bg-white/10 backdrop-blur-sm rounded-[2rem] border-2 border-white/20 shadow-inner">
              <FileText className="text-white/50 mb-4" size={64} strokeWidth={1.5} />
              <p className="text-lg font-black italic text-white uppercase tracking-widest">Catatan Tidak Ditemukan</p>
            </div>
          )}
        </div>

        {/* MODAL DETAIL CATATAN & ABSENSI KHUSUS IJIN/SAKIT/ALPA */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-5xl rounded-[2rem] bg-white border-b-[8px] border-r-[6px] border-gray-300 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-slide-up">
              
              <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-4 right-4 z-40 p-2 bg-[#cc0000] text-white hover:bg-[#990000] rounded-full shadow-md border-2 border-white transition-all duration-300 hover:rotate-90 hover:scale-110"
              >
                <X size={20} strokeWidth={3} />
              </button>
              
              {/* KIRI: Gambar */}
              <div className="w-full md:w-5/12 bg-gray-100 flex flex-col border-b md:border-b-0 md:border-r border-gray-200 relative p-6">
                <div className="absolute inset-4 bg-[#cc0000] opacity-10 transform -skew-x-6 rotate-2 rounded-2xl z-0"></div>
                
                <div className="w-full aspect-video relative overflow-hidden rounded-2xl border-[4px] border-white shadow-xl z-10">
                  <img src={selectedItem.gambarPreview} alt={selectedItem.judul} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex flex-col gap-3 relative z-10 flex-1 mt-6">
                  <h2 className="text-2xl lg:text-3xl font-black italic text-[#cc0000] uppercase leading-tight tracking-tight break-words">
                    {selectedItem.judul}
                  </h2>
                  
                  <div className="flex flex-col gap-3 mt-auto bg-gray-50 border-2 border-gray-100 p-4 rounded-xl shadow-inner">
                    <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">
                      <User size={16} className="text-[#cc0000]" strokeWidth={3}/> PENULIS: <strong className="text-gray-900">{selectedItem.penulis}</strong>
                    </span>
                    <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">
                      <Calendar size={16} className="text-[#cc0000]" strokeWidth={3}/> TANGGAL: <strong className="text-gray-900">{selectedItem.tanggal}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* KANAN: Tabs & Konten */}
              <div className="w-full md:w-7/12 flex flex-col bg-white relative z-10">
                
                <div className="flex border-b-[3px] border-gray-100 px-6 pt-4 bg-gray-50 shrink-0">
                  <button 
                    onClick={() => setActiveTab('catatan')}
                    className={`flex items-center gap-2 px-6 py-4 text-[11px] font-black italic uppercase tracking-widest transition-all border-b-[4px] ${
                      activeTab === 'catatan' ? 'border-[#cc0000] text-[#cc0000] bg-white rounded-t-xl' : 'border-transparent text-gray-500 hover:text-[#cc0000]'
                    }`}
                  >
                    <ListTodo size={16} strokeWidth={3}/> ISI CATATAN
                  </button>
                  <button 
                    onClick={() => setActiveTab('absen')}
                    className={`flex items-center gap-2 px-6 py-4 text-[11px] font-black italic uppercase tracking-widest transition-all border-b-[4px] ${
                      activeTab === 'absen' ? 'border-[#cc0000] text-[#cc0000] bg-white rounded-t-xl' : 'border-transparent text-gray-500 hover:text-[#cc0000]'
                    }`}
                  >
                    <CheckSquare size={16} strokeWidth={3}/> KETIDAKHADIRAN (IZIN/SAKIT/ALPA)
                  </button>
                </div>

                <div className="p-6 lg:p-8 overflow-y-auto hide-scrollbar flex-1 flex flex-col bg-white">
                  
                  {activeTab === 'catatan' && (
                    <div className="animate-fade-in flex-1 flex flex-col min-h-0">
                      <h3 className="text-[11px] font-black italic text-[#ffde00] mb-3 flex items-center gap-2 uppercase tracking-widest bg-[#cc0000] w-max px-3 py-1.5 rounded-lg shadow-sm">
                        <FileText size={16} strokeWidth={3}/> DETAIL NOTULENSI
                      </h3>
                      <div className="bg-gray-50 p-5 rounded-2xl border-2 border-gray-100 shadow-inner flex-1 overflow-y-auto hide-scrollbar">
                        <p className="text-sm text-gray-700 font-semibold leading-relaxed whitespace-pre-wrap">
                          {selectedItem.isiCatatan}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'absen' && (
                    <div className="animate-fade-in flex flex-col gap-6 flex-1 min-h-0">
                      
                      {/* Form Input khusus Izin, Sakit, Alpa */}
                      <div className="bg-gray-50 p-5 rounded-2xl border-2 border-gray-100 shadow-sm shrink-0">
                        <h3 className="text-[11px] font-black italic text-gray-500 mb-3 flex items-center gap-2 uppercase tracking-widest">
                          <Plus size={16} strokeWidth={3} className="text-[#cc0000]"/> INPUT ANGGOTA TIDAK HADIR
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <select 
                            value={selectedMember}
                            onChange={(e) => setSelectedMember(e.target.value)}
                            className="flex-1 bg-white border-2 border-gray-200 text-gray-800 text-xs font-bold rounded-xl px-4 py-3 focus:outline-none focus:border-[#cc0000] transition-all uppercase tracking-wide cursor-pointer"
                          >
                            <option value="">-- PILIH NAMA ANGGOTA --</option>
                            {angkatanList.map((angkatan, idx) => (
                              <optgroup key={idx} label={angkatan} className="text-[#cc0000] font-black bg-gray-50">
                                {members.filter(m => m.angkatan === angkatan).map(m => (
                                  <option key={m.id} value={m.id} className="text-gray-800 font-semibold">{m.nama}</option>
                                ))}
                              </optgroup>
                            ))}
                          </select>

                          <select 
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value as any)}
                            className="w-full sm:w-36 bg-white border-2 border-gray-200 text-gray-800 text-xs font-bold rounded-xl px-4 py-3 focus:outline-none focus:border-[#cc0000] transition-all uppercase tracking-wide cursor-pointer"
                          >
                            <option value="Izin">IZIN</option>
                            <option value="Sakit">SAKIT</option>
                            <option value="Alpa">ALPA</option>
                          </select>

                          <button 
                            onClick={handleAddAbsen}
                            className="bg-[#cc0000] hover:bg-[#990000] text-white font-black italic px-5 py-3 rounded-xl transition-all shadow-[0_4px_10px_rgba(200,0,0,0.3)] flex items-center justify-center shrink-0 hover:-translate-y-1"
                          >
                            <Check size={18} strokeWidth={3}/> CATAT
                          </button>
                        </div>
                        <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-widest">
                          *Anggota yang tidak dimasukkan ke daftar ini akan otomatis dianggap <strong>Hadir</strong>.
                        </p>
                      </div>

                      {/* List Ketidakhadiran */}
                      <div className="flex-1 flex flex-col min-h-0">
                        <h3 className="text-[11px] font-black italic text-gray-400 mb-2 uppercase tracking-widest shrink-0">Daftar Ketidakhadiran</h3>
                        {(selectedItem.absen || []).length > 0 ? (
                          <div className="grid grid-cols-1 gap-2 overflow-y-auto hide-scrollbar pr-2 pb-4">
                            {(selectedItem.absen || []).map((absen, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-white p-3.5 rounded-xl border-2 border-gray-100 shadow-sm hover:border-[#cc0000]/30 transition-colors">
                                <span className="text-xs font-black italic text-gray-800 flex items-center gap-2 uppercase">
                                  <User size={14} className="text-[#cc0000]" strokeWidth={3}/> {absen.nama}
                                </span>
                                <span className={`text-[10px] font-black italic px-3 py-1.5 rounded-md uppercase tracking-widest shadow-sm
                                  ${absen.status === 'Izin' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                                    absen.status === 'Sakit' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
                                    'bg-red-100 text-red-700 border border-red-300'}
                                `}>
                                  {absen.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex-1">
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Semua anggota tercatat hadir.</p>
                          </div>
                        )}
                      </div>

                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}
        
      </div>

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

        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}</style>
    </div>
  );
}