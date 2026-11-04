// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import Kartu from './Kartu';
import Penghitung from './Penghitung';
import FormTugas from './FormTugas';
import ItemTugas from './ItemTugas';
import CatatanKeuangan from './CatatanKeuangan';
import KursorPeri from './KursorPeri';

function App() {
  const [daftarTugas, setDaftarTugas] = useState(() => {
    const dataTersimpan = localStorage.getItem('daftar-tugas');
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan);
    }
    return [
      { id: 1, judul: 'Install Node.js dan Vite', selesai: true },
      { id: 2, judul: 'Pelajari useState', selesai: false },
    ];
  });

  const [filter, setFilter] = useState('semua');

  useEffect(() => {
    const sisa = daftarTugas.filter((tugas) => !tugas.selesai).length;
    document.title = `(${sisa}) Tugas Belum Selesai`;
    localStorage.setItem('daftar-tugas', JSON.stringify(daftarTugas));
  }, [daftarTugas]);

  const tambahTugas = (judul) => {
    setDaftarTugas([...daftarTugas, { id: Date.now(), judul, selesai: false }]);
  };

  const ubahStatus = (id) => {
    setDaftarTugas(daftarTugas.map((tugas) =>
      tugas.id === id ? { ...tugas, selesai: !tugas.selesai } : tugas
    ));
  };

  const hapusTugas = (id) => {
    setDaftarTugas(daftarTugas.filter((tugas) => tugas.id !== id));
  };

  const hapusSemuaSelesai = () => {
    setDaftarTugas(daftarTugas.filter((tugas) => !tugas.selesai));
  };

  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length;

  const tugasDifilter = daftarTugas.filter((tugas) => {
    if (filter === 'selesai') return tugas.selesai;
    if (filter === 'belum_selesai') return !tugas.selesai;
    return true;
  });

  const iconTopiWisuda = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );

  const iconKalender = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const iconList = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );

  return (
    <div className="wadah">
      <div className="wadah-content">

        <KursorPeri />

        <div className="header-app">
          <div className="logo-icon">{iconTopiWisuda}</div>
          <h1 className="judul">Daftar Tugas Praktikum</h1>
          <p className="subjudul">Laboratorium Informatika Modul 2: React Lanjutan</p>
        </div>

        <Penghitung />

        <Kartu judul="Tambah Tugas Baru" icon={iconKalender}>
          <FormTugas onTambah={tambahTugas} />
        </Kartu>

        <Kartu
          judul="Daftar Tugas"
          icon={iconList}
          ringkasan={`${jumlahSelesai} dari ${daftarTugas.length} tugas selesai`}
        >
          <div className="filter-container">
            <button
              className={`tombol-filter ${filter === 'semua' ? 'aktif' : ''}`}
              onClick={() => setFilter('semua')}
            >Semua</button>
            <button
              className={`tombol-filter ${filter === 'belum_selesai' ? 'aktif' : ''}`}
              onClick={() => setFilter('belum_selesai')}
            >Belum Selesai</button>
            <button
              className={`tombol-filter ${filter === 'selesai' ? 'aktif' : ''}`}
              onClick={() => setFilter('selesai')}
            >Selesai</button>
          </div>

          {tugasDifilter.length === 0 ? (
            <p className="kosong">Belum ada tugas di kategori ini.</p>
          ) : (
            <ul className="daftar">
              {tugasDifilter.map((tugas) => (
                <ItemTugas key={tugas.id} tugas={tugas} onUbahStatus={ubahStatus} onHapus={hapusTugas} />
              ))}
            </ul>
          )}

          {jumlahSelesai > 0 && (
            <div className="aksi-bawah">
              <button className="tombol tombol-merah" onClick={hapusSemuaSelesai}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Hapus Semua yang Selesai
              </button>
            </div>
          )}
        </Kartu>

        <CatatanKeuangan />

      </div>
    </div>
  );
}
export default App;