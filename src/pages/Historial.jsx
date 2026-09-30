import {
  History,
  Search,
  FileText,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Clock3,
  CalendarDays,
  Building2,
  Users,
  UserCircle
} from "lucide-react";

import { useMemo, useState } from "react";

import { useSolicitudes } from "../context/SolicitudesContext";

function Historial() {
  const { solicitudes } = useSolicitudes();

  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todas");

  /*
   * Filtrar historial.
   */
  const historialFiltrado = useMemo(() => {
    return solicitudes.filter((solicitud) => {

      const texto = busqueda.toLowerCase();

      const coincideBusqueda =
        solicitud.id?.toLowerCase().includes(texto) ||
        solicitud.solicitante
          ?.toLowerCase()
          .includes(texto) ||
        solicitud.instalacion
          ?.toLowerCase()
          .includes(texto);

      const coincideFiltro =
        filtro === "Todas" ||
        solicitud.estado === filtro;

      return coincideBusqueda && coincideFiltro;
    });
  }, [solicitudes, busqueda, filtro]);

  /*
   * Cantidades.
   */
  const total = solicitudes.length;

  const pendientes = solicitudes.filter(
    (s) => s.estado === "Pendiente"
  ).length;

  const aprobadas = solicitudes.filter(
    (s) => s.estado === "Aprobada"
  ).length;

  const rechazadas = solicitudes.filter(
    (s) => s.estado === "Rechazada"
  ).length;

  const reasignadas = solicitudes.filter(
    (s) => s.estado === "Reasignada"
  ).length;

  /*
   * Icono según estado.
   */
  const obtenerIconoEstado = (estado) => {

    if (estado === "Aprobada") {
      return <CheckCircle2 size={17} />;
    }

    if (estado === "Rechazada") {
      return <XCircle size={17} />;
    }

    if (estado === "Reasignada") {
      return <RefreshCw size={17} />;
    }

    return <Clock3 size={17} />;
  };

  return (
    <main className="history-page">

      {/* =====================================================
          ENCABEZADO
          ===================================================== */}

      <section className="history-header">

        <div>

          <span className="history-badge">
            <History size={15} />
            REGISTRO DEL SISTEMA
          </span>

          <h1>
            Historial de solicitudes
          </h1>

          <p>
            Consulta el registro de solicitudes y sus
            estados dentro del sistema.
          </p>

        </div>

      </section>

      {/* =====================================================
          ESTADÍSTICAS
          ===================================================== */}

      <section className="history-stats">

        <div className="history-stat">
          <div className="history-stat-icon total">
            <FileText size={20} />
          </div>

          <div>
            <span>Total</span>
            <strong>{total}</strong>
          </div>
        </div>

        <div className="history-stat">
          <div className="history-stat-icon pending">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Pendientes</span>
            <strong>{pendientes}</strong>
          </div>
        </div>

        <div className="history-stat">
          <div className="history-stat-icon approved">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Aprobadas</span>
            <strong>{aprobadas}</strong>
          </div>
        </div>

        <div className="history-stat">
          <div className="history-stat-icon rejected">
            <XCircle size={20} />
          </div>

          <div>
            <span>Rechazadas</span>
            <strong>{rechazadas}</strong>
          </div>
        </div>

        <div className="history-stat">
          <div className="history-stat-icon reassigned">
            <RefreshCw size={20} />
          </div>

          <div>
            <span>Reasignadas</span>
            <strong>{reasignadas}</strong>
          </div>
        </div>

      </section>

      {/* =====================================================
          PANEL
          ===================================================== */}

      <section className="history-panel">

        <div className="history-panel-header">

          <div>

            <span>
              REGISTRO
            </span>

            <h2>
              Actividad de solicitudes
            </h2>

          </div>

          <div className="history-total">
            {historialFiltrado.length} registros
          </div>

        </div>

        {/* ===================================================
            FILTROS
            =================================================== */}

        <div className="history-filters">

          <div className="history-search">

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

          <div className="history-filter-buttons">

            {[
              "Todas",
              "Pendiente",
              "Aprobada",
              "Rechazada",
              "Reasignada"
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
            HISTORIAL
            =================================================== */}

        <div className="history-list">

          {historialFiltrado.length > 0 ? (

            historialFiltrado.map((solicitud) => (

              <article
                className="history-card"
                key={solicitud.id}
              >

                <div
                  className={`history-status-icon ${solicitud.estado.toLowerCase()}`}
                >
                  {obtenerIconoEstado(
                    solicitud.estado
                  )}
                </div>

                <div className="history-card-main">

                  <div className="history-card-top">

                    <div>

                      <span>
                        {solicitud.id}
                      </span>

                      <strong>
                        {solicitud.accion ||
                          "Solicitud registrada"}
                      </strong>

                    </div>

                    <span
                      className={`history-status ${solicitud.estado.toLowerCase()}`}
                    >
                      {solicitud.estado}
                    </span>

                  </div>

                  <div className="history-card-info">

                    <div>
                      <UserCircle size={15} />

                      <span>
                        {solicitud.solicitante}
                      </span>
                    </div>

                    <div>
                      <Building2 size={15} />

                      <span>
                        {solicitud.instalacion}
                      </span>
                    </div>

                    <div>
                      <CalendarDays size={15} />

                      <span>
                        {solicitud.fecha}
                      </span>
                    </div>

                    <div>
                      <Clock3 size={15} />

                      <span>
                        {solicitud.hora}
                      </span>
                    </div>

                    <div>
                      <Users size={15} />

                      <span>
                        {solicitud.personas || 0} personas
                      </span>
                    </div>

                  </div>

                </div>

              </article>

            ))

          ) : (

            <div className="history-empty">

              <History size={43} />

              <strong>
                No hay registros
              </strong>

              <p>
                No existen solicitudes que coincidan
                con los filtros seleccionados.
              </p>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Historial;