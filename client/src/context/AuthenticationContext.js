import { createContext, useEffect, useState } from 'react';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_STATE.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authLoading = () => {
    setLoading(true);
  };
  const authSuccessful = (data) => {
    console.log(data);
    setLoading(false);
    console.log(data);
    setUser(data);
  };
  const authFailure = (error) => {
    console.log(error);
    setLoading(false);
    setUser(null);
    setError(error);
  };
  // useEffect(() => {
  //   localStorage.setItem('user', JSON.stringify(user));
  //   setUser()
  // }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        authLoading,
        authFailure,
        authSuccessful,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
