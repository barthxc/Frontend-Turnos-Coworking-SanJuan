import "./Card2.css";
import './Card.css'

const Card = ({ openModal, id, nombre, equipo, psw }) => {
  return (
    <div
      className="card work"
      onClick={() => openModal(id, nombre, equipo, psw)}
    >
      <div className="img-section">
      </div>
      <div className="card-desc">
        <div className="card-header">
          <div className="card-title"><p>{nombre}</p></div>
        </div>
        <div className="card-time"></div>
        <p className="recent">Equipo: {equipo ? "Sí" : "No"}</p>
      </div>
    </div>
  );
};

export default Card;
