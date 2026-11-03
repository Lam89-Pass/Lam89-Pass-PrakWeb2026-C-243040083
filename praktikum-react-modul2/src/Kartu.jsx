// src/Kartu.jsx
function Kartu({ judul, icon, children }) {
    return (
        <section className="kartu">
            <div className="kartu-header">
                <div className="kartu-icon">{icon}</div>
                <h2>{judul}</h2>
            </div>
            {children}
        </section>
    );
}
export default Kartu;