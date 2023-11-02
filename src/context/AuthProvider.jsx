import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user")) || null;
    const initialState = user
      ? { isAuthenticated: true, user }
      : { isAuthenticated: false, user: null };
    setAuth(prevAuth => ({ ...prevAuth, ...initialState })); // Utiliza el callback de setAuth
  }, []); 

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(auth.user));
  }, [auth]);

  return (
    <AuthContext.Provider value={{
      auth,
      setAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;





 //Usar Interceptors
  //Aplicar un useeffect que se ejecute cuando cambie el Auth
  //Proteger las rutas
  /*
        import React, { useState, useEffect } from 'react';

export const Context = React.createContext();

const AuthProvider = ({ children }) => {
    
    // console.log(user)
    const [state, setState] = useState('');
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user")) || '' 
        const initialState = user ? { user } : { user: null };
        setState(initialState)
    },[])

const setUser = (user) => {
        setState((prevState) => { return { ...prevState, user } });
    };

    const context = {
        ...state,
        setUser,
    };

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    );
};

export default AuthProvider;


    */