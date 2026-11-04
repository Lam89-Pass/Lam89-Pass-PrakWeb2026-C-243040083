// src/RingkasanSaldo.jsx
import { formatRupiah } from './formatRupiah';

function RingkasanSaldo({ totalPemasukan, totalPengeluaran, saldo }) {
    return (
        <div className="keu-ringkasan">
            <div className="keu-saldo">
                <span className="keu-label">Total Saldo</span>
                <strong className={saldo < 0 ? 'keu-merah' : 'keu-hijau'}>
                    {formatRupiah(saldo)}
                </strong>
            </div>
            <div className="keu-ringkasan-kecil">
                <div>
                    <span className="keu-label">Pemasukan</span>
                    <strong className="keu-hijau">{formatRupiah(totalPemasukan)}</strong>
                </div>
                <div>
                    <span className="keu-label">Pengeluaran</span>
                    <strong className="keu-merah">{formatRupiah(totalPengeluaran)}</strong>
                </div>
            </div>
        </div>
    );
}
export default RingkasanSaldo;