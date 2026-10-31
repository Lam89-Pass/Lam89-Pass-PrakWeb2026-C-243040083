import { SearchIcon } from '../ui/Icons';
import styles from './FilterBar.module.css';

function FilterBar({ kategoriList, filterKategori, onFilterChange, kataKunci, onKataKunciChange }) {
  return (
    <div className={styles.bar}>
      <div className={styles.cats} role="group" aria-label="Filter kategori">
        {kategoriList.map((kat) => (
          <button
            key={kat}
            type="button"
            onClick={() => onFilterChange(kat)}
            aria-pressed={filterKategori === kat}
            className={styles.cat}
          >
            {kat}
          </button>
        ))}
      </div>

      <label className={styles.search}>
        <SearchIcon />
        <input
          type="search"
          placeholder="Cari proyek atau teknologi..."
          aria-label="Cari proyek atau teknologi"
          value={kataKunci}
          onChange={(e) => onKataKunciChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export default FilterBar;
