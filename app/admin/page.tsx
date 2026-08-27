'use client'

import { useState, useEffect } from 'react';
import { Settings, UploadCloud, ImageIcon, Save, PenTool, CheckCircle, Loader2, FileText, Edit, Trash2, X, Users, Plus, Terminal, Cpu, Activity, ShieldCheck, Link as LinkIcon, UserCircle, Package, Bookmark, Share2, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
// IMPORT KONEKTOR SUPABASE
import { supabase } from '@/lib/supabase'; 

// ==========================================
// INTERFACES (STRUKTUR DATA LENGKAP)
// ==========================================
interface AbsensiRecord { memberId: string; nama: string; status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpa'; }
interface NoteItem { id: string; judul: string; tanggal: string; penulis: string; gambarPreview: string; isiCatatan: string; absen: AbsensiRecord[]; updatedAt: number; }
interface MemberItem { id: string; nama: string; jabatan: string; angkatan: string; hobi: string; citaCita: string; kataKata: string; foto: string; fotoFormal: string; updatedAt: number; }
interface DesignItem { id: string; judul: string; tanggal: string; kategori: string; designer: string; deskripsi: string; linkDesign: string; gambarPreview: string; updatedAt: number; }
interface DriveItem { id: string; judul: string; kategori: string; tanggal: string; deskripsi: string; link: string; gambarPreview: string; updatedAt: number; }
interface BahanItem { id: string; judul: string; kategori: string; gambar: string; updatedAt: number; }
interface HighlightItem { id: string; judul: string; deskripsi: string; gambar: string; updatedAt: number; }
interface SosmedItem { id: string; platform: string; username: string; link: string; updatedAt: number; }

export default function AdminPage() {
  const adminTabs = ['Dashboard', 'Anggota', 'Drive', 'Design', 'Bahan', 'Catatan', 'Highlight', 'Sosmed'];
  const [activeTab, setActiveTab] = useState(adminTabs[0]);

  // STATE DASHBOARD
  const [judul, setJudul] = useState("Archanova");
  const [deskripsi, setDeskripsi] = useState("");
  const [fileName, setFileName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [dashboardImagePreview, setDashboardImagePreview] = useState('');

  // STATE CATATAN
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [editingNote, setEditingNote] = useState<NoteItem | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteForm, setNoteForm] = useState<NoteItem>({ id: '', judul: '', tanggal: '', penulis: '', gambarPreview: '', isiCatatan: '', absen: [], updatedAt: 0 });

  // STATE ANGGOTA
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [editingMember, setEditingMember] = useState<MemberItem | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [memberForm, setMemberForm] = useState<MemberItem>({ id: '', nama: '', jabatan: '', angkatan: '', hobi: '', citaCita: '', kataKata: '', foto: '', fotoFormal: '', updatedAt: 0 });

  // STATE DESIGN
  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [editingDesign, setEditingDesign] = useState<DesignItem | null>(null);
  const [isAddingDesign, setIsAddingDesign] = useState(false);
  const [designForm, setDesignForm] = useState<DesignItem>({ id: '', judul: '', tanggal: '', kategori: '', designer: '', deskripsi: '', linkDesign: '', gambarPreview: '', updatedAt: 0 });

  // STATE DRIVE
  const [drives, setDrives] = useState<DriveItem[]>([]);
  const [editingDrive, setEditingDrive] = useState<DriveItem | null>(null);
  const [isAddingDrive, setIsAddingDrive] = useState(false);
  const [driveForm, setDriveForm] = useState<DriveItem>({ id: '', judul: '', kategori: '', tanggal: '', deskripsi: '', link: '', gambarPreview: '', updatedAt: 0 });

  // STATE BAHAN
  const [bahans, setBahans] = useState<BahanItem[]>([]);
  const [editingBahan, setEditingBahan] = useState<BahanItem | null>(null);
  const [isAddingBahan, setIsAddingBahan] = useState(false);
  const [bahanForm, setBahanForm] = useState<BahanItem>({ id: '', judul: '', kategori: '', gambar: '', updatedAt: 0 });

  // STATE HIGHLIGHT
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [editingHighlight, setEditingHighlight] = useState<HighlightItem | null>(null);
  const [isAddingHighlight, setIsAddingHighlight] = useState(false);
  const [highlightForm, setHighlightForm] = useState<HighlightItem>({ id: '', judul: '', deskripsi: '', gambar: '', updatedAt: 0 });

  // STATE SOSMED
  const [sosmeds, setSosmeds] = useState<SosmedItem[]>([]);
  const [editingSosmed, setEditingSosmed] = useState<SosmedItem | null>(null);
  const [isAddingSosmed, setIsAddingSosmed] = useState(false);
  const [sosmedForm, setSosmedForm] = useState<SosmedItem>({ id: '', platform: '', username: '', link: '', updatedAt: 0 });

  const [isBooting, setIsBooting] = useState(true);

  // ==========================================
  // 1. FUNGSI MENGAMBIL DATA DARI SUPABASE
  // ==========================================
  useEffect(() => {
    const loadDataFromCloud = async () => {
      const { data: settingsData } = await supabase.from('settings').select('*').eq('id', 'dashboard').single();
      if (settingsData) { setJudul(settingsData.judul); setDeskripsi(settingsData.deskripsi); setDashboardImagePreview(settingsData.gambar); }
      
      const { data: anggotaData } = await supabase.from('anggota').select('*'); if (anggotaData) setMembers(anggotaData);
      const { data: designData } = await supabase.from('design').select('*'); if (designData) setDesigns(designData);
      const { data: driveData } = await supabase.from('drive').select('*'); if (driveData) setDrives(driveData);
      const { data: bahanData } = await supabase.from('bahan').select('*'); if (bahanData) setBahans(bahanData);
      const { data: catatanData } = await supabase.from('catatan').select('*'); if (catatanData) setNotes(catatanData);
      const { data: highlightData } = await supabase.from('highlight').select('*'); if (highlightData) setHighlights(highlightData);
      const { data: sosmedData } = await supabase.from('sosmed').select('*'); if (sosmedData) setSosmeds(sosmedData);

      setTimeout(() => setIsBooting(false), 800);
    };
    loadDataFromCloud();
  }, []);

  // KOMPRESI GAMBAR
  const processImageFile = (file: File, callback: (dataUrl: string) => void, preservePng: boolean = false) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const isTruePng = file.type === 'image/png' || preservePng;
        const maxWidth = isTruePng ? 800 : 500; 
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale; canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d'); if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        callback(canvas.toDataURL(isTruePng ? 'image/png' : 'image/jpeg', 0.7)); 
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  // ==========================================
  // 2. FUNGSI UPLOAD KHUSUS DASHBOARD (YANG TADI HILANG)
  // ==========================================
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    processImageFile(file, (dataUrl) => setDashboardImagePreview(dataUrl), false);
  };

  // ==========================================
  // 3. FUNGSI CRUD GLOBAL
  // ==========================================
  const handleSaveDashboard = async () => {
    setIsSaving(true);
    const { error } = await supabase.from('settings').upsert({ id: 'dashboard', judul, deskripsi, gambar: dashboardImagePreview });
    if (!error) { setIsSaved(true); setTimeout(() => setIsSaved(false), 2500); }
    setIsSaving(false);
  };

  const saveToSupabase = async (tableName: string, data: any, isAdding: boolean, setList: any, list: any[], setForm: any, emptyForm: any, closeModals: () => void) => {
    const updatedData = { ...data, updatedAt: Date.now() };
    if (isAdding) updatedData.id = `${tableName}-` + Date.now();
    const { error } = await supabase.from(tableName).upsert(updatedData);
    if (!error) {
      setList(isAdding ? [...list, updatedData] : list.map((item: any) => item.id === updatedData.id ? updatedData : item));
      setForm(emptyForm); closeModals();
    } else alert(`Gagal menyimpan ke tabel ${tableName}. Pastikan tabel ada di Supabase.`);
  };

  const deleteFromSupabase = async (tableName: string, id: string, setList: any, list: any[]) => {
    if (confirm("Hapus data ini permanen dari Cloud?")) {
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (!error) setList(list.filter((item: any) => item.id !== id));
    }
  };

  const handleSaveMember = () => saveToSupabase('anggota', memberForm, isAddingMember, setMembers, members, setMemberForm, { id: '', nama: '', jabatan: '', angkatan: '', hobi: '', citaCita: '', kataKata: '', foto: '', fotoFormal: '', updatedAt: 0 }, () => { setIsAddingMember(false); setEditingMember(null); });
  const handleSaveDrive = () => saveToSupabase('drive', driveForm, isAddingDrive, setDrives, drives, setDriveForm, { id: '', judul: '', kategori: '', tanggal: '', deskripsi: '', link: '', gambarPreview: '', updatedAt: 0 }, () => { setIsAddingDrive(false); setEditingDrive(null); });
  const handleSaveDesign = () => saveToSupabase('design', designForm, isAddingDesign, setDesigns, designs, setDesignForm, { id: '', judul: '', tanggal: '', kategori: '', designer: '', deskripsi: '', linkDesign: '', gambarPreview: '', updatedAt: 0 }, () => { setIsAddingDesign(false); setEditingDesign(null); });
  const handleSaveBahan = () => saveToSupabase('bahan', bahanForm, isAddingBahan, setBahans, bahans, setBahanForm, { id: '', judul: '', kategori: '', gambar: '', updatedAt: 0 }, () => { setIsAddingBahan(false); setEditingBahan(null); });
  const handleSaveNote = () => saveToSupabase('catatan', noteForm, isAddingNote, setNotes, notes, setNoteForm, { id: '', judul: '', tanggal: '', penulis: '', gambarPreview: '', isiCatatan: '', absen: [], updatedAt: 0 }, () => { setIsAddingNote(false); setEditingNote(null); });
  const handleSaveHighlight = () => saveToSupabase('highlight', highlightForm, isAddingHighlight, setHighlights, highlights, setHighlightForm, { id: '', judul: '', deskripsi: '', gambar: '', updatedAt: 0 }, () => { setIsAddingHighlight(false); setEditingHighlight(null); });
  const handleSaveSosmed = () => saveToSupabase('sosmed', sosmedForm, isAddingSosmed, setSosmeds, sosmeds, setSosmedForm, { id: '', platform: '', username: '', link: '', updatedAt: 0 }, () => { setIsAddingSosmed(false); setEditingSosmed(null); });

  // ==========================================
  // UI RENDER
  // ==========================================
  if (isBooting) {
    return (
      <div className="w-full min-h-screen bg-[#cc0000] flex flex-col items-center justify-center text-white">
        <Settings className="animate-pulse mb-4 text-[#ffde00]" size={56} strokeWidth={2} />
        <p className="text-lg font-black italic tracking-widest uppercase animate-pulse">Accessing Server...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#cc0000] p-4 lg:p-6 flex flex-col overflow-hidden relative z-10 selection:bg-yellow-400 selection:text-red-900 text-gray-900 font-sans">
      
      {/* BACKGROUND ELEMENTS ARCHNOVA */}
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[80%] bg-[#b30000] rounded-bl-[120px] rounded-tl-[40px] transform rotate-[15deg] z-0 pointer-events-none shadow-2xl"></div>
      <div className="absolute top-[-20%] right-[10%] w-[50%] h-[70%] bg-[#990000] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] z-0 pointer-events-none transform rotate-[45deg] opacity-70 blur-xl"></div>
      <div className="absolute bottom-[0%] left-[-5%] w-[40%] h-[60%] z-0 pointer-events-none opacity-25" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 3px, transparent 3.5px)', backgroundSize: '22px 22px', maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)' }}></div>

      <div className="max-w-[1600px] mx-auto w-full h-full flex flex-col relative z-10 bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_60px_rgba(100,0,0,0.6)] border-b-[8px] border-r-[6px] border-[#a60000] overflow-hidden p-6 md:p-8">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6 shrink-0 border-b-2 border-gray-100 pb-4">
          <div className="flex flex-col">
            <span className="bg-[#ffde00] text-[#990000] px-3 py-1 rounded-md text-[10px] font-black italic tracking-widest uppercase w-fit mb-1 border-b-[2px] border-[#ccaa00] flex items-center gap-1.5 shadow-sm transform -skew-x-6">
              <span className="skew-x-6 flex items-center gap-1.5"><ShieldCheck size={14}/> SYSTEM_ADMIN</span>
            </span>
            <h1 className="text-3xl lg:text-4xl font-black italic text-[#cc0000] uppercase tracking-tighter drop-shadow-sm">
              DATABASE PANEL
            </h1>
          </div>
          <Link href="/" className="px-6 py-3 bg-[#cc0000] hover:bg-[#990000] text-white font-black italic text-xs uppercase tracking-widest transition-all rounded-xl shadow-[0_4px_10px_rgba(200,0,0,0.3)] border-b-[4px] border-[#7a0000] flex items-center gap-2 transform hover:-translate-y-1">
            <ArrowLeft size={16} strokeWidth={3} /> KEMBALI KE WEB
          </Link>
        </div>

        {/* NAVIGATION TABS */}
        <div className="w-full mb-6 overflow-x-auto hide-scrollbar shrink-0">
          <div className="flex items-center gap-3 w-max pb-2">
            {adminTabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => { setActiveTab(tab); }}
                className={`px-5 py-3 rounded-xl font-black italic text-[11px] uppercase tracking-widest transition-all duration-300 border-2 flex items-center gap-2 transform -skew-x-6 ${
                  activeTab === tab 
                  ? 'bg-[#cc0000] text-white border-[#cc0000] shadow-[4px_4px_0px_#ffde00]' 
                  : 'bg-white text-gray-500 border-gray-200 hover:text-[#cc0000] hover:border-[#cc0000]'
                }`}
              >
                <span className="skew-x-6 flex items-center gap-2">
                  {activeTab === tab && <Activity size={14} className="animate-pulse" />} {tab}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 overflow-y-auto hide-scrollbar bg-gray-50 rounded-2xl border-2 border-gray-100 p-4 md:p-6 shadow-inner">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'Dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex flex-col shadow-sm">
                <h3 className="text-sm font-black italic text-[#cc0000] mb-4 flex items-center gap-2 uppercase tracking-widest">
                  <ImageIcon size={18} strokeWidth={3}/> BACKGROUND WEB (HOME)
                </h3>
                <label className="flex-1 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center p-6 hover:border-[#cc0000] hover:bg-red-50 cursor-pointer transition-colors min-h-[200px]">
                  {dashboardImagePreview ? (
                    <img src={dashboardImagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg shadow-md border-2 border-white" />
                  ) : (
                    <UploadCloud className="size-10 text-gray-400 mb-2" />
                  )}
                  <p className="text-gray-500 font-bold text-[10px] mt-3 uppercase tracking-widest">{fileName ? fileName : 'Upload Banner Home'}</p>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-sm font-black italic text-[#cc0000] mb-4 flex items-center gap-2 uppercase tracking-widest">
                    <Terminal size={18} strokeWidth={3}/> PARAMETER TEKS UTAMA
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black italic text-gray-500 uppercase tracking-widest mb-1.5">Judul Web</label>
                      <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 font-bold outline-none focus:border-[#cc0000] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black italic text-gray-500 uppercase tracking-widest mb-1.5">Deskripsi / Slogan</label>
                      <textarea rows={3} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 font-bold outline-none focus:border-[#cc0000] transition-colors resize-none"></textarea>
                    </div>
                  </div>
                </div>
                <button onClick={handleSaveDashboard} disabled={isSaving} className="w-full mt-6 bg-[#cc0000] hover:bg-[#990000] text-white font-black italic text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_10px_rgba(200,0,0,0.3)] border-b-[4px] border-[#7a0000] transition-all transform hover:-translate-y-1">
                  {isSaving ? <Loader2 className="animate-spin" size={16} strokeWidth={3}/> : isSaved ? <CheckCircle size={16} strokeWidth={3}/> : <Save size={16} strokeWidth={3}/>} 
                  {isSaved ? 'TERSIPAN DI CLOUD!' : 'SIMPAN PERUBAHAN DASHBOARD'}
                </button>
              </div>
            </div>
          )}

          {/* TAB LIST ITEM (ANGGOTA, DRIVE, DESIGN, DKK) */}
          {activeTab !== 'Dashboard' && (
            <div className="animate-fade-in-up">
              
              {/* === FORM ADD/EDIT === */}
              {((activeTab === 'Anggota' && (isAddingMember || editingMember)) ||
                (activeTab === 'Drive' && (isAddingDrive || editingDrive)) ||
                (activeTab === 'Design' && (isAddingDesign || editingDesign)) ||
                (activeTab === 'Bahan' && (isAddingBahan || editingBahan)) ||
                (activeTab === 'Catatan' && (isAddingNote || editingNote)) ||
                (activeTab === 'Highlight' && (isAddingHighlight || editingHighlight)) ||
                (activeTab === 'Sosmed' && (isAddingSosmed || editingSosmed))
              ) ? (
                <div className="bg-white border-2 border-gray-200 rounded-[2rem] p-6 md:p-8 max-w-5xl mx-auto shadow-lg">
                  <div className="flex items-center justify-between mb-6 border-b-2 border-gray-100 pb-4">
                    <h2 className="text-xl font-black italic text-[#cc0000] flex items-center gap-2 uppercase tracking-widest">
                      <PenTool size={22} strokeWidth={3}/> EDIT DATA {activeTab}
                    </h2>
                    <button onClick={() => { 
                      setIsAddingMember(false); setEditingMember(null); setIsAddingDrive(false); setEditingDrive(null); 
                      setIsAddingDesign(false); setEditingDesign(null); setIsAddingBahan(false); setEditingBahan(null);
                      setIsAddingNote(false); setEditingNote(null); setIsAddingHighlight(false); setEditingHighlight(null);
                      setIsAddingSosmed(false); setEditingSosmed(null);
                    }} className="bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500 p-2 rounded-full transition-colors"><X size={20} strokeWidth={3}/></button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* KOLOM GAMBAR */}
                    {activeTab !== 'Sosmed' && (
                      <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
                        <label className="block text-[10px] font-black italic text-gray-500 uppercase tracking-widest mb-1">Upload Gambar / Thumbnail</label>
                        <label className="w-full aspect-[4/3] border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-[#cc0000] transition-colors">
                          {activeTab === 'Anggota' && memberForm.foto ? <img src={memberForm.foto} className="w-full h-full object-contain" /> :
                           activeTab === 'Drive' && driveForm.gambarPreview ? <img src={driveForm.gambarPreview} className="w-full h-full object-cover" /> :
                           activeTab === 'Design' && designForm.gambarPreview ? <img src={designForm.gambarPreview} className="w-full h-full object-cover" /> :
                           activeTab === 'Bahan' && bahanForm.gambar ? <img src={bahanForm.gambar} className="w-full h-full object-contain" /> :
                           activeTab === 'Catatan' && noteForm.gambarPreview ? <img src={noteForm.gambarPreview} className="w-full h-full object-cover" /> :
                           activeTab === 'Highlight' && highlightForm.gambar ? <img src={highlightForm.gambar} className="w-full h-full object-cover" /> :
                           <UploadCloud size={32} className="text-gray-400" />
                          }
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0]; if(!file) return;
                            if(activeTab === 'Anggota') processImageFile(file, (url) => setMemberForm({...memberForm, foto: url}), true);
                            if(activeTab === 'Drive') processImageFile(file, (url) => setDriveForm({...driveForm, gambarPreview: url}));
                            if(activeTab === 'Design') processImageFile(file, (url) => setDesignForm({...designForm, gambarPreview: url}));
                            if(activeTab === 'Bahan') processImageFile(file, (url) => setBahanForm({...bahanForm, gambar: url}), true);
                            if(activeTab === 'Catatan') processImageFile(file, (url) => setNoteForm({...noteForm, gambarPreview: url}));
                            if(activeTab === 'Highlight') processImageFile(file, (url) => setHighlightForm({...highlightForm, gambar: url}));
                          }} />
                        </label>

                        {/* Ekstra Foto Anggota */}
                        {activeTab === 'Anggota' && (
                          <label className="w-1/2 aspect-square mx-auto border-2 border-dashed border-gray-300 rounded-full bg-gray-50 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-[#cc0000]">
                            {memberForm.fotoFormal ? <img src={memberForm.fotoFormal} className="w-full h-full object-cover" /> : <UserCircle size={24} className="text-gray-400"/>}
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if(f) processImageFile(f, (u) => setMemberForm({...memberForm, fotoFormal: u})); }}/>
                          </label>
                        )}
                      </div>
                    )}

                    {/* KOLOM TEKS (Dinamis) */}
                    <div className={`col-span-1 ${activeTab === 'Sosmed' ? 'md:col-span-12' : 'md:col-span-8'} space-y-4`}>
                      
                      {activeTab === 'Anggota' && (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Nama Lengkap" value={memberForm.nama} onChange={e => setMemberForm({...memberForm, nama: e.target.value})} className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000]" />
                            <input type="text" placeholder="Jabatan" value={memberForm.jabatan} onChange={e => setMemberForm({...memberForm, jabatan: e.target.value})} className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000]" />
                          </div>
                          <input type="text" placeholder="Angkatan" value={memberForm.angkatan} onChange={e => setMemberForm({...memberForm, angkatan: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000]" />
                          <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Hobi" value={memberForm.hobi} onChange={e => setMemberForm({...memberForm, hobi: e.target.value})} className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000]" />
                            <input type="text" placeholder="Cita-Cita" value={memberForm.citaCita} onChange={e => setMemberForm({...memberForm, citaCita: e.target.value})} className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000]" />
                          </div>
                          <textarea rows={2} placeholder="Quote / Kata-kata" value={memberForm.kataKata} onChange={e => setMemberForm({...memberForm, kataKata: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000] resize-none"></textarea>
                        </>
                      )}

                      {(activeTab === 'Drive' || activeTab === 'Design' || activeTab === 'Bahan' || activeTab === 'Catatan' || activeTab === 'Highlight') && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input type="text" placeholder="Judul / Nama" 
                            value={activeTab==='Drive'?driveForm.judul : activeTab==='Design'?designForm.judul : activeTab==='Bahan'?bahanForm.judul : activeTab==='Catatan'?noteForm.judul : highlightForm.judul} 
                            onChange={e => {
                              if(activeTab==='Drive') setDriveForm({...driveForm, judul: e.target.value});
                              if(activeTab==='Design') setDesignForm({...designForm, judul: e.target.value});
                              if(activeTab==='Bahan') setBahanForm({...bahanForm, judul: e.target.value});
                              if(activeTab==='Catatan') setNoteForm({...noteForm, judul: e.target.value});
                              if(activeTab==='Highlight') setHighlightForm({...highlightForm, judul: e.target.value});
                            }} className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000]" />
                          
                          {activeTab !== 'Highlight' && (
                            <input type="text" placeholder={activeTab==='Catatan' ? "Penulis" : activeTab==='Design' ? "Designer" : "Kategori"} 
                              value={activeTab==='Drive'?driveForm.kategori : activeTab==='Design'?designForm.designer : activeTab==='Bahan'?bahanForm.kategori : activeTab==='Catatan'?noteForm.penulis : ''} 
                              onChange={e => {
                                if(activeTab==='Drive') setDriveForm({...driveForm, kategori: e.target.value});
                                if(activeTab==='Design') setDesignForm({...designForm, designer: e.target.value});
                                if(activeTab==='Bahan') setBahanForm({...bahanForm, kategori: e.target.value});
                                if(activeTab==='Catatan') setNoteForm({...noteForm, penulis: e.target.value});
                              }} className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000]" />
                          )}
                        </div>
                      )}

                      {(activeTab === 'Drive' || activeTab === 'Design' || activeTab === 'Catatan') && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <input type="text" placeholder="Tanggal" 
                             value={activeTab==='Drive'?driveForm.tanggal : activeTab==='Design'?designForm.tanggal : noteForm.tanggal} 
                             onChange={e => {
                               if(activeTab==='Drive') setDriveForm({...driveForm, tanggal: e.target.value});
                               if(activeTab==='Design') setDesignForm({...designForm, tanggal: e.target.value});
                               if(activeTab==='Catatan') setNoteForm({...noteForm, tanggal: e.target.value});
                             }} className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000]" />
                           
                           {activeTab !== 'Catatan' && (
                              <input type="text" placeholder="Link / URL" 
                                value={activeTab==='Drive'?driveForm.link : designForm.linkDesign} 
                                onChange={e => {
                                  if(activeTab==='Drive') setDriveForm({...driveForm, link: e.target.value});
                                  if(activeTab==='Design') setDesignForm({...designForm, linkDesign: e.target.value});
                                }} className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000]" />
                           )}
                           {activeTab === 'Design' && (
                             <input type="text" placeholder="Kategori Design" value={designForm.kategori} onChange={e=>setDesignForm({...designForm, kategori:e.target.value})} className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000]" />
                           )}
                         </div>
                      )}

                      {activeTab === 'Sosmed' && (
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <input type="text" placeholder="Platform (Instagram, YouTube, dll)" value={sosmedForm.platform} onChange={e => setSosmedForm({...sosmedForm, platform: e.target.value})} className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000]" />
                           <input type="text" placeholder="Username" value={sosmedForm.username} onChange={e => setSosmedForm({...sosmedForm, username: e.target.value})} className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000]" />
                           <input type="text" placeholder="Link Profile" value={sosmedForm.link} onChange={e => setSosmedForm({...sosmedForm, link: e.target.value})} className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-[#cc0000]" />
                         </div>
                      )}

                      {(activeTab === 'Drive' || activeTab === 'Design' || activeTab === 'Catatan' || activeTab === 'Highlight') && (
                        <textarea rows={activeTab==='Catatan' ? 6 : 3} placeholder={activeTab==='Catatan' ? "Isi Catatan Notulensi..." : "Deskripsi Singkat..."} 
                          value={activeTab==='Drive'?driveForm.deskripsi : activeTab==='Design'?designForm.deskripsi : activeTab==='Highlight'?highlightForm.deskripsi : noteForm.isiCatatan} 
                          onChange={e => {
                            if(activeTab==='Drive') setDriveForm({...driveForm, deskripsi: e.target.value});
                            if(activeTab==='Design') setDesignForm({...designForm, deskripsi: e.target.value});
                            if(activeTab==='Highlight') setHighlightForm({...highlightForm, deskripsi: e.target.value});
                            if(activeTab==='Catatan') setNoteForm({...noteForm, isiCatatan: e.target.value});
                          }} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-medium text-sm outline-none focus:border-[#cc0000] resize-none"></textarea>
                      )}

                      {/* TOMBOL SAVE */}
                      <div className="flex justify-end gap-3 pt-4 border-t-2 border-gray-100">
                        <button onClick={
                          activeTab === 'Anggota' ? handleSaveMember :
                          activeTab === 'Drive' ? handleSaveDrive :
                          activeTab === 'Design' ? handleSaveDesign :
                          activeTab === 'Bahan' ? handleSaveBahan :
                          activeTab === 'Catatan' ? handleSaveNote :
                          activeTab === 'Highlight' ? handleSaveHighlight :
                          handleSaveSosmed
                        } className="bg-[#cc0000] hover:bg-[#990000] text-white font-black italic px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_4px_10px_rgba(200,0,0,0.3)] border-b-[4px] border-[#7a0000] transform hover:-translate-y-1 transition-all">
                          <Save size={16} strokeWidth={3}/> SIMPAN DATA CLOUD
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ) : (
                
                // === TAMPILAN LIST ===
                <div className="bg-white border-2 border-gray-200 rounded-[2rem] p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black italic text-gray-800 flex items-center gap-2 uppercase tracking-widest"><Package className="text-[#cc0000]" size={24} strokeWidth={3}/> DATA {activeTab}</h3>
                    <button onClick={() => { 
                      if(activeTab==='Anggota') setIsAddingMember(true);
                      if(activeTab==='Drive') setIsAddingDrive(true);
                      if(activeTab==='Design') setIsAddingDesign(true);
                      if(activeTab==='Bahan') setIsAddingBahan(true);
                      if(activeTab==='Catatan') setIsAddingNote(true);
                      if(activeTab==='Highlight') setIsAddingHighlight(true);
                      if(activeTab==='Sosmed') setIsAddingSosmed(true);
                    }} className="bg-[#ffde00] hover:bg-[#ccaa00] text-[#990000] font-black italic text-xs uppercase tracking-widest px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm border-b-[3px] border-[#ccaa00] transform hover:-translate-y-1 transition-all">
                      <Plus size={16} strokeWidth={3}/> TAMBAH BARU
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {activeTab === 'Anggota' && members.map(m => (
                      <div key={m.id} className="bg-gray-50 border-2 border-gray-200 p-4 rounded-2xl flex items-center gap-4 hover:border-[#cc0000] transition-colors group">
                        <img src={m.fotoFormal || m.foto} className="w-14 h-14 object-cover rounded-full border-2 border-white shadow-md" />
                        <div className="flex-1 min-w-0"><h4 className="font-black italic text-sm text-gray-800 truncate uppercase">{m.nama}</h4><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">{m.jabatan}</p></div>
                        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setMemberForm(m); setIsAddingMember(false); setEditingMember(m); }} className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Edit size={14} strokeWidth={3}/></button>
                          <button onClick={()=>deleteFromSupabase('anggota', m.id, setMembers, members)} className="p-2 bg-red-100 text-red-600 rounded-lg"><Trash2 size={14} strokeWidth={3}/></button>
                        </div>
                      </div>
                    ))}

                    {(activeTab === 'Drive' ? drives : activeTab === 'Design' ? designs : activeTab === 'Bahan' ? bahans : activeTab === 'Catatan' ? notes : activeTab === 'Highlight' ? highlights : activeTab === 'Sosmed' ? sosmeds : []).map((item: any) => (
                      <div key={item.id} className="bg-gray-50 border-2 border-gray-200 p-4 rounded-2xl flex flex-col gap-3 hover:border-[#cc0000] transition-colors group shadow-sm">
                        {(item.gambarPreview || item.gambar) && (
                          <div className="w-full h-24 bg-gray-200 rounded-xl overflow-hidden border-2 border-white shadow-inner">
                            <img src={item.gambarPreview || item.gambar} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black italic text-sm text-gray-800 truncate uppercase">{item.judul || item.platform}</h4>
                          <p className="text-[10px] font-bold text-[#cc0000] uppercase tracking-widest truncate">{item.kategori || item.designer || item.username || item.tanggal}</p>
                        </div>
                        <div className="flex justify-end gap-2 pt-2 border-t-2 border-gray-200">
                          <button onClick={() => {
                            if(activeTab==='Drive') { setDriveForm(item); setIsAddingDrive(false); setEditingDrive(item); }
                            if(activeTab==='Design') { setDesignForm(item); setIsAddingDesign(false); setEditingDesign(item); }
                            if(activeTab==='Bahan') { setBahanForm(item); setIsAddingBahan(false); setEditingBahan(item); }
                            if(activeTab==='Catatan') { setNoteForm(item); setIsAddingNote(false); setEditingNote(item); }
                            if(activeTab==='Highlight') { setHighlightForm(item); setIsAddingHighlight(false); setEditingHighlight(item); }
                            if(activeTab==='Sosmed') { setSosmedForm(item); setIsAddingSosmed(false); setEditingSosmed(item); }
                          }} className="px-3 py-1.5 bg-blue-100 text-blue-600 text-[10px] font-black italic rounded-lg uppercase"><Edit size={12} strokeWidth={3} className="inline mr-1"/> EDIT</button>
                          
                          <button onClick={() => deleteFromSupabase(activeTab.toLowerCase(), item.id, 
                            activeTab==='Drive'?setDrives : activeTab==='Design'?setDesigns : activeTab==='Bahan'?setBahans : activeTab==='Catatan'?setNotes : activeTab==='Highlight'?setHighlights : setSosmeds, 
                            activeTab==='Drive'?drives : activeTab==='Design'?designs : activeTab==='Bahan'?bahans : activeTab==='Catatan'?notes : activeTab==='Highlight'?highlights : sosmeds
                          )} className="px-3 py-1.5 bg-red-100 text-red-600 text-[10px] font-black italic rounded-lg uppercase"><Trash2 size={12} strokeWidth={3}/></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
        body { font-family: 'Montserrat', sans-serif; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}