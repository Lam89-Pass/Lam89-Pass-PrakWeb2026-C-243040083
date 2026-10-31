import { useMemo, useState } from 'react';

/** Logika filter kategori + pencarian proyek. UI-nya ada di FilterBar. */
export default function useFilterProyek(daftarProyek) {
  const [filterKategori, setFilterKategori] = useState('All');
  const [kataKunci, setKataKunci] = useState('');

  const proyekTersaring = useMemo(() => {
    const q = kataKunci.trim().toLowerCase();
    return daftarProyek.filter((p) => {
      const cocokKategori = filterKategori === 'All' || p.kategori === filterKategori;
      const cocokKataKunci =
        !q ||
        p.judul.toLowerCase().includes(q) ||
        p.deskripsi.toLowerCase().includes(q) ||
        p.teknologi.some((t) => t.toLowerCase().includes(q));
      return cocokKategori && cocokKataKunci;
    });
  }, [daftarProyek, filterKategori, kataKunci]);

  const reset = () => {
    setFilterKategori('All');
    setKataKunci('');
  };

  return { proyekTersaring, filterKategori, setFilterKategori, kataKunci, setKataKunci, reset };
}
