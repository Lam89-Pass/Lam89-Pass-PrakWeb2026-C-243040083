import styles from './SectionHeading.module.css';

function SectionHeading({ title, description, children }) {
  return (
    <div className={styles.wrap}>
      <div>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
      {children}
    </div>
  );
}

export default SectionHeading;
