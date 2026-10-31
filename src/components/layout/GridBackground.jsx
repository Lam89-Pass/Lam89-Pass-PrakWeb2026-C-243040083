import useSpotlight from '../../hooks/useSpotlight';
import styles from './GridBackground.module.css';

function GridBackground() {
  const ref = useSpotlight();

  return (
    <div ref={ref} className={styles.root} aria-hidden="true">
      <div className={styles.lines} />
      <div className={styles.glowLines} />
      <div className={styles.vignette} />
    </div>
  );
}

export default GridBackground;
