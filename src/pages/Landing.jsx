
import { useNavigate } from "react-router-dom";


const Landing = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  const styleImg = {
    width: '1300px',
    height: '600px'
  };
  return (
    <>
      <div className=" justify-content-center" >
        <img src="./habitacion-vacia-sillas-escritorios.jpg" alt="" style={styleImg}/>
        <div className="text-center">
          <button className="btn btn-sm btn-info" role="button" onClick={() => handleNavigation("/reserva")}>
            <span className="btn btn-sm btn-info" role="button">
              Reserva Ahora
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
