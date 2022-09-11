import './App.css';
import LoginPage from './pages/authentication/LoginPage.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { Link, Route, Routes, useRoutes } from 'react-router-dom';
export default function App() {
  let element = useRoutes([
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/register',
      element: <LoginPage path="register" />,
    },
    ,
    {
      path: '/login',
      element: <LoginPage path="login" />,
    },
  ]);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login ">Register</Link>
          </li>
        </ul>
      </nav>

      {element}
    </>
  );
}
