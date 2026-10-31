import { useState } from 'react';
import Button from '../ui/Button';
import { GithubIcon } from '../ui/Icons';
import styles from './KartuProyek.module.css';

function KartuProyek({ judul, deskripsi, teknologi = [], repoUrl, demoUrl, gambar, kategori }) {
  const [gambarRusak, setGambarRusak] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        {!gambarRusak && (
          <img
            src={gambar}
            alt={`Tampilan proyek ${judul}`}
            loading="lazy"
            onError={() => setGambarRusak(true)}
          />
        )}
        <div className={styles.shade} />
        {kategori && <span className={styles.badge}>{kategori}</span>}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{judul}</h3>
        <p className={styles.desc}>{deskripsi}</p>

        <ul className={styles.tags}>
          {teknologi.map((tag) => (
            <li key={tag} className={styles.tag}>{tag}</li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Button href={repoUrl} size="sm">
            <GithubIcon /> Source code
          </Button>
          {demoUrl && (
            <Button href={demoUrl} variant="soft" size="sm">
              Demo
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export default KartuProyek;
