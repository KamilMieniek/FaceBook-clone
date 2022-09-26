import { createContext, useEffect, useReducer } from 'react';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(authState.user));
  }, [authState.user]);

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
