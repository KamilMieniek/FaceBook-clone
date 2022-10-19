import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  // const { user } = useContext(AuthContext);

  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

  return children;
};
