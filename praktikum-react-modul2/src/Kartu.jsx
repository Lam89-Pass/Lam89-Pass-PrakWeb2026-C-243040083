// src/Kartu.jsx
function Kartu({ judul, icon, ringkasan, children }) {
  return (
    <section className="kartu">
      <div className="kartu-header">
        <div className="header-kiri">
          <div className="kartu-icon">{icon}</div>
          <h2>{judul}</h2>
        </div>
        {ringkasan && <div className="ringkasan-badge">{ringkasan}</div>}
      </div>
      {children}
    </section>
  );
}
export default Kartu;