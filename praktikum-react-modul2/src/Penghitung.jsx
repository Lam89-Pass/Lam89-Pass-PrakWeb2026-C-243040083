// src/Penghitung.jsx
import { useState } from 'react';
import Kartu from './Kartu';

function Penghitung() {
    const [jumlah, setJumlah] = useState(0);

    const iconPlay = (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
        </svg>
    );

    return (
        <Kartu judul="Penghitung Klik" icon={iconPlay}>
            <p className="penghitung-teks">
                Tombol sudah diklik <strong>{jumlah}</strong> kali
            </p>
            <div className="baris-tengah">
                <button className="tombol" onClick={() => setJumlah(jumlah + 1)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                        <path d="M13 13l6 6" />
                    </svg>
                    Klik Saya
                </button>
                <button className="tombol tombol-sekunder" onClick={() => setJumlah(0)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                    Ulangi
                </button>
            </div>
        </Kartu>
    );
}
export default Penghitung;