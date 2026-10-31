const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
const gh = (repo) => `https://github.com/Lam89-Pass/${repo}`;

export const DAFTAR_PROYEK = [
  {
    id: 1,
    judul: 'PPSK Cidaun — Kesatria Cidaun Portal',
    deskripsi:
      "Official portal for Perguruan Pencak Silat Kesatria Cidaun. Showcases the school's heritage, martial arts philosophy, online registration, and championship achievements.",
    kategori: 'Web App',
    teknologi: ['JavaScript', 'HTML5', 'CSS3'],
    repoUrl: gh('ppskc'),
    demoUrl: null,
    gambar: unsplash('1555597673-b21d5c935865'),
  },
  {
    id: 2,
    judul: 'CekKesehatanAPP — Laptop Health Diagnostic',
    deskripsi:
      'System utility for monitoring laptop hardware health — CPU/RAM usage, battery cycle count & capacity, processor temperature, and storage drive performance diagnostics.',
    kategori: 'Utility',
    teknologi: ['Python', 'PowerShell', 'Shell'],
    repoUrl: gh('CekKesehatanAPP'),
    demoUrl: null,
    gambar: unsplash('1588872657578-7efd1f1555ed'),
  },
  {
    id: 3,
    judul: 'DNY Filter Indo — Industrial Company Profile',
    deskripsi:
      'Corporate website for an Industrial filtration manufacturer. Features product catalog browsing, specification lookup, and price quotation request with responsive layout.',
    kategori: 'Web App',
    teknologi: ['JavaScript', 'CSS3', 'HTML5'],
    repoUrl: gh('dnyfilterindo'),
    demoUrl: null,
    gambar: unsplash('1581091226825-a6a2a5aee158'),
  },
  {
    id: 4,
    judul: 'Koperasi Sekolah — Management System',
    deskripsi:
      'Desktop management system for school cooperative bookkeeping — daily cashier transactions, inventory tracking, and member savings & loans built with Java and MySQL.',
    kategori: 'Desktop',
    teknologi: ['Java', 'PowerShell', 'MySQL'],
    repoUrl: gh('koperasi-sekolah'),
    demoUrl: null,
    gambar: unsplash('1554224155-8d04cb21cd6c'),
  },
  {
    id: 5,
    judul: 'MonadLand — Verifikasi Sertifikat Tanah On-Chain',
    deskripsi:
      'Decentralized land certificate verification built on Monad L1 blockchain. Smart contracts handle ownership proofs, preventing duplicate certificates through on-chain metadata & IPFS hashing.',
    kategori: 'Web3',
    teknologi: ['Solidity', 'TypeScript', 'React'],
    repoUrl: gh('monad-land-certificate-verifier'),
    demoUrl: null,
    gambar: unsplash('1639762681485-074b7f938ba0'),
  },
  {
    id: 6,
    judul: 'CyberSentinel — Vulnerability Scanner & Audit',
    deskripsi:
      'Automated web security scanner targeting OWASP Top 10 vulnerabilities — SQL injection, XSS, CORS misconfiguration, header analysis, and penetration testing toolkit.',
    kategori: 'Cyber Security',
    teknologi: ['Python', 'Shell', 'Security Audit'],
    repoUrl: gh('cybersentinel-security-audit'),
    demoUrl: null,
    gambar: unsplash('1550751827-4bd374c3f58b'),
  },
  {
    id: 7,
    judul: 'Smart Hydroponics — IoT Monitoring System',
    deskripsi:
      'ESP32-based hydroponic automation. Monitors nutrient PPM, pH levels, and reservoir temperature in real-time. Automates nutrient pump cycles via MQTT-connected web dashboard.',
    kategori: 'IoT',
    teknologi: ['C++', 'ESP32', 'MQTT'],
    repoUrl: gh('smart-hydroponics-iot'),
    demoUrl: null,
    gambar: unsplash('1558449028-b53a39d100fc'),
  },
  {
    id: 8,
    judul: 'Mountain Signal Detector — LoRa Off-Grid',
    deskripsi:
      'Emergency signal detection device for mountaineers in areas with zero cellular coverage. Uses LoRa mesh radio and GPS module for SAR team coordination without internet.',
    kategori: 'IoT',
    teknologi: ['C++', 'LoRa', 'Hardware'],
    repoUrl: gh('mountain-signal-detector-lora'),
    demoUrl: null,
    gambar: unsplash('1464822759023-fed622ff2c3b'),
  },
  {
    id: 9,
    judul: 'RuangCode ID — Web Development Agency',
    deskripsi:
      'Digital agency platform co-founded with 3 partners. Providing custom website development, landing pages, and business information systems for SMEs and enterprises.',
    kategori: 'Web App',
    teknologi: ['TypeScript', 'Next.js', 'CSS'],
    repoUrl: gh('ruangcodeid'),
    demoUrl: null,
    gambar: unsplash('1522071820081-009f0129c71c'),
  },
  {
    id: 10,
    judul: 'Ruang Donasi — Social Crowdfunding',
    deskripsi:
      'Transparent social crowdfunding platform with donor tracking, campaign verification, and fund distribution monitoring. Award-winning project — 3rd place in tech competition.',
    kategori: 'Web App',
    teknologi: ['JavaScript', 'Node.js', 'CSS'],
    repoUrl: gh('donasi'),
    demoUrl: null,
    gambar: unsplash('1593113598332-cd288d649433'),
  },
];

export const KATEGORI_LIST = ['All', ...new Set(DAFTAR_PROYEK.map((p) => p.kategori))];
