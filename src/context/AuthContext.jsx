import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Al iniciar la aplicación no hay ningún usuario autenticado.
  const [usuario, setUsuario] = useState(null);

  // Usuarios de prueba mientras no tenemos conexión con el backend.
  const usuariosPrueba = [
    {
      id: 1,
      carnet: "20260001",
      password: "123456",
      nombre: "María López",
      rol: "Profesor"
    },
    {
      id: 2,
      carnet: "20260002",
      password: "123456",
      nombre: "Carlos Rodríguez",
      rol: "Decano"
    }
  ];

  // Función que utilizará el Login.
  const iniciarSesion = (carnet, password) => {
    const usuarioEncontrado = usuariosPrueba.find(
      (usuario) =>
        usuario.carnet === carnet &&
        usuario.password === password
    );

    if (!usuarioEncontrado) {
      return {
        exitoso: false,
        mensaje: "Carnet o contraseña incorrectos."
      };
    }

    // Guardamos solamente la información necesaria del usuario.
    const usuarioAutenticado = {
      id: usuarioEncontrado.id,
      carnet: usuarioEncontrado.carnet,
      nombre: usuarioEncontrado.nombre,
      rol: usuarioEncontrado.rol
    };

    setUsuario(usuarioAutenticado);

    return {
      exitoso: true,
      usuario: usuarioAutenticado
    };
  };

  // Cerrar sesión.
  const cerrarSesion = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
        setUsuario
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}