import "./Landing.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <>
      <section className="custom-section">
        <h1 className="custom-heading"><span className="coworking">Coworking</span> <span className="ciudad">San Juan</span></h1>
        <p className="custom-paragraph">
          Reserva espacios de trabajo para el desarrollo profesional de tus proyectos!
        </p>
        <button
          className="custom-button"
          onClick={() => handleNavigation("/reserva")}
        >
          Reserva ahora
        </button>
      </section>
    </>
  );
};

export default Landing;
