import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Instalaciones from "./pages/Instalaciones";
import Disponibilidad from "./pages/Disponibilidad";
import Solicitudes from "./pages/Solicitudes";
import Aprobaciones from "./pages/Aprobaciones";
import Reasignaciones from "./pages/Reasignaciones";
import Historial from "./pages/Historial";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { SolicitudesProvider } from "./context/SolicitudesContext";

import ProtectedRoute from "./routes/ProtectedRoute";

function Layout() {
  const { usuario } = useAuth();

  return (
    <div className="app">

      {usuario && <Sidebar />}

      <div className={`main-content ${usuario ? "" : "login-main-content"}`}>

        {usuario && <Navbar />}

        <Routes>

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Si entra a "/" */}
          <Route
            path="/"
            element={
              usuario
                ? <Navigate to="/dashboard" replace />
                : <Navigate to="/login" replace />
            }
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* INSTALACIONES */}
          <Route
            path="/instalaciones"
            element={
              <ProtectedRoute>
                <Instalaciones />
              </ProtectedRoute>
            }
          />

          {/* DISPONIBILIDAD */}
          <Route
            path="/disponibilidad"
            element={
              <ProtectedRoute>
                <Disponibilidad />
              </ProtectedRoute>
            }
          />

          {/* SOLICITUDES */}
          <Route
            path="/solicitudes"
            element={
              <ProtectedRoute>
                <Solicitudes />
              </ProtectedRoute>
            }
          />

          {/* APROBACIONES */}
          <Route
            path="/aprobaciones"
            element={
              <ProtectedRoute roles={["Decano"]}>
                <Aprobaciones />
              </ProtectedRoute>
            }
          />

          {/* REASIGNACIONES */}
          <Route
            path="/reasignaciones"
            element={
              <ProtectedRoute roles={["Decano"]}>
                <Reasignaciones />
              </ProtectedRoute>
            }
          />

          {/* HISTORIAL */}
          <Route
            path="/historial"
            element={
              <ProtectedRoute roles={["Decano"]}>
                <Historial />
              </ProtectedRoute>
            }
          />

          {/* RUTA NO EXISTENTE */}
          <Route
            path="*"
            element={
              <Navigate
                to={usuario ? "/dashboard" : "/login"}
                replace
              />
            }
          />

        </Routes>

      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <AuthProvider>

        <SolicitudesProvider>

          <Layout />

        </SolicitudesProvider>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;