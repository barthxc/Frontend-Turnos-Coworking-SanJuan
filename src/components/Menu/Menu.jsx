import { useNavigate } from 'react-router-dom';
import './Menu.css';

function Menu() {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  }
  return (
    <div className="Menu">
      <header className="Menu-header">
        <nav className="menu">
          <ul>
          <li onClick={() => handleNavigation('/')}>Inicio</li>
            <li onClick={() => handleNavigation('/estaciones')}>Estaciones</li>
            <li onClick={() => handleNavigation('/administrador')}>Administrador</li>
            <li onClick={() => handleNavigation('/logs')}>Logs</li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Menu;
