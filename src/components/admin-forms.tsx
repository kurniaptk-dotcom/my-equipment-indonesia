'use client';

import { useActionState, useRef, useState, type ReactNode } from 'react';
import { acceptAccessToken, createInviteState, createResetState, saveContentState, toggleUserActive } from '@/app/admin/actions';
import { AdminIcon, type AdminIconName } from '@/components/admin-icon';

type State = { ok: boolean; message: string; inviteUrl?: string };
const initialState: State = { ok: false, message: '' };
type RecordData = Record<string, unknown>;

function value(record: RecordData, key: string, fallback = '') {
  const current = record[key];
  if (current === null || current === undefined) return fallback;
  if (typeof current === 'object') return JSON.stringify(current, null, 2);
  return String(current);
}
function Field({ label, name, record, type = 'text', required = false }: { label: string; name: string; record: RecordData; type?: string; required?: boolean }) {
  return <label className="cms-field"><span>{label}</span><input name={name} type={type} defaultValue={value(record,name)} required={required} /></label>;
}
function ImageField({ label, record, required = false, name = 'image', onValueChange }: { label:string; record:RecordData; required?:boolean; name?:string; onValueChange?:(value:string)=>void }) {
  const [current,setCurrent]=useState(value(record,'image'));
  function update(next:string){setCurrent(next);onValueChange?.(next)}
  return <div className="cms-field cms-image-field"><span>{label}</span><div className="cms-image-control">{current?<img src={current} alt="" className="cms-image-preview"/>:<span className="cms-image-empty" aria-hidden="true">IMG</span>}<div><input name={name} type="text" aria-label={label} value={current} onChange={e=>update(e.target.value)} placeholder="URL gambar atau unggah file" required={required}/><MediaPicker onChange={update}/></div></div></div>;
}
function LinesField({ label, name, record }: { label:string; name:string; record:RecordData }) {
  const current=Array.isArray(record[name]) ? (record[name] as unknown[]).map((item)=>typeof item==='string'?item:item&&typeof item==='object'&&'label' in item&&'value' in item?`${String(item.label)}|${String(item.value)}`:String(item)).join('\n') : value(record,name);
  return <label className="cms-field cms-field-wide"><span>{label}</span><textarea name={name} defaultValue={current} rows={5}/></label>;
}
function TextArea({ label, name, record, required = false, rows = 4 }: { label: string; name: string; record: RecordData; required?: boolean; rows?: number }) {
  return <label className="cms-field cms-field-wide"><span>{label}</span><textarea name={name} defaultValue={value(record,name)} required={required} rows={rows} /></label>;
}
function MediaPicker({ onChange, label = '↑ Pilih gambar' }: { onChange: (value: string) => void; label?: string }) {
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  async function upload(file?: File) {
    if (!file) return;
    setBusy(true); setError('');
    try {
      const signed = await fetch('/api/admin/uploads/presign',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({filename:file.name,contentType:file.type,size:file.size})});
      const data = await signed.json();
      if (!signed.ok) throw new Error(data.error || 'Upload gagal.');
      const uploaded = await fetch(data.uploadUrl,{method:'PUT',headers:data.headers,body:file});
      if (!uploaded.ok) throw new Error('Object storage menolak upload. Periksa CORS dan bucket.');
      onChange(data.publicUrl);
    } catch (e) { setError(e instanceof Error ? e.message : 'Upload gagal.'); }
    finally { setBusy(false); }
  }
  return <span className="cms-upload"><label className="cms-upload-button">{busy?'Mengunggah…':label}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={(e)=>upload(e.currentTarget.files?.[0])} /></label><small>JPG, PNG, WebP · maks. 10 MB</small>{error&&<small className="cms-upload-error" role="alert">{error}</small>}</span>;
}

function ArticleMarkdownField({ record }: { record:RecordData }) {
  const [markdown,setMarkdown]=useState(value(record,'contentMarkdown'));
  const [notice,setNotice]=useState('');
  const textarea=useRef<HTMLTextAreaElement>(null);
  function insertImage(url:string) {
    const input=textarea.current;
    if(!input) return;
    const start=input.selectionStart,end=input.selectionEnd;
    const snippet=`![Deskripsikan foto](${url})`;
    const next=`${markdown.slice(0,start)}${snippet}${markdown.slice(end)}`;
    setMarkdown(next); setNotice('Markdown gambar disisipkan. Perbarui alt text sebelum menyimpan.');
    requestAnimationFrame(()=>{input.focus();input.setSelectionRange(start+2,start+2+18)});
  }
  return <div className="cms-field cms-field-wide cms-markdown-editor"><span>Isi artikel · Markdown GFM</span><div className="cms-markdown-toolbar"><small>Gunakan # untuk judul, - untuk daftar, dan **tebal**. HTML mentah tidak ditampilkan.</small><MediaPicker onChange={insertImage} label="↑ Unggah & sisipkan foto"/></div><textarea ref={textarea} name="contentMarkdown" value={markdown} onChange={event=>setMarkdown(event.target.value)} rows={16} required aria-label="Isi artikel dalam Markdown"/><small aria-live="polite">{notice || 'Gambar inline hanya menerima file media CMS atau aset /images.'}</small></div>;
}

function SaveForm({ section, record, categories, isNew = false }: { section: string; record: RecordData; categories: {slug:string;title:string}[]; isNew?: boolean }) {
  const [state,action,pending] = useActionState<State,FormData>(saveContentState,initialState);
  const [seoPreview,setSeoPreview]=useState({siteName:value(record,'siteName','My Equipment Indonesia'),defaultTitle:value(record,'defaultTitle','My Equipment Indonesia | Solusi Usaha Laundry'),description:value(record,'description'),socialImage:value(record,'socialImage'),socialImageAlt:value(record,'socialImageAlt')});
  function updateSeo(key:keyof typeof seoPreview,next:string){setSeoPreview((current)=>({...current,[key]:next}))}
  const fields: Record<string,ReactNode> = {
    categories: <><input type="hidden" name="originalSlug" value={isNew?'':value(record,'slug')}/><Field label="Slug URL" name="slug" record={record} required/><Field label="Nama kategori" name="title" record={record} required/><Field label="Ikon (opsional)" name="icon" record={record}/><TextArea label="Deskripsi kategori" name="description" record={record}/><Field label="Urutan tampil" name="sortOrder" record={record} type="number"/></>,
    products: <><input type="hidden" name="originalSlug" value={isNew?'':value(record,'slug')}/><Field label="Slug URL" name="slug" record={record} required/><Field label="Nama produk" name="name" record={record} required/><label className="cms-field"><span>Kategori</span><select name="categorySlug" defaultValue={value(record,'categorySlug')} required><option value="">Pilih kategori</option>{categories.map(c=><option key={c.slug} value={c.slug}>{c.title}</option>)}</select></label><Field label="Harga (Rp)" name="price" record={record} type="number"/><label className="cms-field"><span>Status harga</span><select name="priceSource" defaultValue={value(record,'priceSource','confirm')}><option value="confirm">Perlu dikonfirmasi</option><option value="catalog-snapshot">Harga indikatif</option></select></label><Field label="URL toko resmi" name="storeUrl" record={record} type="url" required/><ImageField label="Foto produk" record={record}/><Field label="Teks alternatif foto" name="imageAlt" record={record}/><LinesField label="Slug URL lama (satu per baris)" name="legacySlugs" record={record}/><TextArea label="Deskripsi produk" name="description" record={record} required/><LinesField label="Spesifikasi (format Nama|Nilai, satu per baris)" name="specs" record={record}/><Field label="Urutan tampil" name="sortOrder" record={record} type="number"/></>,
    packages: <><Field label="Nama paket" name="name" record={record} required/><Field label="Label" name="label" record={record}/><Field label="Harga Rupiah" name="price" record={record} type="number" required/><ImageField label="Gambar" record={record}/><TextArea label="Deskripsi" name="description" record={record}/><LinesField label="Isi paket (satu item per baris)" name="points" record={record}/><Field label="Urutan" name="sortOrder" record={record} type="number"/></>,
    portfolio: <><Field label="Nama outlet" name="name" record={record} required/><ImageField label="Foto portfolio" record={record} required/><label className="cms-published"><input type="checkbox" name="permissionConfirmed" defaultChecked={Boolean(record.permissionConfirmed)}/><span>Izin penggunaan foto dan nama sudah didapat</span></label><TextArea label="Catatan izin (tanggal dan kanal persetujuan)" name="permissionNote" record={record} required={Boolean(record.permissionConfirmed)} rows={3}/><small className="cms-form-hint">Portfolio hanya muncul di situs publik setelah izin dicatat.</small><Field label="Urutan" name="sortOrder" record={record} type="number"/></>,
    promos: <><Field label="Judul promo" name="title" record={record} required/><Field label="URL sumber terverifikasi" name="sourceUrl" record={record} type="url" required/><Field label="Mulai" name="startsAt" record={record} type="date"/><Field label="Berakhir" name="endsAt" record={record} type="date"/><ImageField label="Gambar" record={record}/><TextArea label="Deskripsi" name="description" record={record}/><Field label="Urutan" name="sortOrder" record={record} type="number"/></>,
    faqs: <><TextArea label="Pertanyaan" name="question" record={record} required rows={2}/><TextArea label="Jawaban" name="answer" record={record} required/><Field label="Tautan terkait" name="href" record={record}/><Field label="Urutan" name="sortOrder" record={record} type="number"/></>,
    articles: <><input type="hidden" name="originalSlug" value={isNew?'':value(record,'slug')}/><Field label="Judul" name="title" record={record} required/><Field label="Slug URL unik" name="slug" record={record} required/><label className="cms-field"><span>Jenis konten</span><select name="type" defaultValue={value(record,'type','article')}><option value="article">Artikel</option><option value="activity">Kegiatan</option></select></label><TextArea label="Ringkasan" name="excerpt" record={record} rows={3}/><ImageField label="Foto cover" name="coverImage" record={{image:value(record,'coverImage')}}/><label className="cms-field cms-field-wide"><span>Teks alternatif cover</span><input name="coverAlt" defaultValue={value(record,'coverAlt')} maxLength={240} placeholder="Jelaskan isi foto untuk pembaca layar"/></label><label className="cms-field"><span>Tanggal kegiatan (opsional)</span><input name="eventDate" type="date" defaultValue={value(record,'eventDate')}/></label><Field label="Lokasi kegiatan (opsional)" name="eventLocation" record={record}/><Field label="URL YouTube (opsional)" name="youtubeUrl" record={record} type="url"/><ArticleMarkdownField record={record}/></>,
    seo: <><label className="cms-field"><span>Nama situs</span><input name="siteName" defaultValue={seoPreview.siteName} onChange={(event)=>updateSeo('siteName',event.target.value)} maxLength={100} required/></label><label className="cms-field cms-field-wide"><span>Judul default situs</span><input name="defaultTitle" defaultValue={seoPreview.defaultTitle} onChange={(event)=>updateSeo('defaultTitle',event.target.value)} maxLength={160} required/><small>Digunakan untuk halaman yang tidak memiliki judul khusus.</small></label><label className="cms-field cms-field-wide"><span>Deskripsi default</span><textarea name="description" defaultValue={seoPreview.description} onChange={(event)=>updateSeo('description',event.target.value)} rows={3} maxLength={320} required/><small>Maksimal 320 karakter. Deskripsi khusus halaman tetap dipakai.</small></label><ImageField label="Gambar sosial default" name="socialImage" record={{image:seoPreview.socialImage}} onValueChange={(next)=>updateSeo('socialImage',next)}/><label className="cms-field"><span>Alt gambar sosial</span><input name="socialImageAlt" defaultValue={seoPreview.socialImageAlt} onChange={(event)=>updateSeo('socialImageAlt',event.target.value)} maxLength={240} placeholder="Jelaskan gambar berbagi"/></label><section className="cms-seo-preview" aria-live="polite"><div><span>PRATINJAU HASIL BERBAGI</span><b>{seoPreview.defaultTitle || 'Judul default situs'}</b><small>{seoPreview.siteName} · halaman utama</small><p>{seoPreview.description || 'Deskripsi situs akan tampil di sini.'}</p></div>{seoPreview.socialImage?<img src={seoPreview.socialImage} alt={seoPreview.socialImageAlt || 'Pratinjau gambar sosial'}/>:<span className="cms-seo-preview-empty">Gambar sosial</span>}</section></>,
  };
  if (section === 'settings') {
    const locationText = Array.isArray(record.locations) ? record.locations.map((item)=>`${(item as {name:string}).name}|${(item as {address:string}).address}`).join('\n') : '';
    return <form action={action} className="cms-edit-form"><input type="hidden" name="section" value="settings"/><Field label="Telepon" name="phone" record={record} required/><Field label="Email" name="email" record={record} type="email" required/><Field label="WhatsApp (kode negara, angka saja)" name="whatsapp" record={record} required/><label className="cms-field cms-field-wide"><span>Jam layanan</span><input name="serviceHours" defaultValue={value(record,'serviceHours')} placeholder="Contoh: Senin–Minggu, 08.00–21.00 WIB" maxLength={200}/></label><Field label="URL sumber jam layanan" name="serviceHoursSource" record={record} type="url"/><Field label="Tanggal diverifikasi" name="serviceHoursVerifiedAt" record={record} type="date"/><label className="cms-field cms-field-wide"><span>Showroom (satu per baris: Nama|Alamat)</span><textarea name="locationsText" defaultValue={locationText} rows={5}/></label><button className="button" disabled={pending}>Simpan Kontak</button><FormMessage state={state}/></form>;
  }
  if (section === 'seo') return <form action={action} className="cms-edit-form"><input type="hidden" name="section" value="seo"/>{fields.seo}<button className="button" disabled={pending}>{pending?'Menyimpan…':'Simpan identitas & SEO'}</button><FormMessage state={state}/></form>;
  return <form action={action} className="cms-edit-form">
    <input type="hidden" name="section" value={section}/><input type="hidden" name="id" value={isNew?'':value(record,'id')}/>
    {fields[section]}
    <label className="cms-published"><input type="checkbox" name="published" defaultChecked={isNew || Boolean(record.published)}/><span>Terbit di situs publik</span></label>
    <button className="button" disabled={pending}>{pending?'Menyimpan…':section==='articles'?'Simpan artikel':isNew?'Tambah dan Terbitkan':'Simpan Perubahan'}</button><FormMessage state={state}/>
  </form>;
}

function FormMessage({ state }: { state: State }) {
  const [copied,setCopied]=useState(false);
  if(!state.message) return null;
  async function copyLink() {
    if(!state.inviteUrl) return;
    try { await navigator.clipboard.writeText(state.inviteUrl); setCopied(true); }
    catch { setCopied(false); }
  }
  return <div className={`cms-form-message ${state.ok?'success':'error'}`} aria-live="polite"><span>{state.message}</span>{state.inviteUrl&&<div className="cms-copy-link"><input readOnly value={state.inviteUrl} onFocus={(event)=>event.currentTarget.select()}/><button type="button" onClick={copyLink}>{copied?'Tersalin ✓':'Salin tautan'}</button></div>}</div>;
}

const titles: Record<string,string> = {products:'Produk',categories:'Kategori',packages:'Paket usaha',portfolio:'Portfolio',promos:'Promo',faqs:'FAQ',articles:'Artikel & kegiatan',settings:'Pengaturan situs'};
const sectionIcons: Record<string,AdminIconName> = {products:'products',categories:'categories',packages:'packages',portfolio:'portfolio',promos:'promos',faqs:'faq',articles:'portfolio',settings:'contact'};
function recordSubtitle(section:string,record:RecordData) {
  if(section==='products') return `${String(record.categorySlug??'Kategori belum dipilih')} · ${record.priceSource==='confirm'?'Harga konfirmasi':'Harga indikatif'}`;
  if(section==='categories') return String(record.slug??'');
  if(section==='packages') return `${String(record.label??'Paket laundry')} · ${value(record,'price') ? `Rp ${new Intl.NumberFormat('id-ID').format(Number(record.price))}` : 'Harga belum diatur'}`;
  if(section==='portfolio') return record.permissionConfirmed ? 'Izin tercatat · tayang mengikuti status publikasi' : 'Izin belum dicatat · tidak akan ditayangkan';
  if(section==='promos') return `${String(record.startsAt??'Tanggal mulai')} — ${String(record.endsAt??'Tanggal akhir')}`;
  if(section==='faqs') return String(record.answer??'').slice(0,100);
  if(section==='articles') return `${record.type==='activity'?'Kegiatan':'Artikel'} · ${record.slug ?? ''}`;
  return '';
}
export function ContentManager({ section, records, categories, seoRecord }: { section:string; records:RecordData[]; categories:{slug:string;title:string}[]; seoRecord?:RecordData }) {
  const title = titles[section] ?? 'Konten';
  const [search,setSearch]=useState('');
  const [visibility,setVisibility]=useState<'all'|'published'|'hidden'>('all');
  const searchTerm=search.trim().toLocaleLowerCase('id');
  const visibleRecords=records.filter((record)=>{
    const name=String(record.name ?? record.title ?? record.question ?? record.slug ?? '');
    const matchesText=`${name} ${recordSubtitle(section,record)}`.toLocaleLowerCase('id').includes(searchTerm);
    const matchesVisibility=visibility==='all'||(visibility==='published'?Boolean(record.published):!record.published);
    return matchesText&&matchesVisibility;
  });

  return <div className="cms-content-manager">
    <div className="cms-section-heading"><div><span className="cms-page-kicker">PENGELOLAAN KONTEN</span><h1>{title}</h1><p>Kelola apa yang tampil di situs My Equipment.</p></div><span className="cms-record-count"><b>{records.length}</b> item</span></div>
    {section==='settings' ? <div className="cms-settings-stack"><section className="cms-settings-card"><div className="cms-card-heading"><span className="cms-card-icon"><AdminIcon name="overview"/></span><div><h2>Identitas & SEO</h2><p>Atur judul bawaan, deskripsi, dan gambar saat situs dibagikan.</p></div></div><SaveForm section="seo" record={seoRecord ?? {}} categories={categories}/><small className="cms-form-hint">Judul dan deskripsi spesifik produk, artikel, dan halaman tetap mengikuti kontennya. Domain canonical tidak dapat diubah dari CMS.</small></section><section className="cms-settings-card"><div className="cms-card-heading"><span className="cms-card-icon"><AdminIcon name="contact"/></span><div><h2>Kontak publik</h2><p>Dipakai pada informasi kontak dan tombol konsultasi situs.</p></div></div><SaveForm section={section} record={records[0] ?? {locations:[]}} categories={categories}/></section></div> : <>
      <details className="cms-add-card"><summary><span className="cms-add-icon"><AdminIcon name="plus" size={18}/></span><span><b>Tambah {title.toLowerCase()}</b><small>Buat item baru untuk ditampilkan di situs.</small></span><span className="cms-add-toggle">Tambah baru <AdminIcon name="plus" size={15}/></span></summary><div className="cms-add-form"><SaveForm section={section} record={{sortOrder:records.length}} categories={categories} isNew/></div></details>
      <div className="cms-list-heading"><div><h2>Daftar {title.toLowerCase()}</h2><span>{visibleRecords.length} dari {records.length} item</span></div><div className="cms-list-controls"><label className="cms-search-field"><AdminIcon name="search" size={17}/><input aria-label={`Cari ${title.toLowerCase()}`} type="search" placeholder={`Cari ${title.toLowerCase()}…`} value={search} onChange={(event)=>setSearch(event.target.value)}/>{search&&<button type="button" aria-label="Hapus pencarian" onClick={()=>setSearch('')}><AdminIcon name="close" size={15}/></button>}</label><select aria-label="Filter status publikasi" value={visibility} onChange={(event)=>setVisibility(event.target.value as typeof visibility)}><option value="all">Semua status</option><option value="published">Tayang</option><option value="hidden">Disembunyikan</option></select></div></div>
      {visibleRecords.length ? <div className={`cms-record-list ${section==='products'?'cms-record-grid':''}`}>{visibleRecords.map((record,index)=>{const name=String(record.name ?? record.title ?? record.question ?? record.slug ?? 'Item');const thumbnail=record.image??record.coverImage;return <details className={`cms-record ${section==='products'?'cms-product-record':''}`} key={String(record.id ?? record.slug ?? record.name ?? index)}><summary className="cms-record-summary"><span className="cms-record-thumbnail">{thumbnail?<img src={String(thumbnail)} alt=""/>:<AdminIcon name={sectionIcons[section]??'products'} size={19}/>}</span><span className="cms-record-title"><b>{name}</b><small>{recordSubtitle(section,record)}</small>{section==='products'&&Number(record.price)>0&&<strong className="cms-record-price">Rp {new Intl.NumberFormat('id-ID').format(Number(record.price))}</strong>}</span><span className={`cms-status ${record.published?'is-published':'is-hidden'}`}><i/>{record.published?'Tayang':section==='articles'?'Draf':'Disembunyikan'}</span><span className="cms-edit-label">Edit <AdminIcon name="external" size={14}/></span></summary><div className="cms-record-body"><div className="cms-record-body-heading"><b>Edit detail</b><small>Perubahan tampil setelah disimpan.</small></div><SaveForm section={section} record={record} categories={categories}/></div></details>})}</div> : <div className="cms-empty-state"><span><AdminIcon name={sectionIcons[section]??'products'} size={23}/></span><b>{records.length?'Tidak ada item yang cocok':'Belum ada '+title.toLowerCase()}</b><p>{records.length?'Coba ubah kata kunci atau filter status.':'Tambahkan item pertama dengan tombol di atas.'}</p>{(search||visibility!=='all')&&<button type="button" onClick={()=>{setSearch('');setVisibility('all')}}>Atur ulang filter</button>}</div>}
    </>}
  </div>;
}

export function InviteForm() {
  const [state,action,pending] = useActionState<State,FormData>(createInviteState,initialState);
  return <form action={action} className="cms-invite-card"><div className="cms-card-heading"><span className="cms-card-icon"><AdminIcon name="plus"/></span><div><h2>Undang staf</h2><p>Buat akses baru untuk tim pengelola.</p></div></div><Field label="Nama lengkap" name="fullName" record={{}} required/><Field label="Email" name="email" record={{}} type="email" required/><label className="cms-field"><span>Peran akses</span><select name="role" defaultValue="editor"><option value="editor">Editor — mengelola konten</option><option value="admin">Admin — akses penuh</option></select></label><button className="button" disabled={pending}>{pending?'Menyiapkan tautan…':'Buat tautan undangan'}</button><small className="cms-form-hint">Tautan berlaku 24 jam dan harus dibagikan manual.</small><FormMessage state={state}/></form>;
}
export function UsersManager({ records }: { records:RecordData[] }) {
  return <div className="cms-users-layout"><InviteForm/><section className="cms-user-list"><div className="cms-card-heading"><span className="cms-card-icon"><AdminIcon name="users"/></span><div><h2>Akun CMS</h2><p>Atur akses tim yang memiliki akun CMS.</p></div></div>{records.map((user)=><article key={String(user.id)}><span className="cms-avatar cms-user-avatar">{String(user.fullName).split(/\s+/).slice(0,2).map((part)=>part[0]?.toUpperCase()).join('')}</span><div className="cms-user-details"><b>{String(user.fullName)}</b><small>{String(user.email)} · {user.role==='admin'?'Admin':'Editor'}</small><span className={`cms-status ${user.active?'is-published':'is-hidden'}`}><i/>{user.active?'Aktif':'Nonaktif'}</span></div><form action={toggleUserActive}><input type="hidden" name="id" value={String(user.id)}/><button className="cms-text-action">{user.active?'Nonaktifkan':'Aktifkan'}</button></form><ResetLink id={String(user.id)}/></article>)}</section></div>;
}
function ResetLink({ id }: { id:string }) {
  const [state,action,pending]=useActionState<State,FormData>(createResetState,initialState);
  return <form action={action}><input type="hidden" name="id" value={id}/><button className="button button-outline" disabled={pending}>Buat Reset</button><FormMessage state={state}/></form>;
}

export function AcceptAccessForm({ token }: { token:string }) {
  const [state,action,pending]=useActionState<State,FormData>(acceptAccessToken,initialState);
  return <form action={action} className="cms-edit-form cms-access-form"><input type="hidden" name="token" value={token}/><label className="cms-field"><span>Password baru (minimal 12 karakter)</span><input name="password" type="password" minLength={12} autoComplete="new-password" required/></label><button className="button" disabled={pending}>Simpan Password</button><FormMessage state={state}/></form>;
}
