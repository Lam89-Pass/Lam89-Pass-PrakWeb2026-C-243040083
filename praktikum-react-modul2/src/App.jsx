// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import Kartu from './Kartu';
import Penghitung from './Penghitung';
import FormTugas from './FormTugas';
import ItemTugas from './ItemTugas';

function App() {
  const [daftarTugas, setDaftarTugas] = useState(() => {
    const dataTersimpan = localStorage.getItem('daftar-tugas');
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan);
    }
    return [
      { id: 1, judul: 'ANAJAY', selesai: false },
    ];
  });

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

  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length;

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

        <div className="header-app">
          <div className="logo-icon">{iconTopiWisuda}</div>
          <h1 className="judul">Daftar Tugas Praktikum</h1>
          <p className="subjudul">Laboratorium Informatika Modul 2: React Lanjutan</p>
        </div>

        <Penghitung />

        <Kartu judul="Tambah Tugas Baru" icon={iconKalender}>
          <FormTugas onTambah={tambahTugas} />
        </Kartu>

        <Kartu judul="Daftar Tugas" icon={iconList}>
          <p className="ringkasan">
            {jumlahSelesai} dari {daftarTugas.length} tugas selesai
          </p>

          {daftarTugas.length === 0 ? (
            <p className="kosong">Belum ada tugas.</p>
          ) : (
            <ul className="daftar">
              {daftarTugas.map((tugas) => (
                <ItemTugas key={tugas.id} tugas={tugas} onUbahStatus={ubahStatus} onHapus={hapusTugas} />
              ))}
            </ul>
          )}
        </Kartu>

      </div>
    </div>
  );
}
export default App;