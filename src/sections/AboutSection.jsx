import ItemMatkul from '../components/courses/ItemMatkul';
import SectionHeading from '../components/layout/SectionHeading';
import KartuProfil from '../components/profile/KartuProfil';
import { PROFIL } from '../data/profil';
import { DAFTAR_PRAKTIKUM } from '../data/praktikum';
import styles from './AboutSection.module.css';

function AboutSection() {
  const totalSks = DAFTAR_PRAKTIKUM.reduce((total, m) => total + m.sks, 0);

  return (
    <section id="about-section" className="section">
      <SectionHeading
        title="Profil dan jadwal praktikum"
        description="Data praktikan dan mata kuliah praktikum semester ini."
      />

      <div className={styles.layout}>
        <KartuProfil {...PROFIL} />

        <div>
          <div className={styles.listHead}>
            <h3 className={styles.listTitle}>Praktikum semester ini</h3>
            <span className={styles.total}>Total {totalSks} SKS</span>
          </div>
          <ul className={styles.list}>
            {DAFTAR_PRAKTIKUM.map((matkul) => (
              <ItemMatkul key={matkul.id} {...matkul} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
