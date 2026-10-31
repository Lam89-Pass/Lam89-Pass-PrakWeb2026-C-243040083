import { PROFIL } from '../../data/profil';
import useScrollSpy from '../../hooks/useScrollSpy';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about-section', label: 'About' },
  { id: 'showcase-section', label: 'Projects' },
  { id: 'contact-section', label: 'Contact' },
];
const NAV_IDS = NAV_ITEMS.map((item) => item.id);

function Navbar() {
  const activeId = useScrollSpy(NAV_IDS);

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a href={PROFIL.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.brand}>
          <img src={PROFIL.fotoUrl} alt="" className={styles.avatar} />
          <span className={styles.brandName}>{PROFIL.nama}</span>
        </a>

        <nav aria-label="Navigasi utama" className={styles.links}>
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={styles.link}
              aria-current={activeId === id ? 'true' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
