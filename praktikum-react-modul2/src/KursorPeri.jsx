import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './KursorPeri.css';

const PALET = [
    [244, 114, 182], // pink
    [167, 139, 250], // ungu
    [96, 165, 250],  // biru
    [251, 191, 36],  // emas
];

const BATAS_PARTIKEL = 350;
const SELEKTOR_KLIK = 'button:not(:disabled), a, select, [role="option"], input[type="checkbox"]';
const SELEKTOR_TEKS = 'input[type="text"], input[type="number"], input:not([type]), textarea';

const acak = (min, max) => min + Math.random() * (max - min);
const acakWarna = () => Math.floor(Math.random() * PALET.length);

function buatSpriteTitik([r, g, b]) {
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 64;
    const c = sprite.getContext('2d');
    const gradasi = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradasi.addColorStop(0, 'rgba(255,255,255,0.95)');
    gradasi.addColorStop(0.18, `rgba(${r},${g},${b},1)`);
    gradasi.addColorStop(0.45, `rgba(${r},${g},${b},0.35)`);
    gradasi.addColorStop(1, `rgba(${r},${g},${b},0)`);
    c.fillStyle = gradasi;
    c.fillRect(0, 0, 64, 64);
    return sprite;
}

function buatSpriteBintang([r, g, b]) {
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 64;
    const c = sprite.getContext('2d');

    const cahaya = c.createRadialGradient(32, 32, 0, 32, 32, 20);
    cahaya.addColorStop(0, `rgba(${r},${g},${b},0.55)`);
    cahaya.addColorStop(1, `rgba(${r},${g},${b},0)`);
    c.fillStyle = cahaya;
    c.fillRect(0, 0, 64, 64);

    c.beginPath();
    for (let i = 0; i < 8; i++) {
        const sudut = (i * Math.PI) / 4 - Math.PI / 2;
        const radius = i % 2 === 0 ? 30 : 6;
        const x = 32 + Math.cos(sudut) * radius;
        const y = 32 + Math.sin(sudut) * radius;
        if (i === 0) c.moveTo(x, y);
        else c.lineTo(x, y);
    }
    c.closePath();
    c.fillStyle = `rgb(${r},${g},${b})`;
    c.fill();

    c.beginPath();
    c.arc(32, 32, 3, 0, Math.PI * 2);
    c.fillStyle = 'rgba(255,255,255,0.95)';
    c.fill();
    return sprite;
}

function KursorPeri() {
    const rootRef = useRef(null);
    const kanvasRef = useRef(null);
    const cincinRef = useRef(null);
    const titikRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        const kanvas = kanvasRef.current;
        const ctx = kanvas.getContext('2d');
        const cincin = cincinRef.current;
        const titik = titikRef.current;

        const pointerHalus = window.matchMedia('(pointer: fine)').matches;
        const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (pointerHalus) document.documentElement.classList.add('kursor-peri');

        const spriteTitik = PALET.map(buatSpriteTitik);
        const spriteBintang = PALET.map(buatSpriteBintang);

        let lebar = 0;
        let tinggi = 0;
        const ubahUkuran = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            lebar = window.innerWidth;
            tinggi = window.innerHeight;
            kanvas.width = lebar * dpr;
            kanvas.height = tinggi * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        ubahUkuran();

        const partikel = [];
        const gelombang = [];

        let mx = -100, my = -100;   
        let cx = -100, cy = -100;  
        let sudahBergerak = false;
        let terakhirX = null, terakhirY = null;
        let sisaJarak = 0;

        const tambahPartikel = (p) => {
            if (partikel.length >= BATAS_PARTIKEL) partikel.shift();
            partikel.push(p);
        };

        const debu = (x, y) => {
            tambahPartikel({
                x: x + acak(-6, 6),
                y: y + acak(-6, 6),
                vx: acak(-18, 18),
                vy: acak(-30, 8),
                gravitasi: 45,
                gesek: 0.8,
                ukuran: acak(0.9, 2.6),
                bintang: Math.random() < 0.35,
                warna: acakWarna(),
                hidup: acak(0.7, 1.4),
                umur: 0,
                rot: acak(0, Math.PI),
                putar: acak(-2, 2),
                kedip: acak(10, 18),
                fase: acak(0, Math.PI * 2),
                goyang: acak(8, 18),
            });
        };

        const percikan = (x, y) => {
            const jumlah = 24;
            for (let i = 0; i < jumlah; i++) {
                const sudut = (i / jumlah) * Math.PI * 2 + acak(-0.2, 0.2);
                const kecepatan = acak(90, 280);
                tambahPartikel({
                    x,
                    y,
                    vx: Math.cos(sudut) * kecepatan,
                    vy: Math.sin(sudut) * kecepatan - 30,
                    gravitasi: 260,
                    gesek: 3.2,
                    ukuran: acak(1.3, 3.2),
                    bintang: Math.random() < 0.5,
                    warna: acakWarna(),
                    hidup: acak(0.5, 1.0),
                    umur: 0,
                    rot: acak(0, Math.PI),
                    putar: acak(-6, 6),
                    kedip: acak(14, 26),
                    fase: acak(0, Math.PI * 2),
                    goyang: 0,
                });
            }
            tambahPartikel({
                x, y, vx: 0, vy: 0, gravitasi: 0, gesek: 0,
                ukuran: 5, bintang: true, warna: 4, hidup: 0.4, umur: 0,
                rot: 0, putar: 1.5, kedip: 0, fase: Math.PI / 2, goyang: 0,
            });
            gelombang.push({ x, y, umur: 0, hidup: 0.45, warna: acakWarna() });
        };

        const saatBergerak = (event) => {
            mx = event.clientX;
            my = event.clientY;
            if (event.pointerType === 'touch') return;

            if (!sudahBergerak) {
                sudahBergerak = true;
                cx = mx;
                cy = my;
            }
            root.classList.add('aktif');

            const target = event.target instanceof Element ? event.target : null;
            root.classList.toggle('hover', !!target && !!target.closest(SELEKTOR_KLIK));
            root.classList.toggle('teks', !!target && !!target.closest(SELEKTOR_TEKS));

            if (kurangiGerak) return;

            if (terakhirX === null) {
                terakhirX = mx;
                terakhirY = my;
            }
            const dx = mx - terakhirX;
            const dy = my - terakhirY;
            sisaJarak += Math.hypot(dx, dy);
            const ESPASI = 9;
            const banyak = Math.min(6, Math.floor(sisaJarak / ESPASI));
            for (let k = 1; k <= banyak; k++) {
                debu(terakhirX + (dx * k) / banyak, terakhirY + (dy * k) / banyak);
            }
            sisaJarak %= ESPASI;
            terakhirX = mx;
            terakhirY = my;
        };

        const saatTekan = (event) => {
            if (event.pointerType === 'mouse' && event.button !== 0) return;
            if (event.pointerType !== 'touch') root.classList.add('tekan');
            if (!kurangiGerak) percikan(event.clientX, event.clientY);
        };
        const saatLepas = () => root.classList.remove('tekan');

        const saatKeluar = () => {
            root.classList.remove('aktif');
            terakhirX = null;
            sisaJarak = 0;
        };

        let waktuTerakhir = performance.now();
        let idAnimasi = 0;

        const gambar = (sekarang) => {
            const dt = Math.min((sekarang - waktuTerakhir) / 1000, 0.05);
            waktuTerakhir = sekarang;

            const pengikut = kurangiGerak ? 1 : 1 - Math.exp(-dt * 14);
            cx += (mx - cx) * pengikut;
            cy += (my - cy) * pengikut;
            titik.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
            cincin.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;

            ctx.clearRect(0, 0, lebar, tinggi);

            for (let i = gelombang.length - 1; i >= 0; i--) {
                const g = gelombang[i];
                g.umur += dt;
                const t = g.umur / g.hidup;
                if (t >= 1) {
                    gelombang.splice(i, 1);
                    continue;
                }
                const [r, gr, b] = PALET[g.warna];
                ctx.beginPath();
                ctx.arc(g.x, g.y, 6 + t * 34, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${r},${gr},${b},${(1 - t) * 0.8})`;
                ctx.lineWidth = 2 * (1 - t) + 0.5;
                ctx.stroke();
            }

            for (let i = partikel.length - 1; i >= 0; i--) {
                const p = partikel[i];
                p.umur += dt;
                if (p.umur >= p.hidup) {
                    partikel.splice(i, 1);
                    continue;
                }

                const redam = Math.exp(-p.gesek * dt);
                p.vx *= redam;
                p.vy = p.vy * redam + p.gravitasi * dt;
                p.x += (p.vx + Math.sin(p.umur * 4 + p.fase) * p.goyang) * dt;
                p.y += p.vy * dt;
                p.rot += p.putar * dt;

                const t = p.umur / p.hidup;
                const kedip = 0.65 + 0.35 * Math.sin(p.umur * p.kedip + p.fase);
                ctx.globalAlpha = Math.max(0, (1 - t) * kedip);

                if (p.bintang) {
                    const s = p.ukuran * 3.2 * (1 - t * 0.4);
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot);
                    // ctx.drawImage(spriteBintang[p.warna], -s, -s, s * 2, s * 2);
                    ctx.restore();
                } else {
                    const s = p.ukuran * 5 * (1 - t * 0.4);
                    ctx.drawImage(spriteTitik[p.warna], p.x - s, p.y - s, s * 2, s * 2);
                }
            }
            ctx.globalAlpha = 1;

            idAnimasi = requestAnimationFrame(gambar);
        };
        idAnimasi = requestAnimationFrame(gambar);

        window.addEventListener('pointermove', saatBergerak);
        window.addEventListener('pointerdown', saatTekan);
        window.addEventListener('pointerup', saatLepas);
        window.addEventListener('pointercancel', saatLepas);
        window.addEventListener('resize', ubahUkuran);
        document.documentElement.addEventListener('mouseleave', saatKeluar);

        return () => {
            cancelAnimationFrame(idAnimasi);
            window.removeEventListener('pointermove', saatBergerak);
            window.removeEventListener('pointerdown', saatTekan);
            window.removeEventListener('pointerup', saatLepas);
            window.removeEventListener('pointercancel', saatLepas);
            window.removeEventListener('resize', ubahUkuran);
            document.documentElement.removeEventListener('mouseleave', saatKeluar);
            document.documentElement.classList.remove('kursor-peri');
        };
    }, []);

    return createPortal(
        <div className="kp-root" ref={rootRef} aria-hidden="true">
            <canvas className="kp-kanvas" ref={kanvasRef} />
            <div className="kp-cincin" ref={cincinRef}>
                <div className="kp-cincin-isi" />
            </div>
            <div className="kp-titik" ref={titikRef}>
                <div className="kp-titik-isi" />
            </div>
        </div>,
        document.body
    );
}
export default KursorPeri;