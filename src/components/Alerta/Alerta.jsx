const Alerta = ({ alerta }) => {
    const estilo = {
      background: alerta.error ? 'linear-gradient(to right, #fc8181, #f56565)' : 'linear-gradient(to right, #818cf8, #667eea)',
      textAlign: 'center',
      padding: '0.75rem',
      borderRadius: '0.75rem',
      textTransform: 'uppercase',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.875rem',
      marginBottom: '1rem'
    };
  
    return (
      <div style={estilo}>
        {alerta.msg}
      </div>
    );
  };
  
  export default Alerta;
  