'use client'

import { useState, useEffect } from 'react';
import { Settings, UploadCloud, ImageIcon, Save, PenTool, CheckCircle, Loader2, FileText, Edit, Trash2, X, Users, Plus, Terminal, Cpu, Activity, ShieldCheck, Link as LinkIcon, UserCircle, Package } from 'lucide-react';
// IMPORT KONEKTOR SUPABASE
import { supabase } from '@/lib/supabase'; 

// Interfaces
interface AbsensiRecord { memberId: string; nama: string; status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpa'; }
interface NoteItem { id: string; judul: string; tanggal: string; penulis: string; gambarPreview: string; isiCatatan: string; absen: AbsensiRecord[]; }
interface MemberItem { id: string; nama: string; jabatan: string; angkatan: string; hobi: string; citaCita: string; kataKata: string; foto: string; fotoFormal: string; updatedAt: number; }
interface DesignItem { id: string; judul: string; tanggal: string; kategori: string; designer: string; deskripsi: string; linkDesign: string; gambarPreview: string; updatedAt: number; }
interface DriveItem { id: string; judul: string; kategori: string; tanggal: string; deskripsi: string; link: string; gambarPreview: string; updatedAt: number; }
// INTERFACE BARU UNTUK BAHAN
interface BahanItem { id: string; judul: string; kategori: string; gambar: string; updatedAt: number; }

export default function AdminPage() {
  const adminTabs = ['Input Dashboard', 'Input Drive', 'Input Design', 'Input Catatan', 'Input Bahan', 'Input Highlight', 'Input Anggota', 'Input Sosial Media'];
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

  // STATE ANGGOTA
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [editingMember, setEditingMember] = useState<MemberItem | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [memberForm, setMemberForm] = useState<MemberItem>({
    id: '', nama: '', jabatan: '', angkatan: '', hobi: '', citaCita: '', kataKata: '', foto: '', fotoFormal: '', updatedAt: 0
  });

  // STATE DESIGN
  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [editingDesign, setEditingDesign] = useState<DesignItem | null>(null);
  const [isAddingDesign, setIsAddingDesign] = useState(false);
  const [designForm, setDesignForm] = useState<DesignItem>({
    id: '', judul: '', tanggal: '', kategori: '', designer: '', deskripsi: '', linkDesign: '', gambarPreview: '', updatedAt: 0
  });

  // STATE DRIVE
  const [drives, setDrives] = useState<DriveItem[]>([]);
  const [editingDrive, setEditingDrive] = useState<DriveItem | null>(null);
  const [isAddingDrive, setIsAddingDrive] = useState(false);
  const [driveForm, setDriveForm] = useState<DriveItem>({
    id: '', judul: '', kategori: '', tanggal: '', deskripsi: '', link: '', gambarPreview: '', updatedAt: 0
  });

  // STATE BAHAN (BARU)
  const [bahans, setBahans] = useState<BahanItem[]>([]);
  const [editingBahan, setEditingBahan] = useState<BahanItem | null>(null);
  const [isAddingBahan, setIsAddingBahan] = useState(false);
  const [bahanForm, setBahanForm] = useState<BahanItem>({
    id: '', judul: '', kategori: '', gambar: '', updatedAt: 0
  });

  // ==========================================
  // FUNGSI MENGAMBIL DATA DARI SUPABASE (READ)
  // ==========================================
  useEffect(() => {
    const loadDataFromCloud = async () => {
      // Load Dashboard Settings
      const { data: settingsData } = await supabase.from('settings').select('*').eq('id', 'dashboard').single();
      if (settingsData) {
        setJudul(settingsData.judul);
        setDeskripsi(settingsData.deskripsi);
        setDashboardImagePreview(settingsData.gambar);
      }

      // Load Anggota
      const { data: anggotaData } = await supabase.from('anggota').select('*');
      if (anggotaData) setMembers(anggotaData);

      // Load Design
      const { data: designData } = await supabase.from('design').select('*');
      if (designData) setDesigns(designData);

      // Load Drive
      const { data: driveData } = await supabase.from('drive').select('*');
      if (driveData) setDrives(driveData);

      // Load Bahan
      const { data: bahanData } = await supabase.from('bahan').select('*');
      if (bahanData) setBahans(bahanData);
    };

    loadDataFromCloud();
  }, []);

  // KOMPRESI GAMBAR 
  const processImageFile = (file: File, callback: (dataUrl: string) => void, preservePng: boolean = false) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Jika file asli PNG atau preservePng aktif, pertahankan format
        const isTruePng = file.type === 'image/png' || preservePng;
        const maxWidth = isTruePng ? 800 : 500; 
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        if (isTruePng) {
          callback(canvas.toDataURL('image/png')); 
        } else {
          callback(canvas.toDataURL('image/jpeg', 0.7)); 
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  // ==========================================
  // FUNGSI DASHBOARD (SUPABASE)
  // ==========================================
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    processImageFile(file, (dataUrl) => setDashboardImagePreview(dataUrl), false);
  };

  const handleSaveDashboard = async () => {
    setIsSaving(true);
    const { error } = await supabase.from('settings').upsert({
      id: 'dashboard', judul: judul, deskripsi: deskripsi, gambar: dashboardImagePreview
    });

    if (!error) {
      setIsSaved(true); setTimeout(() => setIsSaved(false), 2500);
    }
    setIsSaving(false);
  };

  // ==========================================
  // FUNGSI DRIVE (SUPABASE)
  // ==========================================
  const handleDriveImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file, (dataUrl) => setDriveForm({ ...driveForm, gambarPreview: dataUrl }), false);
  };

  const startEditDrive = (drive: DriveItem) => {
    setDriveForm(drive); setIsAddingDrive(false); setEditingDrive(drive);
  };

  const handleSaveDrive = async () => {
    if (!driveForm.judul || !driveForm.link || !driveForm.gambarPreview) { alert("Judul, Link, dan Gambar Preview wajib diisi!"); return; }
    const updatedData = { ...driveForm, updatedAt: Date.now() };
    if (isAddingDrive) updatedData.id = 'drive-' + Date.now();

    const { error } = await supabase.from('drive').upsert(updatedData);

    if (!error) {
      if (isAddingDrive) setDrives([...drives, updatedData]); else setDrives(drives.map(d => d.id === updatedData.id ? updatedData : d));
      setDriveForm({ id: '', judul: '', kategori: '', tanggal: '', deskripsi: '', link: '', gambarPreview: '', updatedAt: 0 });
      setIsAddingDrive(false); setEditingDrive(null);
    }
  };

  const handleDeleteDrive = async (id: string) => {
    if (confirm("Hapus arsip ini dari Cloud?")) {
      const { error } = await supabase.from('drive').delete().eq('id', id);
      if (!error) setDrives(drives.filter(d => d.id !== id));
    }
  };

  // ==========================================
  // FUNGSI ANGGOTA (SUPABASE)
  // ==========================================
  const handleMemberMainImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file, (dataUrl) => setMemberForm({ ...memberForm, foto: dataUrl }), true); 
  };

  const handleMemberAvatarChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file, (dataUrl) => setMemberForm({ ...memberForm, fotoFormal: dataUrl }), false);
  };

  const startEditMember = (member: MemberItem) => {
    setMemberForm(member); setIsAddingMember(false); setEditingMember(member);
  };

  const handleSaveMember = async () => {
    if (!memberForm.nama || !memberForm.jabatan || !memberForm.foto || !memberForm.fotoFormal) { alert("Nama, Jabatan, Foto Utama, dan Foto Roster wajib diisi!"); return; }
    const updatedData = { ...memberForm, updatedAt: Date.now() };
    if (isAddingMember) updatedData.id = 'member-' + Date.now();

    const { error } = await supabase.from('anggota').upsert(updatedData);

    if (!error) {
      if (isAddingMember) setMembers([...members, updatedData]); else setMembers(members.map(m => m.id === updatedData.id ? updatedData : m));
      setMemberForm({ id: '', nama: '', jabatan: '', angkatan: '', hobi: '', citaCita: '', kataKata: '', foto: '', fotoFormal: '', updatedAt: 0 });
      setIsAddingMember(false); setEditingMember(null);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (confirm("Hapus anggota ini dari database Cloud?")) {
      const { error } = await supabase.from('anggota').delete().eq('id', id);
      if (!error) setMembers(members.filter(m => m.id !== id));
    }
  };

  // ==========================================
  // FUNGSI DESIGN (SUPABASE)
  // ==========================================
  const handleDesignImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file, (dataUrl) => setDesignForm({ ...designForm, gambarPreview: dataUrl }), false);
  };

  const startEditDesign = (design: DesignItem) => {
    setDesignForm(design); setIsAddingDesign(false); setEditingDesign(design);
  };

  const handleSaveDesign = async () => {
    if (!designForm.judul || !designForm.designer || !designForm.gambarPreview) { alert("Judul, Designer, dan Visual Desain wajib diisi!"); return; }
    const updatedData = { ...designForm, updatedAt: Date.now() };
    if (isAddingDesign) updatedData.id = 'design-' + Date.now();

    const { error } = await supabase.from('design').upsert(updatedData);

    if (!error) {
      if (isAddingDesign) setDesigns([...designs, updatedData]); else setDesigns(designs.map(d => d.id === updatedData.id ? updatedData : d));
      setDesignForm({ id: '', judul: '', tanggal: '', kategori: '', designer: '', deskripsi: '', linkDesign: '', gambarPreview: '', updatedAt: 0 });
      setIsAddingDesign(false); setEditingDesign(null);
    }
  };

  const handleDeleteDesign = async (id: string) => {
    if (confirm("Hapus aset desain ini dari Cloud?")) {
      const { error } = await supabase.from('design').delete().eq('id', id);
      if (!error) setDesigns(designs.filter(d => d.id !== id));
    }
  };

  // ==========================================
  // FUNGSI BAHAN (SUPABASE) - BARU
  // ==========================================
  const handleBahanImageChange = (e: any) => {
    const file = e.target.files?.[0];
    // Pastikan preservePng: true agar bahan transparan tidak berubah hitam
    if (file) processImageFile(file, (dataUrl) => setBahanForm({ ...bahanForm, gambar: dataUrl }), true);
  };

  const startEditBahan = (bahan: BahanItem) => {
    setBahanForm(bahan); setIsAddingBahan(false); setEditingBahan(bahan);
  };

  const handleSaveBahan = async () => {
    if (!bahanForm.judul || !bahanForm.gambar) { alert("Judul dan Gambar Bahan wajib diisi!"); return; }
    const updatedData = { ...bahanForm, updatedAt: Date.now() };
    if (isAddingBahan) updatedData.id = 'bahan-' + Date.now();

    const { error } = await supabase.from('bahan').upsert(updatedData);

    if (!error) {
      if (isAddingBahan) {
        setBahans([...bahans, updatedData]);
      } else {
        setBahans(bahans.map(b => b.id === updatedData.id ? updatedData : b));
      }
      setBahanForm({ id: '', judul: '', kategori: '', gambar: '', updatedAt: 0 });
      setIsAddingBahan(false); setEditingBahan(null);
    } else {
      alert("Gagal menyimpan bahan/aset ke Cloud.");
      console.error(error);
    }
  };

  const handleDeleteBahan = async (id: string) => {
    if (confirm("Hapus aset bahan ini dari Cloud?")) {
      const { error } = await supabase.from('bahan').delete().eq('id', id);
      if (!error) setBahans(bahans.filter(b => b.id !== id));
    }
  };

  return (
    <div className="w-full h-screen bg-[#020617] p-4 lg:p-6 flex flex-col overflow-hidden relative z-10 selection:bg-cyan-500/30 text-slate-200 font-sans">
      
      {/* HUD BACKGROUND EFFECT */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="max-w-screen-2xl mx-auto w-full h-full flex flex-col relative z-10">
        
        {/* HEADER SCI-FI COMPACT */}
        <div className="mb-4 pb-3 border-b border-cyan-900/50 relative shrink-0">
          <div className="absolute bottom-0 left-0 w-24 h-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded-sm flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-cyan-400 animate-pulse" /> Auth: Admin (Cloud Mode)
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-100 to-blue-400 tracking-tight">
                SYSTEM_CONTROL
              </h1>
            </div>
          </div>
        </div>

        {/* HUD TABS NAVIGATION */}
        <div className="w-full mb-4 overflow-x-auto custom-scrollbar pb-1 shrink-0">
          <div className="flex items-center gap-2 w-max">
            {adminTabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => { 
                  setActiveTab(tab); 
                  setEditingNote(null); setEditingMember(null); setIsAddingMember(false); 
                  setEditingDesign(null); setIsAddingDesign(false);
                  setEditingDrive(null); setIsAddingDrive(false);
                  setEditingBahan(null); setIsAddingBahan(false);
                }}
                className={`px-4 py-2 rounded-lg font-mono text-[11px] uppercase tracking-widest transition-all duration-300 border flex items-center gap-1.5 ${
                  activeTab === tab 
                  ? 'bg-cyan-950/40 text-cyan-300 border-cyan-400/80 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                  : 'bg-slate-900/40 text-slate-400 border-slate-700/50 hover:text-cyan-400 hover:border-cyan-500/50'
                }`}
              >
                {activeTab === tab && <Activity size={12} className="animate-pulse" />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT CONTAINER */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-4">
          
          {/* TAB DASHBOARD */}
          {activeTab === 'Input Dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up">
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 flex flex-col relative overflow-hidden group">
                <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <ImageIcon className="text-cyan-400" size={20} /> Hologram Base Layer
                </h3>
                <label htmlFor="file-upload" className="flex-1 border-2 border-dashed border-cyan-900/50 rounded-xl bg-slate-950/50 flex flex-col items-center justify-center p-6 hover:border-cyan-400/80 cursor-pointer min-h-[200px]">
                  {dashboardImagePreview ? (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden border border-cyan-500/30">
                      <img src={dashboardImagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <UploadCloud className="size-8 text-cyan-400 mb-2" />
                  )}
                  <p className="text-cyan-500/70 font-mono text-[11px] mt-2 text-center uppercase">{fileName ? fileName : 'Upload Image'}</p>
                  <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                    <Terminal className="text-blue-400" size={20} /> Text Parameters
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-cyan-500/70 uppercase mb-1">Core Title</label>
                      <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-cyan-500/70 uppercase mb-1">System Description</label>
                      <textarea rows={3} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 outline-none resize-none"></textarea>
                    </div>
                  </div>
                </div>
                <button onClick={handleSaveDashboard} disabled={isSaving} className="w-full mt-6 font-mono text-xs uppercase font-bold py-3 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
                  {isSaving ? <Loader2 className="animate-spin" size={16} /> : isSaved ? <CheckCircle size={16} /> : <Cpu size={16} />} 
                  {isSaved ? 'Synced to Cloud!' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* TAB DRIVE */}
          {activeTab === 'Input Drive' && (
            <div className="animate-fade-in-up">
              {isAddingDrive || editingDrive ? (
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-5xl mx-auto">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                    <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <FileText className="text-cyan-400" size={18}/> Drive Archive Parameters
                    </h2>
                    <button onClick={() => { setIsAddingDrive(false); setEditingDrive(null); }} className="text-slate-400 hover:text-white"><X size={18}/></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="col-span-4">
                      <label className="block text-[10px] font-mono text-cyan-500/70 uppercase mb-1">Archive Thumbnail</label>
                      <label className="w-full aspect-[4/3] border-2 border-dashed border-cyan-900/50 rounded-xl bg-slate-950/60 flex flex-col items-center justify-center overflow-hidden cursor-pointer relative">
                        {driveForm.gambarPreview ? (
                          <img src={driveForm.gambarPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <UploadCloud size={24} className="text-slate-500" />
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleDriveImageChange} />
                      </label>
                    </div>
                    <div className="col-span-8 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Archive Title" value={driveForm.judul} onChange={e => setDriveForm({...driveForm, judul: e.target.value})} className="bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                        <input type="text" placeholder="Category (e.g. Surat, Dokumentasi)" value={driveForm.kategori} onChange={e => setDriveForm({...driveForm, kategori: e.target.value})} className="bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Date Logged" value={driveForm.tanggal} onChange={e => setDriveForm({...driveForm, tanggal: e.target.value})} className="bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                        <input type="text" placeholder="Drive / Source Link" value={driveForm.link} onChange={e => setDriveForm({...driveForm, link: e.target.value})} className="bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                      </div>
                      <textarea rows={3} placeholder="Archive Description" value={driveForm.deskripsi} onChange={e => setDriveForm({...driveForm, deskripsi: e.target.value})} className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none resize-none"></textarea>
                      <div className="flex justify-end gap-2 pt-2">
                        <button onClick={() => { setIsAddingDrive(false); setEditingDrive(null); }} className="px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-400">Cancel</button>
                        <button onClick={handleSaveDrive} className="px-5 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg">Save Archive (Cloud)</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2"><FileText className="text-cyan-400" size={20} /> Drive Vault</h3>
                    <button onClick={() => { setDriveForm({ id: '', judul: '', kategori: '', tanggal: '', deskripsi: '', link: '', gambarPreview: '', updatedAt: 0 }); setIsAddingDrive(true); }} className="bg-cyan-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5">
                      <Plus size={14} /> Add Archive
                    </button>
                  </div>
                  {drives.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {drives.map(drive => (
                        <div key={drive.id} className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
                          <img src={drive.gambarPreview} alt="" className="w-16 h-12 object-cover rounded" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-100 truncate">{drive.judul}</h4>
                            <p className="text-[10px] text-cyan-400 font-mono truncate">{drive.kategori}</p>
                          </div>
                          <button onClick={() => startEditDrive(drive)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit size={14} /></button>
                          <button onClick={() => handleDeleteDrive(drive.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} /></button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-xs text-slate-500 py-8 font-mono">No archives registered.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB DESIGN */}
          {activeTab === 'Input Design' && (
            <div className="animate-fade-in-up">
              {isAddingDesign || editingDesign ? (
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-5xl mx-auto">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                    <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <PenTool className="text-cyan-400" size={18}/> Design Asset Parameters
                    </h2>
                    <button onClick={() => { setIsAddingDesign(false); setEditingDesign(null); }} className="text-slate-400 hover:text-white"><X size={18}/></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="col-span-4">
                      <label className="block text-[10px] font-mono text-cyan-500/70 uppercase mb-1">Visual (3:4)</label>
                      <label className="w-full aspect-[3/4] border-2 border-dashed border-cyan-900/50 rounded-xl bg-slate-950/60 flex flex-col items-center justify-center overflow-hidden cursor-pointer relative">
                        {designForm.gambarPreview ? (
                          <img src={designForm.gambarPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <UploadCloud size={24} className="text-slate-500" />
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleDesignImageChange} />
                      </label>
                    </div>
                    <div className="col-span-8 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Title" value={designForm.judul} onChange={e => setDesignForm({...designForm, judul: e.target.value})} className="bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                        <input type="text" placeholder="Designer Name" value={designForm.designer} onChange={e => setDesignForm({...designForm, designer: e.target.value})} className="bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Category" value={designForm.kategori} onChange={e => setDesignForm({...designForm, kategori: e.target.value})} className="bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                        <input type="text" placeholder="Date" value={designForm.tanggal} onChange={e => setDesignForm({...designForm, tanggal: e.target.value})} className="bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                      </div>
                      <input type="text" placeholder="Source Link" value={designForm.linkDesign} onChange={e => setDesignForm({...designForm, linkDesign: e.target.value})} className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                      <textarea rows={3} placeholder="Description" value={designForm.deskripsi} onChange={e => setDesignForm({...designForm, deskripsi: e.target.value})} className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none resize-none"></textarea>
                      <div className="flex justify-end gap-2 pt-2">
                        <button onClick={() => { setIsAddingDesign(false); setEditingDesign(null); }} className="px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-400">Cancel</button>
                        <button onClick={handleSaveDesign} className="px-5 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg">Save Asset (Cloud)</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2"><PenTool className="text-cyan-400" size={20} /> Design Vault</h3>
                    <button onClick={() => { setDesignForm({ id: '', judul: '', tanggal: '', kategori: '', designer: '', deskripsi: '', linkDesign: '', gambarPreview: '', updatedAt: 0 }); setIsAddingDesign(true); }} className="bg-cyan-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5">
                      <Plus size={14} /> Add Design
                    </button>
                  </div>
                  {designs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {designs.map(design => (
                        <div key={design.id} className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
                          <img src={design.gambarPreview} alt="" className="w-12 h-16 object-cover rounded" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-100 truncate">{design.judul}</h4>
                            <p className="text-[10px] text-cyan-400 font-mono truncate">{design.designer}</p>
                          </div>
                          <button onClick={() => startEditDesign(design)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit size={14} /></button>
                          <button onClick={() => handleDeleteDesign(design.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} /></button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-xs text-slate-500 py-8 font-mono">No design assets registered.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB ANGGOTA */}
          {activeTab === 'Input Anggota' && (
            <div className="animate-fade-in-up">
              {isAddingMember || editingMember ? (
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-5xl mx-auto">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                    <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2"><Users className="text-cyan-400" size={18}/> Member Bio-Signature</h2>
                    <button onClick={() => { setIsAddingMember(false); setEditingMember(null); }} className="text-slate-400 hover:text-white"><X size={18}/></button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="col-span-1 md:col-span-5 flex gap-4 h-[250px]">
                      
                      {/* FOTO 1: MAIN PORTRAIT TRANSARENT (PNG) */}
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="block text-[10px] font-mono text-cyan-500/70 uppercase mb-1">Main Transparent (PNG)</label>
                        <label className="w-full h-full border-2 border-dashed border-cyan-900/50 rounded-xl bg-slate-950/60 flex flex-col items-center justify-center overflow-hidden cursor-pointer relative group">
                          {memberForm.foto ? (
                            <img src={memberForm.foto} alt="" className="w-full h-full object-contain filter contrast-110" />
                          ) : (
                            <div className="flex flex-col items-center text-slate-500 group-hover:text-cyan-400 transition-colors">
                              <UploadCloud size={24} className="mb-2" />
                              <span className="text-[9px] font-mono uppercase">Upload Main</span>
                            </div>
                          )}
                          <input type="file" accept="image/png" className="hidden" onChange={handleMemberMainImageChange} />
                        </label>
                      </div>

                      {/* FOTO 2: ROSTER AVATAR (JPG/SQUARE) */}
                      <div className="w-1/3 flex flex-col gap-2">
                        <label className="block text-[10px] font-mono text-cyan-500/70 uppercase mb-1">Roster Icon</label>
                        <label className="w-full h-full border-2 border-dashed border-cyan-900/50 rounded-xl bg-slate-950/60 flex flex-col items-center justify-center overflow-hidden cursor-pointer relative group">
                          {memberForm.fotoFormal ? (
                            <img src={memberForm.fotoFormal} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center text-slate-500 group-hover:text-cyan-400 transition-colors">
                              <UserCircle size={20} className="mb-2" />
                              <span className="text-[9px] font-mono uppercase">Icon</span>
                            </div>
                          )}
                          <input type="file" accept="image/*" className="hidden" onChange={handleMemberAvatarChange} />
                        </label>
                      </div>

                    </div>
                    
                    {/* BAGIAN DATA TEKS */}
                    <div className="col-span-1 md:col-span-7 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Name" value={memberForm.nama} onChange={e => setMemberForm({...memberForm, nama: e.target.value})} className="bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                        <input type="text" placeholder="Role" value={memberForm.jabatan} onChange={e => setMemberForm({...memberForm, jabatan: e.target.value})} className="bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                      </div>
                      <input type="text" placeholder="Batch" value={memberForm.angkatan} onChange={e => setMemberForm({...memberForm, angkatan: e.target.value})} className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Hobby" value={memberForm.hobi} onChange={e => setMemberForm({...memberForm, hobi: e.target.value})} className="bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                        <input type="text" placeholder="Ambition" value={memberForm.citaCita} onChange={e => setMemberForm({...memberForm, citaCita: e.target.value})} className="bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                      </div>
                      <textarea rows={2} placeholder="Quote" value={memberForm.kataKata} onChange={e => setMemberForm({...memberForm, kataKata: e.target.value})} className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none resize-none"></textarea>
                      <div className="flex justify-end gap-2 pt-2">
                        <button onClick={() => { setIsAddingMember(false); setEditingMember(null); }} className="px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-400">Cancel</button>
                        <button onClick={handleSaveMember} className="px-5 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg">Save Member (Cloud)</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2"><Users className="text-cyan-400" size={20} /> Personnel Database</h3>
                    <button onClick={() => { setMemberForm({ id: '', nama: '', jabatan: '', angkatan: '', hobi: '', citaCita: '', kataKata: '', foto: '', fotoFormal: '', updatedAt: 0 }); setIsAddingMember(true); }} className="bg-cyan-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5">
                      <Plus size={14} /> Add Member
                    </button>
                  </div>
                  {members.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {members.map(member => (
                        <div key={member.id} className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
                          <img src={member.fotoFormal || member.foto} alt="" className="w-12 h-12 object-cover rounded-full border border-slate-700" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-100 truncate">{member.nama}</h4>
                            <p className="text-[10px] text-cyan-400 font-mono truncate">{member.jabatan}</p>
                          </div>
                          <button onClick={() => startEditMember(member)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit size={14} /></button>
                          <button onClick={() => handleDeleteMember(member.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} /></button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-xs text-slate-500 py-8 font-mono">No personnel records found.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB BAHAN (ASET MATERIAL) */}
          {activeTab === 'Input Bahan' && (
            <div className="animate-fade-in-up">
              {isAddingBahan || editingBahan ? (
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-3xl mx-auto">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                    <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <Package className="text-cyan-400" size={18}/> Asset/Material Editor
                    </h2>
                    <button onClick={() => { setIsAddingBahan(false); setEditingBahan(null); }} className="text-slate-400 hover:text-white"><X size={18}/></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-mono text-cyan-500/70 uppercase mb-1">Asset Image (PNG/JPG)</label>
                      <label className="w-full h-48 border-2 border-dashed border-cyan-900/50 rounded-xl bg-[#060C17]/60 flex flex-col items-center justify-center overflow-hidden cursor-pointer relative">
                        {bahanForm.gambar ? (
                          <img src={bahanForm.gambar} alt="Preview" className="w-full h-full object-contain p-2" />
                        ) : (
                          <UploadCloud size={24} className="text-slate-500" />
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleBahanImageChange} />
                      </label>
                      <p className="text-[9px] text-slate-500 mt-2 italic">*Transparansi PNG akan dipertahankan</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-cyan-500/70 uppercase mb-1">Title / Name</label>
                        <input type="text" placeholder="Misal: Logo Archanova" value={bahanForm.judul} onChange={e => setBahanForm({...bahanForm, judul: e.target.value})} className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-cyan-500/70 uppercase mb-1">Category / Tag</label>
                        <input type="text" placeholder="Misal: Logo, Vektor, Background" value={bahanForm.kategori} onChange={e => setBahanForm({...bahanForm, kategori: e.target.value})} className="w-full bg-slate-950/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none" />
                      </div>
                      <div className="flex justify-end gap-2 pt-6">
                        <button onClick={() => { setIsAddingBahan(false); setEditingBahan(null); }} className="px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-400">Cancel</button>
                        <button onClick={handleSaveBahan} className="px-5 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg">Save Asset (Cloud)</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2"><Package className="text-cyan-400" size={20} /> Assets Library</h3>
                    <button onClick={() => { setBahanForm({ id: '', judul: '', kategori: '', gambar: '', updatedAt: 0 }); setIsAddingBahan(true); }} className="bg-cyan-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5">
                      <Plus size={14} /> Add Asset
                    </button>
                  </div>
                  {bahans.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {bahans.map(bahan => (
                        <div key={bahan.id} className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl flex items-center gap-3 group hover:border-cyan-500/40 transition-colors">
                          <div className="w-12 h-12 bg-[#060C17] rounded-lg border border-slate-800 flex items-center justify-center p-1">
                            <img src={bahan.gambar} alt="" className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-100 truncate">{bahan.judul}</h4>
                            <p className="text-[10px] text-cyan-400 font-mono truncate">{bahan.kategori}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => startEditBahan(bahan)} className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit size={14} /></button>
                            <button onClick={() => handleDeleteBahan(bahan.id)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-xs text-slate-500 py-8 font-mono">No materials/assets registered.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* DEFAULT / OTHER TABS */}
          {activeTab !== 'Input Dashboard' && activeTab !== 'Input Drive' && activeTab !== 'Input Design' && activeTab !== 'Input Anggota' && activeTab !== 'Input Catatan' && activeTab !== 'Input Bahan' && (
            <div className="w-full h-48 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl flex flex-col items-center justify-center">
              <Settings className="text-cyan-900 mb-3 animate-spin-slow" size={40} strokeWidth={1} />
              <h2 className="text-lg font-bold text-slate-300 font-mono tracking-widest uppercase">Module: {activeTab}</h2>
              <p className="text-cyan-500/60 mt-1 font-mono text-xs uppercase animate-pulse">Status: Under Construction</p>
            </div>
          )}

        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px;}
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(2, 6, 23, 0.5); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(30, 41, 59, 0.8); border-radius: 10px; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}