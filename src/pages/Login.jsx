import useAuth from "../hooks/useAuth";
import {useState} from 'react';

const Login = () => {
    const containerStyle = {
      marginTop: '2rem',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
      borderRadius: '1rem',
      backgroundColor: 'white',
    };
  
    const inputStyle = {
      border: '1px solid #E5E7EB',
      width: '100%',
      padding: '0.75rem',
      marginTop: '0.75rem',
      borderRadius: '0.5rem',
      backgroundColor: '#F3F4F6',
    };
  
    const buttonStyle = {
      backgroundColor: '#4F46E5',
      width: '100%',
      padding: '1rem',
      border: 'none',
      borderRadius: '0.5rem',
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginTop: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    };
  
    const linkStyle = {
      display: 'block',
      textAlign: 'center',
      marginBottom: '1rem',
      color: '#6B7280',
      fontSize: '1.125rem',
    };
  
    const handleSubmit=(e)=>{
        e.preventDefault;
    }

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    return (
      <>
        <div>
          <h1 style={{ color: '#4F46E5', fontWeight: 'bold', fontSize: '2.5rem' }}>
            Inicia Sesión y Administra tus <span style={{ color: 'black' }}>Pacientes</span>
          </h1>
        </div>
  
        <div style={containerStyle}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ color: '#4B5563', fontSize: '1.25rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Email
              </label>
              <input type="email" id="email" placeholder="Email de Registro" style={inputStyle} />
            </div>
  
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password" style={{ color: '#4B5563', fontSize: '1.25rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Password
              </label>
              <input type="password" id="password" placeholder="Tu Password" style={inputStyle} />
            </div>
  
            <input type="submit" value="Iniciar Sesión" style={buttonStyle} />
          </form>
  
          <nav style={{ marginTop: '2rem' }}>
            <a href="/registrar" style={linkStyle}>
              ¿No tienes una cuenta? Regístrate
            </a>
            <a href="/olvide-password" style={linkStyle}>
              Olvidé mi Password
            </a>
          </nav>
        </div>
      </>
    );
  };
  
  export default Login;