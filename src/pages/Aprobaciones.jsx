import {
  ClipboardCheck,
  Search,
  Check,
  X,
  CalendarDays,
  Clock3,
  Users,
  Building2,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Eye
} from "lucide-react";

import { useMemo, useState } from "react";

import { useSolicitudes } from "../context/SolicitudesContext";

function Aprobaciones() {
  const {
    solicitudes,
    solicitudesPendientes,
    aprobarSolicitud,
    rechazarSolicitud
  } = useSolicitudes();

  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todas");
  const [solicitudSeleccionada, setSolicitudSeleccionada] =
    useState(null);

  /*
   * Filtrar solicitudes según búsqueda y estado.
   */
  const solicitudesFiltradas = useMemo(() => {
    return solicitudes.filter((solicitud) => {
      const texto = busqueda.toLowerCase();

      const coincideBusqueda =
        solicitud.id?.toLowerCase().includes(texto) ||
        solicitud.solicitante?.toLowerCase().includes(texto) ||
        solicitud.instalacion?.toLowerCase().includes(texto) ||
        solicitud.proposito?.toLowerCase().includes(texto);

      const coincideFiltro =
        filtro === "Todas" ||
        solicitud.estado === filtro;

      return coincideBusqueda && coincideFiltro;
    });
  }, [solicitudes, busqueda, filtro]);

  /*
   * Estadísticas reales.
   */
  const total = solicitudes.length;

  const pendientes = solicitudes.filter(
    (solicitud) => solicitud.estado === "Pendiente"
  ).length;

  const aprobadas = solicitudes.filter(
    (solicitud) => solicitud.estado === "Aprobada"
  ).length;

  const rechazadas = solicitudes.filter(
    (solicitud) => solicitud.estado === "Rechazada"
  ).length;

  /*
   * Aprobar solicitud.
   */
  const aprobar = (id) => {
    aprobarSolicitud(id);

    setSolicitudSeleccionada(null);
  };

  /*
   * Rechazar solicitud.
   */
  const rechazar = (id) => {
    rechazarSolicitud(id);

    setSolicitudSeleccionada(null);
  };

  return (
    <main className="approvals-page">

      {/* =====================================================
          ENCABEZADO
          ===================================================== */}

      <section className="approvals-header">

        <div>

          <span className="approvals-badge">
            <ClipboardCheck size={15} />
            GESTIÓN ADMINISTRATIVA
          </span>

          <h1>
            Aprobación de solicitudes
          </h1>

          <p>
            Revisa y gestiona las solicitudes de uso de
            instalaciones del campus.
          </p>

        </div>

      </section>

      {/* =====================================================
          ESTADÍSTICAS
          ===================================================== */}

      <section className="approvals-stats">

        <div className="approval-stat-card">

          <div className="approval-stat-icon total">
            <FileText size={21} />
          </div>

          <div>
            <span>Total solicitudes</span>
            <strong>{total}</strong>
          </div>

        </div>

        <div className="approval-stat-card">

          <div className="approval-stat-icon pending">
            <Clock size={21} />
          </div>

          <div>
            <span>Pendientes</span>
            <strong>{pendientes}</strong>
          </div>

        </div>

        <div className="approval-stat-card">

          <div className="approval-stat-icon approved">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Aprobadas</span>
            <strong>{aprobadas}</strong>
          </div>

        </div>

        <div className="approval-stat-card">

          <div className="approval-stat-icon rejected">
            <XCircle size={21} />
          </div>

          <div>
            <span>Rechazadas</span>
            <strong>{rechazadas}</strong>
          </div>

        </div>

      </section>

      {/* =====================================================
          PANEL PRINCIPAL
          ===================================================== */}

      <section className="approvals-panel">

        {/* CABECERA DEL PANEL */}

        <div className="approvals-panel-header">

          <div>

            <span className="panel-label">
              SOLICITUDES
            </span>

            <h2>
              Gestión de solicitudes
            </h2>

          </div>

          <div className="approvals-pending-label">
            <span></span>
            {solicitudesPendientes.length} pendientes
          </div>

        </div>

        {/* FILTROS */}

        <div className="approvals-filters">

          <div className="approvals-search">

            <Search size={17} />

            <input
              type="text"
              placeholder="Buscar por solicitante, instalación o ID..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(e.target.value)
              }
            />

          </div>

          <div className="approvals-filter-buttons">

            {[
              "Todas",
              "Pendiente",
              "Aprobada",
              "Rechazada"
            ].map((opcion) => (

              <button
                key={opcion}
                type="button"
                className={
                  filtro === opcion
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFiltro(opcion)
                }
              >
                {opcion}
              </button>

            ))}

          </div>

        </div>

        {/* ===================================================
            LISTA
            =================================================== */}

        <div className="approvals-list">

          {solicitudesFiltradas.length > 0 ? (

            solicitudesFiltradas.map((solicitud) => (

              <article
                className="approval-card"
                key={solicitud.id}
              >

                {/* CABECERA */}

                <div className="approval-card-header">

                  <div className="approval-request-id">

                    <span>
                      SOLICITUD
                    </span>

                    <strong>
                      {solicitud.id}
                    </strong>

                  </div>

                  <span
                    className={`approval-status ${solicitud.estado.toLowerCase()}`}
                  >
                    <span></span>
                    {solicitud.estado}
                  </span>

                </div>

                {/* INFORMACIÓN */}

                <div className="approval-card-content">

                  <div className="approval-applicant">

                    <div className="approval-avatar">

                      {solicitud.solicitante
                        ?.split(" ")
                        .map((nombre) => nombre[0])
                        .join("")
                        .slice(0, 2)}

                    </div>

                    <div>

                      <span>
                        SOLICITANTE
                      </span>

                      <strong>
                        {solicitud.solicitante}
                      </strong>

                    </div>

                  </div>

                  <div className="approval-installation">

                    <Building2 size={18} />

                    <div>

                      <span>
                        INSTALACIÓN
                      </span>

                      <strong>
                        {solicitud.instalacion}
                      </strong>

                    </div>

                  </div>

                </div>

                {/* DETALLES */}

                <div className="approval-details">

                  <div>

                    <CalendarDays size={16} />

                    <div>
                      <span>Fecha</span>
                      <strong>
                        {solicitud.fecha}
                      </strong>
                    </div>

                  </div>

                  <div>

                    <Clock3 size={16} />

                    <div>
                      <span>Horario</span>
                      <strong>
                        {solicitud.hora}
                      </strong>
                    </div>

                  </div>

                  <div>

                    <Users size={16} />

                    <div>
                      <span>Personas</span>
                      <strong>
                        {solicitud.personas || 0}
                      </strong>
                    </div>

                  </div>

                </div>

                {/* PROPÓSITO */}

                {solicitud.proposito && (

                  <div className="approval-purpose">

                    <FileText size={15} />

                    <div>

                      <span>
                        PROPÓSITO
                      </span>

                      <p>
                        {solicitud.proposito}
                      </p>

                    </div>

                  </div>

                )}

                {/* ACCIONES */}

                <div className="approval-card-actions">

                  <button
                    type="button"
                    className="approval-view-button"
                    onClick={() =>
                      setSolicitudSeleccionada(
                        solicitud
                      )
                    }
                  >
                    <Eye size={16} />
                    Ver detalles
                  </button>

                  {solicitud.estado === "Pendiente" && (
                    <div className="approval-decision-buttons">

                      <button
                        type="button"
                        className="approval-reject-button"
                        onClick={() =>
                          rechazar(solicitud.id)
                        }
                      >
                        <X size={16} />
                        Rechazar
                      </button>

                      <button
                        type="button"
                        className="approval-approve-button"
                        onClick={() =>
                          aprobar(solicitud.id)
                        }
                      >
                        <Check size={16} />
                        Aprobar
                      </button>

                    </div>
                  )}

                </div>

              </article>

            ))

          ) : (

            <div className="approvals-empty">

              <CheckCircle2 size={42} />

              <strong>
                No se encontraron solicitudes
              </strong>

              <span>
                No existen solicitudes que coincidan
                con los filtros seleccionados.
              </span>

            </div>

          )}

        </div>

      </section>

      {/* =====================================================
          MODAL DE DETALLES
          ===================================================== */}

      {solicitudSeleccionada && (

        <div
          className="approval-modal-overlay"
          onClick={() =>
            setSolicitudSeleccionada(null)
          }
        >

          <div
            className="approval-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="approval-modal-header">

              <div>

                <span>
                  DETALLES DE SOLICITUD
                </span>

                <h2>
                  {solicitudSeleccionada.id}
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSolicitudSeleccionada(null)
                }
              >
                <X size={20} />
              </button>

            </div>

            <div className="approval-modal-content">

              <div className="approval-modal-section">

                <span>Solicitante</span>

                <strong>
                  {solicitudSeleccionada.solicitante}
                </strong>

              </div>

              <div className="approval-modal-section">

                <span>Instalación</span>

                <strong>
                  {solicitudSeleccionada.instalacion}
                </strong>

              </div>

              <div className="approval-modal-grid">

                <div>
                  <CalendarDays size={16} />
                  <div>
                    <span>Fecha</span>
                    <strong>
                      {solicitudSeleccionada.fecha}
                    </strong>
                  </div>
                </div>

                <div>
                  <Clock3 size={16} />
                  <div>
                    <span>Horario</span>
                    <strong>
                      {solicitudSeleccionada.hora}
                    </strong>
                  </div>
                </div>

                <div>
                  <Users size={16} />
                  <div>
                    <span>Personas</span>
                    <strong>
                      {solicitudSeleccionada.personas || 0}
                    </strong>
                  </div>
                </div>

              </div>

              <div className="approval-modal-section">

                <span>
                  Propósito
                </span>

                <p>
                  {solicitudSeleccionada.proposito ||
                    "Sin descripción"}
                </p>

              </div>

              {solicitudSeleccionada.descripcion && (

                <div className="approval-modal-section">

                  <span>
                    Observaciones
                  </span>

                  <p>
                    {solicitudSeleccionada.descripcion}
                  </p>

                </div>

              )}

            </div>

            {solicitudSeleccionada.estado ===
              "Pendiente" && (

              <div className="approval-modal-actions">

                <button
                  type="button"
                  className="approval-reject-button"
                  onClick={() =>
                    rechazar(
                      solicitudSeleccionada.id
                    )
                  }
                >
                  <X size={16} />
                  Rechazar
                </button>

                <button
                  type="button"
                  className="approval-approve-button"
                  onClick={() =>
                    aprobar(
                      solicitudSeleccionada.id
                    )
                  }
                >
                  <Check size={16} />
                  Aprobar
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </main>
  );
}

export default Aprobaciones;