import {
  FileText,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Check,
  X,
  Building2,
  CalendarDays,
  ArrowUpRight,
  Clock3,
  Users,
  Presentation,
  Monitor
} from "lucide-react";

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useSolicitudes } from "../context/SolicitudesContext";

function Dashboard() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const {
    solicitudes,
    solicitudesPendientes,
    solicitudesAprobadas,
    solicitudesRechazadas,
    solicitudesReasignadas,
    aprobarSolicitud,
    rechazarSolicitud
  } = useSolicitudes();

  const esDecano = usuario?.rol === "Decano";

  /*
   * Si es Decano:
   * mostramos todas las solicitudes pendientes.
   *
   * Si es Profesor:
   * mostramos solamente sus propias solicitudes.
   */
  const solicitudesParaMostrar = useMemo(() => {
    if (esDecano) {
      return solicitudesPendientes;
    }

    return solicitudes.filter(
      (solicitud) =>
        solicitud.solicitante === usuario?.nombre
    );
  }, [
    esDecano,
    solicitudesPendientes,
    solicitudes,
    usuario
  ]);

  /*
   * Estadísticas reales tomadas del contexto.
   */
  const estadisticas = useMemo(() => {
    const lista = esDecano
      ? solicitudes
      : solicitudes.filter(
          (solicitud) =>
            solicitud.solicitante === usuario?.nombre
        );

    return {
      pendientes: lista.filter(
        (solicitud) => solicitud.estado === "Pendiente"
      ).length,

      aprobadas: lista.filter(
        (solicitud) => solicitud.estado === "Aprobada"
      ).length,

      rechazadas: lista.filter(
        (solicitud) => solicitud.estado === "Rechazada"
      ).length,

      reasignaciones: lista.filter(
        (solicitud) => solicitud.estado === "Reasignada"
      ).length
    };
  }, [
    esDecano,
    solicitudes,
    usuario
  ]);

  const irAInstalaciones = () => {
    navigate("/instalaciones");
  };

  const irADisponibilidad = () => {
    navigate("/disponibilidad");
  };

  const irASolicitudes = () => {
    navigate("/solicitudes");
  };

  const irAAprobaciones = () => {
    navigate("/aprobaciones");
  };

  const aprobar = (id) => {
    aprobarSolicitud(id);
  };

  const rechazar = (id) => {
    rechazarSolicitud(id);
  };

  return (
    <main className="dashboard-page">

      {/* =====================================================
          ENCABEZADO
          ===================================================== */}

      <section className="dashboard-welcome">

        <div className="welcome-content">

          <span className="dashboard-badge">
            <Building2 size={16} />
            Sistema de Gestión de Campus
          </span>

          <h1>
            Hola, {usuario?.nombre?.split(" ")[0]} 👋
          </h1>

          <p>
            {esDecano
              ? "Aquí tienes un resumen de la gestión de espacios del campus."
              : "Consulta tus solicitudes y los espacios disponibles del campus."}
          </p>

        </div>

        <div className="welcome-date">

          <CalendarDays size={18} />

          <div>
            <span>Hoy</span>
            <strong>23 de septiembre, 2026</strong>
          </div>

        </div>

      </section>

      {/* =====================================================
          ESTADÍSTICAS
          ===================================================== */}

      <section className="dashboard-stats">

        {/* PENDIENTES */}
        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon pending">
            <FileText size={22} />
          </div>

          <div className="dashboard-stat-info">

            <span>Solicitudes pendientes</span>

            <strong>
              {estadisticas.pendientes}
            </strong>

            <small>
              <ArrowUpRight size={13} />
              Requieren atención
            </small>

          </div>

        </div>

        {/* APROBADAS */}
        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon approved">
            <CheckCircle2 size={22} />
          </div>

          <div className="dashboard-stat-info">

            <span>Solicitudes aprobadas</span>

            <strong>
              {estadisticas.aprobadas}
            </strong>

            <small>
              <Check size={13} />
              Registradas
            </small>

          </div>

        </div>

        {/* RECHAZADAS */}
        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon rejected">
            <XCircle size={22} />
          </div>

          <div className="dashboard-stat-info">

            <span>Solicitudes rechazadas</span>

            <strong>
              {estadisticas.rechazadas}
            </strong>

            <small>
              <X size={13} />
              Este período
            </small>

          </div>

        </div>

        {/* REASIGNACIONES */}
        <div className="dashboard-stat-card">

          <div className="dashboard-stat-icon reassignment">
            <RefreshCw size={22} />
          </div>

          <div className="dashboard-stat-info">

            <span>Reasignaciones</span>

            <strong>
              {estadisticas.reasignaciones}
            </strong>

            <small>
              <Clock3 size={13} />
              Registradas
            </small>

          </div>

        </div>

      </section>

      {/* =====================================================
          SOLICITUDES + DISPONIBILIDAD
          ===================================================== */}

      <section className="dashboard-main-grid">

        {/* ===================================================
            SOLICITUDES
            =================================================== */}

        <div className="dashboard-panel requests-panel">

          <div className="dashboard-panel-header">

            <div>

              <span className="panel-label">
                {esDecano
                  ? "GESTIÓN"
                  : "MIS SOLICITUDES"}
              </span>

              <h2>
                {esDecano
                  ? "Solicitudes pendientes"
                  : "Mis solicitudes recientes"}
              </h2>

            </div>

            <button
              className="dashboard-link"
              type="button"
              onClick={
                esDecano
                  ? irAAprobaciones
                  : irASolicitudes
              }
            >
              Ver todas
              <ArrowUpRight size={16} />
            </button>

          </div>

          <div className="request-list">

            {solicitudesParaMostrar.length > 0 ? (

              solicitudesParaMostrar
                .slice(0, 5)
                .map((solicitud) => (

                  <div
                    className="request-item"
                    key={solicitud.id}
                  >

                    {/* AVATAR */}
                    {esDecano ? (

                      <div className="request-avatar">

                        {solicitud.solicitante
                          ?.split(" ")
                          .map((nombre) => nombre[0])
                          .join("")
                          .slice(0, 2)}

                      </div>

                    ) : (

                      <div className="request-icon">
                        <Building2 size={20} />
                      </div>

                    )}

                    {/* INFORMACIÓN */}
                    <div className="request-information">

                      <div className="request-title">

                        <strong>
                          {esDecano
                            ? solicitud.solicitante
                            : solicitud.instalacion}
                        </strong>

                        <span>
                          {solicitud.id}
                        </span>

                      </div>

                      <div className="request-details">

                        {esDecano && (
                          <span>
                            <Building2 size={14} />
                            {solicitud.instalacion}
                          </span>
                        )}

                        <span>
                          <CalendarDays size={14} />
                          {solicitud.fecha}
                        </span>

                        <span>
                          <Clock3 size={14} />
                          {solicitud.hora}
                        </span>

                      </div>

                    </div>

                    {/* ACCIONES DEL DECANO */}
                    {esDecano ? (

                      <div className="request-actions">

                        <button
                          type="button"
                          className="request-approve"
                          title="Aprobar solicitud"
                          onClick={() =>
                            aprobar(solicitud.id)
                          }
                        >
                          <Check size={17} />
                        </button>

                        <button
                          type="button"
                          className="request-reject"
                          title="Rechazar solicitud"
                          onClick={() =>
                            rechazar(solicitud.id)
                          }
                        >
                          <X size={17} />
                        </button>

                      </div>

                    ) : (

                      <span
                        className={`dashboard-status ${solicitud.estado.toLowerCase()}`}
                      >
                        <span></span>
                        {solicitud.estado}
                      </span>

                    )}

                  </div>

                ))

            ) : (

              <div className="dashboard-empty-state">

                <CheckCircle2 size={34} />

                <strong>
                  {esDecano
                    ? "No hay solicitudes pendientes"
                    : "No tienes solicitudes"}
                </strong>

                <span>
                  {esDecano
                    ? "Todas las solicitudes han sido revisadas."
                    : "Puedes solicitar una instalación desde Disponibilidad."}
                </span>

              </div>

            )}

          </div>

        </div>

        {/* ===================================================
            DISPONIBILIDAD
            =================================================== */}

        <div className="dashboard-panel availability-panel">

          <div className="dashboard-panel-header">

            <div>

              <span className="panel-label">
                ESPACIOS
              </span>

              <h2>
                Disponibilidad
              </h2>

            </div>

            <button
              className="dashboard-icon-link"
              type="button"
              onClick={irADisponibilidad}
              title="Ver disponibilidad"
            >
              <ArrowUpRight size={18} />
            </button>

          </div>

          <div className="availability-summary">

            <div className="availability-total">

              <strong>18</strong>

              <span>
                espacios registrados
              </span>

            </div>

          </div>

          <div className="availability-items">

            <div className="availability-item">

              <div className="availability-item-label">

                <span className="availability-dot available"></span>

                <span>
                  Disponibles
                </span>

              </div>

              <strong>
                12
              </strong>

            </div>

            <div className="availability-item">

              <div className="availability-item-label">

                <span className="availability-dot occupied"></span>

                <span>
                  Ocupados
                </span>

              </div>

              <strong>
                4
              </strong>

            </div>

            <div className="availability-item">

              <div className="availability-item-label">

                <span className="availability-dot maintenance"></span>

                <span>
                  Mantenimiento
                </span>

              </div>

              <strong>
                2
              </strong>

            </div>

          </div>

          <div className="availability-bar">

            <span
              className="available-bar"
              style={{ width: "67%" }}
            ></span>

            <span
              className="occupied-bar"
              style={{ width: "22%" }}
            ></span>

            <span
              className="maintenance-bar"
              style={{ width: "11%" }}
            ></span>

          </div>

          <button
            className="availability-button"
            type="button"
            onClick={irADisponibilidad}
          >
            <CalendarDays size={17} />
            Consultar disponibilidad
          </button>

        </div>

      </section>

      {/* =====================================================
          INSTALACIONES + ACCIONES
          ===================================================== */}

      <section className="dashboard-bottom-grid">

        {/* INSTALACIONES */}
        <div className="dashboard-panel popular-panel">

          <div className="dashboard-panel-header">

            <div>

              <span className="panel-label">
                CAMPUS
              </span>

              <h2>
                Instalaciones destacadas
              </h2>

            </div>

            <button
              className="dashboard-link"
              type="button"
              onClick={irAInstalaciones}
            >
              Ver catálogo
              <ArrowUpRight size={16} />
            </button>

          </div>

          <div className="popular-list">

            <div className="popular-item">

              <div className="popular-icon">
                <Presentation size={21} />
              </div>

              <div className="popular-information">

                <strong>
                  Auditorio Principal
                </strong>

                <span>
                  <Users size={13} />
                  Capacidad: 300 personas
                </span>

              </div>

              <div className="popular-percentage">

                <strong>
                  82%
                </strong>

                <span>
                  uso
                </span>

              </div>

            </div>

            <div className="popular-item">

              <div className="popular-icon">
                <Building2 size={20} />
              </div>

              <div className="popular-information">

                <strong>
                  Aula A-101
                </strong>

                <span>
                  <Users size={13} />
                  Capacidad: 40 personas
                </span>

              </div>

              <div className="popular-percentage">

                <strong>
                  67%
                </strong>

                <span>
                  uso
                </span>

              </div>

            </div>

            <div className="popular-item">

              <div className="popular-icon">
                <Monitor size={21} />
              </div>

              <div className="popular-information">

                <strong>
                  Laboratorio 1
                </strong>

                <span>
                  <Users size={13} />
                  Capacidad: 35 personas
                </span>

              </div>

              <div className="popular-percentage">

                <strong>
                  54%
                </strong>

                <span>
                  uso
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ACCIONES */}
        <div className="dashboard-panel quick-panel">

          <div className="dashboard-panel-header">

            <div>

              <span className="panel-label">
                ACCESO RÁPIDO
              </span>

              <h2>
                Acciones
              </h2>

            </div>

          </div>

          <div className="quick-actions">

            <button
              className="quick-action"
              type="button"
              onClick={irAInstalaciones}
            >

              <div className="quick-action-icon blue">
                <Building2 size={20} />
              </div>

              <div>

                <strong>
                  Ver instalaciones
                </strong>

                <span>
                  Explorar espacios
                </span>

              </div>

              <ArrowUpRight size={17} />

            </button>

            <button
              className="quick-action"
              type="button"
              onClick={irADisponibilidad}
            >

              <div className="quick-action-icon green">
                <CalendarDays size={20} />
              </div>

              <div>

                <strong>
                  Disponibilidad
                </strong>

                <span>
                  Consultar horarios
                </span>

              </div>

              <ArrowUpRight size={17} />

            </button>

            <button
              className="quick-action"
              type="button"
              onClick={irASolicitudes}
            >

              <div className="quick-action-icon purple">
                <FileText size={20} />
              </div>

              <div>

                <strong>
                  Nueva solicitud
                </strong>

                <span>
                  Solicitar un espacio
                </span>

              </div>

              <ArrowUpRight size={17} />

            </button>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Dashboard;