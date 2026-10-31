import { PROFIL } from '../../data/profil';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.title}>Praktikum Pemrograman Web 2026, {PROFIL.kampus}</p>
      <p className={styles.meta}>
        <span>Praktikan <strong>{PROFIL.nama}</strong></span>
        <span>NPM <strong>{PROFIL.npm}</strong></span>
        <span>Kelas <strong>{PROFIL.kelas}</strong></span>
      </p>
    </footer>
  );
}

export default Footer;
