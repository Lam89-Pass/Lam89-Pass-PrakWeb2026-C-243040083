// src/CatatanKeuangan.jsx
import { useState, useEffect } from 'react';
import Kartu from './Kartu';
import FormTransaksi from './FormTransaksi';
import ItemTransaksi from './ItemTransaksi';
import RingkasanSaldo from './RingkasanSaldo';

const KUNCI_STORAGE = 'catatan-keuangan';

function CatatanKeuangan() {
    const [daftarTransaksi, setDaftarTransaksi] = useState(() => {
        try {
            const dataTersimpan = localStorage.getItem(KUNCI_STORAGE);
            return dataTersimpan ? JSON.parse(dataTersimpan) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(KUNCI_STORAGE, JSON.stringify(daftarTransaksi));
    }, [daftarTransaksi]);

    const tambahTransaksi = ({ keterangan, nominal, jenis }) => {
        setDaftarTransaksi([
            { id: Date.now(), keterangan, nominal, jenis },
            ...daftarTransaksi, 
        ]);
    };

    const hapusTransaksi = (id) => {
        setDaftarTransaksi(daftarTransaksi.filter((transaksi) => transaksi.id !== id));
    };

    const totalPemasukan = daftarTransaksi
        .filter((transaksi) => transaksi.jenis === 'pemasukan')
        .reduce((total, transaksi) => total + Number(transaksi.nominal), 0);

    const totalPengeluaran = daftarTransaksi
        .filter((transaksi) => transaksi.jenis === 'pengeluaran')
        .reduce((total, transaksi) => total + Number(transaksi.nominal), 0);

    const saldo = totalPemasukan - totalPengeluaran;

    const iconDompet = (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
        </svg>
    );

    const iconTambah = (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
    );

    const iconRiwayat = (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="12 8 12 12 14 14" />
            <path d="M3.05 11a9 9 0 1 1 .5 4" />
            <polyline points="3 16 3 11 8 11" />
        </svg>
    );

    return (
        <>
            <div className="keu-pembatas">
                <div className="logo-icon">{iconDompet}</div>
                <h1 className="judul">Catatan Keuangan Mini</h1>
                <p className="subjudul">Tugas 3: Catat pemasukan dan pengeluaranmu</p>
            </div>

            <Kartu judul="Total Saldo" icon={iconDompet}>
                <RingkasanSaldo
                    totalPemasukan={totalPemasukan}
                    totalPengeluaran={totalPengeluaran}
                    saldo={saldo}
                />
            </Kartu>

            <Kartu judul="Tambah Transaksi" icon={iconTambah}>
                <FormTransaksi onTambah={tambahTransaksi} />
            </Kartu>

            <Kartu
                judul="Riwayat Transaksi"
                icon={iconRiwayat}
                ringkasan={`${daftarTransaksi.length} transaksi`}
            >
                {daftarTransaksi.length === 0 ? (
                    <p className="kosong">Belum ada transaksi. Tambahkan transaksi pertamamu di atas!</p>
                ) : (
                    <ul className="daftar">
                        {daftarTransaksi.map((transaksi) => (
                            <ItemTransaksi
                                key={transaksi.id}
                                transaksi={transaksi}
                                onHapus={hapusTransaksi}
                            />
                        ))}
                    </ul>
                )}
            </Kartu>
        </>
    );
}
export default CatatanKeuangan;