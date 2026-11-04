import { useState } from 'react';
import DropdownJenis from './DropdownJenis';

function FormTransaksi({ onTambah }) {
    const [keterangan, setKeterangan] = useState('');
    const [nominal, setNominal] = useState('');   
    const [jenis, setJenis] = useState('pemasukan');

    const nominalAngka = Number(nominal);
    const keteranganTerlaluPanjang = keterangan.length > 50;
    const nominalTidakValid = nominal !== '' && (!Number.isFinite(nominalAngka) || nominalAngka <= 0);
    const tidakValid =
        keterangan.trim() === '' ||
        keteranganTerlaluPanjang ||
        nominal === '' ||
        nominalTidakValid;

    const tanganiKirim = (event) => {
        event.preventDefault();
        if (tidakValid) return;
        onTambah({
            keterangan: keterangan.trim(),
            nominal: nominalAngka,  
            jenis,
        });
        setKeterangan('');
        setNominal('');
        setJenis('pemasukan');
    };

    return (
        <form onSubmit={tanganiKirim} style={{ width: '100%' }}>
            <div className="keu-form">
                <input
                    className="input keu-input"
                    type="text"
                    placeholder="Keterangan, contoh: Uang saku"
                    value={keterangan}
                    onChange={(event) => setKeterangan(event.target.value)}
                />
                <div className="baris">
                    <input
                        className="input keu-input keu-nominal"
                        type="number"
                        min="1"
                        placeholder="Nominal (Rp)"
                        value={nominal}
                        onChange={(event) => setNominal(event.target.value)}
                    />
                    <DropdownJenis nilai={jenis} onUbah={setJenis} />
                </div>
                <button className="tombol" type="submit" disabled={tidakValid}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Tambah Transaksi
                </button>
            </div>
            {keteranganTerlaluPanjang && <p className="galat">Keterangan maksimal 50 karakter.</p>}
            {nominalTidakValid && <p className="galat">Nominal harus berupa angka lebih dari 0.</p>}
        </form>
    );
}
export default FormTransaksi;