// src/DropdownJenis.jsx
import { useState, useEffect, useRef } from 'react';

const PILIHAN = [
    { nilai: 'pemasukan', label: 'Pemasukan', warna: 'hijau' },
    { nilai: 'pengeluaran', label: 'Pengeluaran', warna: 'merah' },
];

function DropdownJenis({ nilai, onUbah }) {
    const [terbuka, setTerbuka] = useState(false);
    const wadahRef = useRef(null);

    useEffect(() => {
        if (!terbuka) return;

        const tutupJikaKlikLuar = (event) => {
            if (wadahRef.current && !wadahRef.current.contains(event.target)) {
                setTerbuka(false);
            }
        };
        const tutupJikaEsc = (event) => {
            if (event.key === 'Escape') setTerbuka(false);
        };

        document.addEventListener('mousedown', tutupJikaKlikLuar);
        document.addEventListener('keydown', tutupJikaEsc);
        return () => {
            document.removeEventListener('mousedown', tutupJikaKlikLuar);
            document.removeEventListener('keydown', tutupJikaEsc);
        };
    }, [terbuka]);

    const terpilih = PILIHAN.find((pilihan) => pilihan.nilai === nilai);

    const pilih = (nilaiBaru) => {
        onUbah(nilaiBaru);
        setTerbuka(false);
    };

    return (
        <div className={`keu-dropdown ${terbuka ? 'terbuka' : ''}`} ref={wadahRef}>
            <button
                type="button"
                className="keu-dropdown-tombol"
                aria-haspopup="listbox"
                aria-expanded={terbuka}
                onClick={() => setTerbuka(!terbuka)}
            >
                <span className={`keu-titik keu-titik-${terpilih.warna}`}></span>
                <span className="keu-dropdown-label">{terpilih.label}</span>
                <svg className="keu-panah" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {terbuka && (
                <ul className="keu-dropdown-menu" role="listbox">
                    {PILIHAN.map((pilihan) => (
                        <li
                            key={pilihan.nilai}
                            role="option"
                            tabIndex={0}
                            aria-selected={pilihan.nilai === nilai}
                            className={`keu-dropdown-opsi ${pilihan.nilai === nilai ? 'aktif' : ''}`}
                            onClick={() => pilih(pilihan.nilai)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    pilih(pilihan.nilai);
                                }
                            }}
                        >
                            <span className={`keu-titik keu-titik-${pilihan.warna}`}></span>
                            <span>{pilihan.label}</span>
                            {pilihan.nilai === nilai && (
                                <svg className="keu-centang" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default DropdownJenis;