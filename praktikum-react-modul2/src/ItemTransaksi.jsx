import { formatRupiah } from './formatRupiah';

function ItemTransaksi({ transaksi, onHapus }) {
    const adalahPemasukan = transaksi.jenis === 'pemasukan';

    return (
        <li className="item keu-item">
            <div className="keu-info">
                <span>{transaksi.keterangan}</span>
                <small>{adalahPemasukan ? 'Pemasukan' : 'Pengeluaran'}</small>
            </div>
            <strong className={adalahPemasukan ? 'keu-hijau' : 'keu-merah'}>
                {adalahPemasukan ? '+' : '-'} {formatRupiah(transaksi.nominal)}
            </strong>
            <button
                className="tombol tombol-merah"
                onClick={() => onHapus(transaksi.id)}
                aria-label={`Hapus transaksi ${transaksi.keterangan}`}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Hapus
            </button>
        </li>
    );
}
export default ItemTransaksi;