import { useState } from 'react';
import { DAFTAR_PROYEK, KATEGORI_LIST } from '../../data/proyek';
import useFilterProyek from '../../hooks/useFilterProyek';
import SectionHeading from '../layout/SectionHeading';
import Button from '../ui/Button';
import FilterBar from './FilterBar';
import KartuProyek from './KartuProyek';
import styles from './ShowcasePortofolio.module.css';

const ID_UNGGULAN = [5, 6, 7, 10];
const PROYEK_UNGGULAN = DAFTAR_PROYEK.filter((p) => ID_UNGGULAN.includes(p.id));

function ShowcasePortofolio() {
  const [semua, setSemua] = useState(false);
  const { proyekTersaring, filterKategori, setFilterKategori, kataKunci, setKataKunci, reset } =
    useFilterProyek(DAFTAR_PROYEK);

  const daftarTampil = semua ? proyekTersaring : PROYEK_UNGGULAN;

  const toggleSemua = () => {
    if (semua) reset();
    setSemua(!semua);
  };

  return (
    <section id="showcase-section" className="section">
      <SectionHeading
        title="Proyek pilihan"
        description="Dari aplikasi web, IoT, cyber security, sampai smart contract on-chain."
      >
        <Button size="sm" onClick={toggleSemua}>
          {semua ? 'Tampilkan proyek pilihan saja' : `Lihat semua ${DAFTAR_PROYEK.length} proyek`}
        </Button>
      </SectionHeading>

      {semua && (
        <FilterBar
          kategoriList={KATEGORI_LIST}
          filterKategori={filterKategori}
          onFilterChange={setFilterKategori}
          kataKunci={kataKunci}
          onKataKunciChange={setKataKunci}
        />
      )}

      {daftarTampil.length > 0 ? (
        <div className={semua ? styles.gridAll : styles.gridFeatured}>
          {daftarTampil.map((proyek) => (
            <KartuProyek key={proyek.id} {...proyek} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>Tidak ada proyek yang cocok dengan filter atau kata kunci ini.</p>
          <Button variant="soft" size="sm" onClick={reset}>
            Reset filter
          </Button>
        </div>
      )}
    </section>
  );
}

export default ShowcasePortofolio;
