import styles from './KartuProfil.module.css';

function KartuProfil({ nama, npm, kelas, status, prodi, fotoUrl }) {
  const aktif = status === 'Aktif';

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <img src={fotoUrl} alt={nama} className={styles.foto} />
        <div className={styles.info}>
          <h2 className={styles.nama}>{nama}</h2>
          <p className={styles.row}>NPM <strong>{npm}</strong></p>
          <p className={styles.row}>Kelas <strong>{kelas}</strong></p>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={`${styles.status} ${aktif ? styles.aktif : styles.nonaktif}`}>
          <span className={styles.dot} />
          Status akademik: {status}
        </span>
        <span className={styles.prodi}>{prodi}</span>
      </div>
    </article>
  );
}

export default KartuProfil;
