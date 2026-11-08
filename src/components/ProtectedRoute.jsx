import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Kullanıcı giriş yapmamışsa geldikleri sayfayı state içinde tutarak /login'e yönlendiriyoruz
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
