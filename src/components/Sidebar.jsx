import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  FileText,
  ClipboardCheck,
  RefreshCw,
  History,
  LogOut,
  UserCircle
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { usuario, cerrarSesion } = useAuth();

  if (!usuario) {
    return null;
  }

  const esDecano = usuario.rol === "Decano";

  return (
    <aside className="sidebar">

      {/* =========================
          LOGO DE LA UNIVERSIDAD
      ========================== */}
      <div className="sidebar-brand">

        <div className="sidebar-brand-logo-container">
          <img
            src="/src/assets/unicit-logo.png"
            alt="Logo UNICIT"
            className="sidebar-brand-logo"
          />
        </div>

        <div className="sidebar-brand-info">
          <strong>UNICIT</strong>
          <span>Campus Virtual</span>
        </div>

      </div>


      {/* =========================
          SEPARADOR
      ========================== */}
      <div className="sidebar-separator"></div>


      {/* =========================
          MENÚ PRINCIPAL
      ========================== */}
      <div className="sidebar-section-title">
        MENÚ PRINCIPAL
      </div>

      <nav className="sidebar-menu">

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>


        {/* Instalaciones */}
        <NavLink
          to="/instalaciones"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Building2 size={20} />
          <span>Instalaciones</span>
        </NavLink>


        {/* Disponibilidad */}
        <NavLink
          to="/disponibilidad"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <CalendarDays size={20} />
          <span>Disponibilidad</span>
        </NavLink>


        {/* Solicitudes */}
        <NavLink
          to="/solicitudes"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FileText size={20} />
          <span>Solicitudes</span>
        </NavLink>


        {/* =========================
            OPCIONES DEL DECANO
        ========================== */}
        {esDecano && (
          <>
            <div className="sidebar-section-title sidebar-section-secondary">
              GESTIÓN
            </div>

            {/* Aprobaciones */}
            <NavLink
              to="/aprobaciones"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <ClipboardCheck size={20} />
              <span>Aprobaciones</span>
            </NavLink>


            {/* Reasignaciones */}
            <NavLink
              to="/reasignaciones"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <RefreshCw size={20} />
              <span>Reasignaciones</span>
            </NavLink>


            {/* Historial */}
            <NavLink
              to="/historial"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <History size={20} />
              <span>Historial</span>
            </NavLink>
          </>
        )}

      </nav>


      {/* =========================
          USUARIO
      ========================== */}
      <div className="sidebar-bottom">

        <div className="sidebar-user">

          <div className="sidebar-user-icon">
            <UserCircle size={38} />
          </div>

          <div className="sidebar-user-info">
            <strong>{usuario.nombre}</strong>
            <span>{usuario.rol}</span>
          </div>

        </div>


        {/* =========================
            CERRAR SESIÓN
        ========================== */}
        <button
          className="logout-button"
          onClick={cerrarSesion}
        >
          <LogOut size={19} />
          <span>Cerrar sesión</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;