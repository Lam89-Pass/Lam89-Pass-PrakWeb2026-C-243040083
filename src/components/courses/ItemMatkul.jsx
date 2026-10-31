import { CalendarIcon } from '../ui/Icons';
import styles from './ItemMatkul.module.css';

function ItemMatkul({ kode, nama, sks, hari }) {
  return (
    <li className={styles.item}>
      <div>
        <div className={styles.head}>
          <span className={styles.kode}>{kode}</span>
          <span className={styles.nama}>{nama}</span>
        </div>
        <div className={styles.jadwal}>
          <CalendarIcon />
          <span>Jadwal sesi:</span>
          <strong>{hari}</strong>
        </div>
      </div>
      <span className={styles.sks}>{sks} SKS</span>
    </li>
  );
}

export default ItemMatkul;
