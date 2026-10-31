import Button from '../components/ui/Button';
import { GithubIcon } from '../components/ui/Icons';
import { PROFIL } from '../data/profil';
import { KATEGORI_LIST } from '../data/proyek';
import styles from './HeroSection.module.css';

function HeroSection() {
  const bidang = KATEGORI_LIST.filter((k) => k !== 'All');

  return (
    <section id="home" className={styles.hero}>
      <div>
        <h1 className={styles.title}>Membangun web, IoT, dan sistem on-chain.</h1>
        <p className={styles.sub}>
          Halo, saya {PROFIL.nama}, mahasiswa Informatika {PROFIL.kampus}. Ini landing page
          praktikum Pemrograman Web saya: profil, jadwal praktikum, dan proyek pilihan.
        </p>

        <div className={styles.actions}>
          <Button href="#showcase-section" variant="primary">
            Lihat proyek
          </Button>
          <Button href={PROFIL.githubUrl}>
            <GithubIcon /> GitHub
          </Button>
        </div>

        <ul className={styles.bidang} aria-label="Bidang yang dikerjakan">
          {bidang.map((b) => (
            <li key={b} className={styles.chip}>{b}</li>
          ))}
        </ul>
      </div>

      <img src={PROFIL.fotoUrl} alt={PROFIL.nama} className={styles.photo} />
    </section>
  );
}

export default HeroSection;
