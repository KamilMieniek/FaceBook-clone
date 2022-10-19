import './App.css';
import LoginPage from './pages/authentication/LoginPage.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { useRoutes } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';

import { ProtectedRoute } from './components/routes/ProtectedRoute.jsx';
export default function App() {
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
