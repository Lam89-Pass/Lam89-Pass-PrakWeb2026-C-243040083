import { useState } from 'react';
import Button from '../components/ui/Button';
import { BoltIcon, GithubIcon } from '../components/ui/Icons';
import Modal from '../components/ui/Modal';
import { PROFIL } from '../data/profil';
import styles from './ContactSection.module.css';

function ContactSection() {
  const [popupBuka, setPopupBuka] = useState(false);
  const [jumlahKlik, setJumlahKlik] = useState(0);

  const handleUjiEvent = () => {
    setJumlahKlik((n) => n + 1);
    setPopupBuka(true);
  }; 

  return (
    <section id="contact-section" className="section">
      <div className={styles.box}>
        <h2 className={styles.title}>Mau lihat kode lengkapnya?</h2>
        <p className={styles.desc}>
          Semua proyek di atas ada di GitHub, lengkap dengan source code dan dokumentasinya.
        </p>
        <div className={styles.actions}>
          <Button href={PROFIL.githubUrl} variant="primary">
            <GithubIcon /> Buka GitHub
          </Button>
          <Button variant="soft" onClick={handleUjiEvent}>
            <BoltIcon /> Uji interaktivitas event
          </Button>
        </div>
      </div>

      <Modal
        open={popupBuka}
        onClose={() => setPopupBuka(false)}
        title="Event berhasil dijalankan"
        icon={<BoltIcon size={22} />}
      >
        Tombol berhasil memicu event onClick dan state React ter-update. Event ini sudah
        dijalankan <strong>{jumlahKlik}</strong> kali.
      </Modal>
    </section>
  );
}

export default ContactSection;