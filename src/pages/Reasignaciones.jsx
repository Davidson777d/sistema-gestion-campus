import {
  RefreshCw,
  Search,
  Building2,
  CalendarDays,
  Clock3,
  Users,
  MapPin,
  CheckCircle2,
  ArrowRight,
  X,
  Check
} from "lucide-react";

import { useMemo, useState } from "react";

import { useSolicitudes } from "../context/SolicitudesContext";

function Reasignaciones() {
  const {
    solicitudes,
    reasignarSolicitud
  } = useSolicitudes();

  const [busqueda, setBusqueda] = useState("");
  const [solicitudSeleccionada, setSolicitudSeleccionada] =
    useState(null);

  const [nuevaInstalacion, setNuevaInstalacion] =
    useState("");

  /*
   * Instalaciones disponibles para reasignar.
   */
  const instalaciones = [
    {
      nombre: "Auditorio Principal",
      tipo: "Auditorio",
      capacidad: 300,
      ubicacion: "Edificio Central"
    },
    {
      nombre: "Aula A-101",
      tipo: "Aula",
      capacidad: 40,
      ubicacion: "Edificio A"
    },
    {
      nombre: "Aula A-102",
      tipo: "Aula",
      capacidad: 35,
      ubicacion: "Edificio A"
    },
    {
      nombre: "Laboratorio de Computación 1",
      tipo: "Laboratorio",
      capacidad: 30,
      ubicacion: "Edificio B"
    },
    {
      nombre: "Laboratorio de Computación 2",
      tipo: "Laboratorio",
      capacidad: 35,
      ubicacion: "Edificio B"
    }
  ];

  /*
   * Para reasignar mostramos solicitudes
   * aprobadas.
   */
  const solicitudesDisponibles = useMemo(() => {
    return solicitudes.filter((solicitud) => {
      const coincideEstado =
        solicitud.estado === "Aprobada";

      const texto = busqueda.toLowerCase();

      const coincideBusqueda =
        solicitud.id?.toLowerCase().includes(texto) ||
        solicitud.solicitante
          ?.toLowerCase()
          .includes(texto) ||
        solicitud.instalacion
          ?.toLowerCase()
          .includes(texto);

      return coincideEstado && coincideBusqueda;
    });
  }, [solicitudes, busqueda]);

  /*
   * Abrir ventana de reasignación.
   */
  const abrirReasignacion = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setNuevaInstalacion("");
  };

  /*
   * Confirmar reasignación.
   */
  const confirmarReasignacion = () => {
    if (
      !solicitudSeleccionada ||
      !nuevaInstalacion
    ) {
      return;
    }

    reasignarSolicitud(
      solicitudSeleccionada.id,
      nuevaInstalacion
    );

    setSolicitudSeleccionada(null);
    setNuevaInstalacion("");
  };

  return (
    <main className="reassignments-page">

      {/* =====================================================
          ENCABEZADO
          ===================================================== */}

      <section className="reassignments-header">

        <div>

          <span className="reassignments-badge">
            <RefreshCw size={15} />
            GESTIÓN DE ESPACIOS
          </span>

          <h1>
            Reasignación de instalaciones
          </h1>

          <p>
            Cambia la instalación asignada a una
            solicitud cuando sea necesario.
          </p>

        </div>

      </section>

      {/* =====================================================
          INFORMACIÓN
          ===================================================== */}

      <section className="reassignment-info">

        <div className="reassignment-info-icon">
          <RefreshCw size={22} />
        </div>

        <div>

          <strong>
            Solicitudes disponibles para reasignación
          </strong>

          <p>
            Selecciona una solicitud aprobada para
            cambiar la instalación asignada.
          </p>

        </div>

        <div className="reassignment-count">
          {solicitudesDisponibles.length}
        </div>

      </section>

      {/* =====================================================
          BUSCADOR
          ===================================================== */}

      <section className="reassignment-toolbar">

        <div className="reassignment-search">

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

      </section>

      {/* =====================================================
          LISTA
          ===================================================== */}

      <section className="reassignment-list">

        {solicitudesDisponibles.length > 0 ? (

          solicitudesDisponibles.map((solicitud) => (

            <article
              className="reassignment-card"
              key={solicitud.id}
            >

              {/* CABECERA */}

              <div className="reassignment-card-header">

                <div>

                  <span>
                    SOLICITUD
                  </span>

                  <strong>
                    {solicitud.id}
                  </strong>

                </div>

                <span className="reassignment-status">
                  <CheckCircle2 size={14} />
                  Aprobada
                </span>

              </div>

              {/* INFORMACIÓN PRINCIPAL */}

              <div className="reassignment-main">

                <div className="reassignment-user">

                  <div className="reassignment-avatar">
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

                {/* INSTALACIÓN ACTUAL */}

                <div className="reassignment-installation">

                  <span>
                    INSTALACIÓN ACTUAL
                  </span>

                  <div className="reassignment-installation-box">

                    <Building2 size={19} />

                    <div>

                      <strong>
                        {solicitud.instalacion}
                      </strong>

                      <small>
                        {solicitud.tipo}
                      </small>

                    </div>

                  </div>

                </div>

                <div className="reassignment-arrow">
                  <ArrowRight size={21} />
                </div>

                <div className="reassignment-date-info">

                  <div>
                    <CalendarDays size={16} />

                    <span>
                      {solicitud.fecha}
                    </span>
                  </div>

                  <div>
                    <Clock3 size={16} />

                    <span>
                      {solicitud.hora}
                    </span>
                  </div>

                  <div>
                    <Users size={16} />

                    <span>
                      {solicitud.personas || 0} personas
                    </span>
                  </div>

                </div>

              </div>

              {/* ACCIÓN */}

              <div className="reassignment-card-footer">

                <span>
                  Instalación asignada actualmente:
                  <strong>
                    {" "}{solicitud.instalacion}
                  </strong>
                </span>

                <button
                  type="button"
                  onClick={() =>
                    abrirReasignacion(solicitud)
                  }
                >
                  <RefreshCw size={16} />
                  Reasignar instalación
                </button>

              </div>

            </article>

          ))

        ) : (

          <div className="reassignment-empty">

            <CheckCircle2 size={44} />

            <strong>
              No hay solicitudes para reasignar
            </strong>

            <p>
              Las solicitudes aprobadas aparecerán
              aquí cuando estén disponibles.
            </p>

          </div>

        )}

      </section>

      {/* =====================================================
          MODAL
          ===================================================== */}

      {solicitudSeleccionada && (

        <div
          className="reassignment-modal-overlay"
          onClick={() =>
            setSolicitudSeleccionada(null)
          }
        >

          <div
            className="reassignment-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CABECERA */}

            <div className="reassignment-modal-header">

              <div>

                <span>
                  REASIGNACIÓN
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

            {/* INFORMACIÓN */}

            <div className="reassignment-modal-content">

              <div className="reassignment-selected-info">

                <div className="reassignment-selected-icon">
                  <Building2 size={22} />
                </div>

                <div>

                  <span>
                    INSTALACIÓN ACTUAL
                  </span>

                  <strong>
                    {solicitudSeleccionada.instalacion}
                  </strong>

                </div>

              </div>

              <div className="reassignment-change-arrow">
                <ArrowRight size={22} />
              </div>

              {/* SELECT */}

              <div className="reassignment-field">

                <label>
                  Nueva instalación
                </label>

                <select
                  value={nuevaInstalacion}
                  onChange={(e) =>
                    setNuevaInstalacion(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Selecciona una instalación...
                  </option>

                  {instalaciones
                    .filter(
                      (instalacion) =>
                        instalacion.nombre !==
                        solicitudSeleccionada.instalacion
                    )
                    .map((instalacion) => (

                      <option
                        key={instalacion.nombre}
                        value={instalacion.nombre}
                      >
                        {instalacion.nombre} —{" "}
                        {instalacion.tipo}
                      </option>

                    ))}
                </select>

              </div>

              {/* DATOS */}

              <div className="reassignment-modal-details">

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

            </div>

            {/* BOTONES */}

            <div className="reassignment-modal-actions">

              <button
                type="button"
                className="reassignment-cancel"
                onClick={() =>
                  setSolicitudSeleccionada(null)
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="reassignment-confirm"
                disabled={!nuevaInstalacion}
                onClick={confirmarReasignacion}
              >
                <Check size={16} />
                Confirmar reasignación
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default Reasignaciones;