import {
  CalendarDays,
  Search,
  Building2,
  Clock3,
  Users,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  ArrowRight
} from "lucide-react";

import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Disponibilidad() {
  const location = useLocation();
  const navigate = useNavigate();

  /*
   * =========================================================
   * DATOS RECIBIDOS DESDE INSTALACIONES
   * =========================================================
   */

  const instalacionRecibida = location.state;

  /*
   * =========================================================
   * ESTADOS
   * =========================================================
   */

  const [busqueda, setBusqueda] = useState(
    instalacionRecibida?.instalacion || ""
  );

  const [filtro, setFiltro] = useState("Todas");

  const [fechaSeleccionada, setFechaSeleccionada] = useState("23");

  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  /*
   * =========================================================
   * FECHAS
   * =========================================================
   */

  const fechas = [
    {
      dia: "21",
      nombre: "Lun",
      mes: "Sep"
    },
    {
      dia: "22",
      nombre: "Mar",
      mes: "Sep"
    },
    {
      dia: "23",
      nombre: "Mié",
      mes: "Sep"
    },
    {
      dia: "24",
      nombre: "Jue",
      mes: "Sep"
    },
    {
      dia: "25",
      nombre: "Vie",
      mes: "Sep"
    },
    {
      dia: "26",
      nombre: "Sáb",
      mes: "Sep"
    }
  ];

  /*
   * =========================================================
   * INSTALACIONES
   * =========================================================
   */

  const instalaciones = [
    {
      id: 1,
      nombre: "Auditorio Principal",
      tipo: "Auditorio",
      ubicacion: "Edificio Central",
      capacidad: 300,
      estado: "Disponible",
      horarios: [
        {
          hora: "08:00 - 10:00",
          estado: "Disponible"
        },
        {
          hora: "10:00 - 12:00",
          estado: "Ocupado"
        },
        {
          hora: "12:00 - 14:00",
          estado: "Disponible"
        },
        {
          hora: "14:00 - 16:00",
          estado: "Disponible"
        },
        {
          hora: "16:00 - 18:00",
          estado: "Ocupado"
        }
      ]
    },

    {
      id: 2,
      nombre: "Aula A-101",
      tipo: "Aula",
      ubicacion: "Edificio A",
      capacidad: 40,
      estado: "Disponible",
      horarios: [
        {
          hora: "08:00 - 10:00",
          estado: "Ocupado"
        },
        {
          hora: "10:00 - 12:00",
          estado: "Disponible"
        },
        {
          hora: "12:00 - 14:00",
          estado: "Disponible"
        },
        {
          hora: "14:00 - 16:00",
          estado: "Ocupado"
        },
        {
          hora: "16:00 - 18:00",
          estado: "Disponible"
        }
      ]
    },

    {
      id: 3,
      nombre: "Laboratorio de Computación 1",
      tipo: "Laboratorio",
      ubicacion: "Edificio C",
      capacidad: 35,
      estado: "Ocupado",
      horarios: [
        {
          hora: "08:00 - 10:00",
          estado: "Ocupado"
        },
        {
          hora: "10:00 - 12:00",
          estado: "Ocupado"
        },
        {
          hora: "12:00 - 14:00",
          estado: "Disponible"
        },
        {
          hora: "14:00 - 16:00",
          estado: "Ocupado"
        },
        {
          hora: "16:00 - 18:00",
          estado: "Disponible"
        }
      ]
    },

    {
      id: 4,
      nombre: "Aula A-102",
      tipo: "Aula",
      ubicacion: "Edificio A",
      capacidad: 35,
      estado: "Disponible",
      horarios: [
        {
          hora: "08:00 - 10:00",
          estado: "Disponible"
        },
        {
          hora: "10:00 - 12:00",
          estado: "Disponible"
        },
        {
          hora: "12:00 - 14:00",
          estado: "Ocupado"
        },
        {
          hora: "14:00 - 16:00",
          estado: "Disponible"
        },
        {
          hora: "16:00 - 18:00",
          estado: "Disponible"
        }
      ]
    },

    {
      id: 5,
      nombre: "Laboratorio de Ciencias",
      tipo: "Laboratorio",
      ubicacion: "Edificio C",
      capacidad: 25,
      estado: "Disponible",
      horarios: [
        {
          hora: "08:00 - 10:00",
          estado: "Disponible"
        },
        {
          hora: "10:00 - 12:00",
          estado: "Ocupado"
        },
        {
          hora: "12:00 - 14:00",
          estado: "Disponible"
        },
        {
          hora: "14:00 - 16:00",
          estado: "Disponible"
        },
        {
          hora: "16:00 - 18:00",
          estado: "Disponible"
        }
      ]
    }
  ];

  /*
   * =========================================================
   * FILTRAR INSTALACIONES
   * =========================================================
   */

  const instalacionesFiltradas = useMemo(() => {
    return instalaciones.filter((instalacion) => {
      const texto = busqueda.toLowerCase();

      const coincideBusqueda =
        instalacion.nombre.toLowerCase().includes(texto) ||
        instalacion.ubicacion.toLowerCase().includes(texto) ||
        instalacion.tipo.toLowerCase().includes(texto);

      const coincideFiltro =
        filtro === "Todas" || instalacion.tipo === filtro;

      return coincideBusqueda && coincideFiltro;
    });
  }, [busqueda, filtro]);

  /*
   * =========================================================
   * SELECCIONAR HORA
   * =========================================================
   */

  const seleccionarHora = (instalacion, horario) => {
    if (horario.estado !== "Disponible") {
      return;
    }

    setHoraSeleccionada({
      instalacion: instalacion.nombre,
      tipo: instalacion.tipo,
      capacidad: instalacion.capacidad,
      ubicacion: instalacion.ubicacion,
      fecha: fechaSeleccionada,
      hora: horario.hora
    });
  };

  /*
   * =========================================================
   * IR A SOLICITUD
   * =========================================================
   */

  const continuarSolicitud = () => {
    if (!horaSeleccionada) {
      return;
    }

    navigate("/solicitudes", {
      state: horaSeleccionada
    });
  };

  /*
   * =========================================================
   * LIMPIAR SELECCIÓN
   * =========================================================
   */

  const limpiarSeleccion = () => {
    setHoraSeleccionada(null);
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <main className="availability-page">

      {/* =====================================================
          ENCABEZADO
          ===================================================== */}

      <section className="availability-header">

        <div>
          <div className="page-badge">
            <CalendarDays size={16} />
            Gestión de horarios
          </div>

          <h1>Disponibilidad</h1>

          <p>
            Consulta los horarios disponibles de las instalaciones
            del campus universitario.
          </p>
        </div>

        <div className="availability-summary">

          <div className="summary-icon">
            <CalendarDays size={22} />
          </div>

          <div>
            <strong>{instalaciones.length}</strong>
            <span>Espacios consultables</span>
          </div>

        </div>

      </section>


      {/* =====================================================
          INSTALACIÓN RECIBIDA
          ===================================================== */}

      {instalacionRecibida?.instalacion && (
        <section className="availability-selected-installation">

          <div className="selected-installation-icon">
            <Building2 size={22} />
          </div>

          <div className="selected-installation-info">

            <span>INSTALACIÓN SELECCIONADA</span>

            <strong>
              {instalacionRecibida.instalacion}
            </strong>

            <p>
              {instalacionRecibida.tipo} ·{" "}
              {instalacionRecibida.ubicacion} ·{" "}
              Capacidad: {instalacionRecibida.capacidad} personas
            </p>

          </div>

          <button
            type="button"
            onClick={() => {
              setBusqueda("");
              navigate("/disponibilidad");
            }}
          >
            Ver todas
          </button>

        </section>
      )}


      {/* =====================================================
          BUSCADOR Y FILTROS
          ===================================================== */}

      <section className="availability-toolbar">

        <div className="availability-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Buscar instalación..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setHoraSeleccionada(null);
            }}
          />

        </div>


        <div className="availability-filters">

          {[
            "Todas",
            "Aula",
            "Laboratorio",
            "Auditorio"
          ].map((tipo) => (

            <button
              key={tipo}
              type="button"
              className={filtro === tipo ? "filter-active" : ""}
              onClick={() => {
                setFiltro(tipo);
                setHoraSeleccionada(null);
              }}
            >
              {tipo}
            </button>

          ))}

        </div>

      </section>


      {/* =====================================================
          SELECCIÓN DE FECHA
          ===================================================== */}

      <section className="availability-date-section">

        <div className="availability-section-heading">

          <div>
            <h2>Selecciona una fecha</h2>

            <p>
              Consulta la disponibilidad para el día seleccionado.
            </p>
          </div>

          <div className="availability-month-navigation">

            <button type="button">
              <ChevronLeft size={17} />
            </button>

            <strong>Septiembre 2026</strong>

            <button type="button">
              <ChevronRight size={17} />
            </button>

          </div>

        </div>


        <div className="availability-dates">

          {fechas.map((fecha) => (

            <button
              type="button"
              key={fecha.dia}
              className={
                fechaSeleccionada === fecha.dia
                  ? "availability-date active"
                  : "availability-date"
              }
              onClick={() => {
                setFechaSeleccionada(fecha.dia);
                setHoraSeleccionada(null);
              }}
            >

              <span>{fecha.nombre}</span>

              <strong>{fecha.dia}</strong>

              <small>{fecha.mes}</small>

            </button>

          ))}

        </div>

      </section>


      {/* =====================================================
          SELECCIÓN ACTUAL
          ===================================================== */}

      {horaSeleccionada && (

        <div className="availability-selection">

          <div className="selection-icon">
            <CheckCircle2 size={19} />
          </div>

          <div className="selection-info">

            <span>HORARIO SELECCIONADO</span>

            <strong>
              {horaSeleccionada.instalacion}
            </strong>

            <p>
              {horaSeleccionada.fecha} de septiembre de 2026 ·{" "}
              {horaSeleccionada.hora}
            </p>

          </div>

          <button
            type="button"
            onClick={limpiarSeleccion}
          >
            Cambiar
          </button>

        </div>

      )}


      {/* =====================================================
          LISTA DE INSTALACIONES
          ===================================================== */}

      <section className="availability-list-section">

        <div className="availability-section-heading">

          <div>

            <h2>
              Horarios disponibles
            </h2>

            <p>
              {instalacionesFiltradas.length} instalaciones encontradas
            </p>

          </div>

          <div className="availability-legend">

            <span>
              <i className="legend-dot available"></i>
              Disponible
            </span>

            <span>
              <i className="legend-dot busy"></i>
              Ocupado
            </span>

          </div>

        </div>


        <div className="availability-grid">

          {instalacionesFiltradas.map((instalacion) => (

            <article
              className="availability-card"
              key={instalacion.id}
            >

              {/* CABECERA */}

              <div className="availability-card-header">

                <div className="availability-card-title">

                  <div className="availability-building-icon">
                    <Building2 size={20} />
                  </div>

                  <div>

                    <span>
                      {instalacion.tipo}
                    </span>

                    <h3>
                      {instalacion.nombre}
                    </h3>

                  </div>

                </div>

                <span
                  className={
                    instalacion.estado === "Disponible"
                      ? "availability-status available"
                      : "availability-status occupied"
                  }
                >
                  {instalacion.estado}
                </span>

              </div>


              {/* INFORMACIÓN */}

              <div className="availability-card-info">

                <div>
                  <MapPin size={15} />
                  <span>{instalacion.ubicacion}</span>
                </div>

                <div>
                  <Users size={15} />
                  <span>
                    {instalacion.capacidad} personas
                  </span>
                </div>

              </div>


              {/* HORARIOS */}

              <div className="availability-hours">

                {instalacion.horarios.map((horario, index) => {

                  const disponible =
                    horario.estado === "Disponible";

                  const seleccionado =
                    horaSeleccionada?.instalacion ===
                      instalacion.nombre &&
                    horaSeleccionada?.hora ===
                      horario.hora;

                  return (

                    <button
                      type="button"
                      key={index}
                      disabled={!disponible}
                      className={`hour-item ${
                        disponible
                          ? "disponible"
                          : "ocupado"
                      } ${
                        seleccionado
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        seleccionarHora(
                          instalacion,
                          horario
                        )
                      }
                    >

                      {disponible ? (
                        <CheckCircle2 size={13} />
                      ) : (
                        <XCircle size={13} />
                      )}

                      <span>
                        {horario.hora}
                      </span>

                    </button>

                  );
                })}

              </div>


              {/* PIE */}

              <div className="availability-card-footer">

                <span>
                  <Clock3 size={14} />
                  Horarios de 2 horas
                </span>

                {instalacion.estado === "Disponible" && (
                  <span className="availability-footer-ready">
                    Disponible para solicitud
                  </span>
                )}

              </div>

            </article>

          ))}

        </div>


        {/* SIN RESULTADOS */}

        {instalacionesFiltradas.length === 0 && (

          <div className="no-availability">

            <Building2 size={42} />

            <h3>
              No encontramos instalaciones
            </h3>

            <p>
              Intenta realizar otra búsqueda o cambiar el filtro.
            </p>

          </div>

        )}

      </section>


      {/* =====================================================
          BOTÓN CONTINUAR
          ===================================================== */}

      <div className="availability-request-footer">

        <button
          type="button"
          className="availability-request-button"
          disabled={!horaSeleccionada}
          onClick={continuarSolicitud}
        >

          <span>
            Continuar con la solicitud
          </span>

          <ArrowRight size={17} />

        </button>

      </div>

    </main>
  );
}

export default Disponibilidad;