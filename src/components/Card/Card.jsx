import './Card.css';

const Card = ({ openModal,id, nombre, equipo, psw }) => {


  return (
    <div className="card" onClick={() => openModal(id, nombre, equipo, psw)}>
      <div className="card-content">
        <h2>{nombre}</h2>
        <p>Equipo: {equipo ? 'Sí' : 'No'}</p>
        <p>Contraseña:</p>
        <p>{psw ? psw : 'No tiene contraseña'}</p>
        <p>{id}</p>
      </div>
    </div>
  );
}

export default Card;
