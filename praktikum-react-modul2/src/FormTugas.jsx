// src/FormTugas.jsx
import { useState } from 'react';

function FormTugas({ onTambah }) {
    const [teks, setTeks] = useState('');

    const terlaluPanjang = teks.length > 50;
    const tidakValid = teks.trim() === '' || terlaluPanjang;

    const tanganiKirim = (event) => {
        event.preventDefault();
        if (tidakValid) return;
        onTambah(teks.trim());
        setTeks('');
    };

    return (
        <form onSubmit={tanganiKirim} style={{ width: '100%' }}>
            <div className="baris">
                <div className="input-wrapper">
                    <div className="input-icon"></div>
                    <input
                        className="input"
                        type="text"
                        placeholder="Contoh: Kerjakan laporan ML"
                        value={teks}
                        onChange={(event) => setTeks(event.target.value)}
                    />
                </div>
                <button className="tombol" type="submit" disabled={tidakValid}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Tambah
                </button>
            </div>
            {terlaluPanjang && <p className="galat">Judul maksimal 50 karakter.</p>}
        </form>
    );
}
export default FormTugas;