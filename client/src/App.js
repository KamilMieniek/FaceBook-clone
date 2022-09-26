import './App.css';
import LoginPage from './pages/authentication/LoginPage.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { Link, Navigate, Route, Routes, useRoutes } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { AuthContext } from './context/AuthenticationContext.js';
import { useContext } from 'react';
export default function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.log(user);
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  let element = useRoutes([
    { path: '*', element: <NotFound /> },
    {
      path: '/',
      //element: <NotFound />,
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/register',
      element: <LoginPage path="register" />,
    },
    {
      path: '/login',
      element: <LoginPage path="login" />,
    },
  ]);
  return (
    <>
      <nav></nav>

      {element}
    </>
  );
}
