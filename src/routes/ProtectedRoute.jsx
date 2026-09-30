import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, roles }) {
  const { usuario } = useAuth();

  // Si no ha iniciado sesión, lo mandamos al Login.
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // Si la ruta no tiene roles específicos,
  // cualquier usuario autenticado puede entrar.
  if (!roles || roles.length === 0) {
    return children;
  }

  // Comprobamos si el rol del usuario tiene permiso.
  const tienePermiso = roles.includes(usuario.rol);

  // Si no tiene permiso, lo mandamos al Dashboard.
  if (!tienePermiso) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;