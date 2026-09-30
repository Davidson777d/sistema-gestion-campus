import {
  Search,
  MapPin,
  Users,
  Building2,
  Monitor,
  FlaskConical,
  Presentation,
  Eye,
  CalendarDays,
  X,
  CheckCircle2,
  Clock3
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Instalaciones() {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todas");
  const [instalacionSeleccionada, setInstalacionSeleccionada] =
    useState(null);

  const instalaciones = [
    {
      id: 1,
      nombre: "Auditorio Principal",
      tipo: "Auditorio",
      ubicacion: "Edificio Central",
      capacidad: 300,
      estado: "Disponible",
      icono: Presentation,
      descripcion:
        "Espacio amplio para eventos académicos, conferencias y actividades institucionales.",
      caracteristicas: [
        "Proyector multimedia",
        "Sistema de sonido",
        "Aire acondicionado",
        "Wi-Fi"
      ]
    },

    {
      id: 2,
      nombre: "Aula A-101",
      tipo: "Aula",
      ubicacion: "Edificio A",
      capacidad: 40,
      estado: "Disponible",
      icono: Building2,
      descripcion:
        "Aula equipada para clases, reuniones y actividades académicas.",
      caracteristicas: [
        "Proyector",
        "Aire acondicionado",
        "Pizarra",
        "Wi-Fi"
      ]
    },

    {
      id: 3,
      nombre: "Laboratorio de Computación 1",
      tipo: "Laboratorio",
      ubicacion: "Edificio C",
      capacidad: 35,
      estado: "Ocupado",
      icono: Monitor,
      descripcion:
        "Laboratorio equipado con computadoras para prácticas y clases de tecnología.",
      caracteristicas: [
        "35 computadoras",
        "Proyector",
        "Internet",
        "Aire acondicionado"
      ]
    },

    {
      id: 4,
      nombre: "Laboratorio de Ciencias",
      tipo: "Laboratorio",
      ubicacion: "Edificio C",
      capacidad: 25,
      estado: "Disponible",
      icono: FlaskConical,
      descripcion:
        "Espacio destinado a prácticas de laboratorio y actividades científicas.",
      caracteristicas: [
        "Mesas de laboratorio",
        "Equipamiento científico",
        "Lavamanos",
        "Ventilación"
      ]
    },

    {
      id: 5,
      nombre: "Aula B-204",
      tipo: "Aula",
      ubicacion: "Edificio B",
      capacidad: 45,
      estado: "Mantenimiento",
      icono: Building2,
      descripcion:
        "Aula para actividades académicas y reuniones de grupos estudiantiles.",
      caracteristicas: [
        "Proyector",
        "Pizarra",
        "Aire acondicionado",
        "Wi-Fi"
      ]
    },

    {
      id: 6,
      nombre: "Sala de Conferencias",
      tipo: "Sala",
      ubicacion: "Edificio Administrativo",
      capacidad: 60,
      estado: "Disponible",
      icono: Presentation,
      descripcion:
        "Sala equipada para reuniones, presentaciones y conferencias institucionales.",
      caracteristicas: [
        "Pantalla multimedia",
        "Sistema de sonido",
        "Aire acondicionado",
        "Wi-Fi"
      ]
    }
  ];

  const tipos = [
    "Todas",
    "Aula",
    "Laboratorio",
    "Auditorio",
    "Sala"
  ];

  const instalacionesFiltradas = instalaciones.filter(
    (instalacion) => {
      const textoBusqueda = busqueda.toLowerCase();

      const coincideBusqueda =
        instalacion.nombre
          .toLowerCase()
          .includes(textoBusqueda) ||
        instalacion.ubicacion
          .toLowerCase()
          .includes(textoBusqueda) ||
        instalacion.tipo
          .toLowerCase()
          .includes(textoBusqueda);

      const coincideFiltro =
        filtro === "Todas" ||
        instalacion.tipo === filtro;

      return coincideBusqueda && coincideFiltro;
    }
  );

  const abrirDetalles = (instalacion) => {
    setInstalacionSeleccionada(instalacion);
  };

  const cerrarDetalles = () => {
    setInstalacionSeleccionada(null);
  };

  const solicitarInstalacion = (instalacion) => {
    navigate("/disponibilidad", {
      state: {
        instalacion: instalacion.nombre,
        tipo: instalacion.tipo,
        capacidad: instalacion.capacidad,
        ubicacion: instalacion.ubicacion
      }
    });
  };

  const disponibles = instalaciones.filter(
    (instalacion) =>
      instalacion.estado === "Disponible"
  ).length;

  const ocupadas = instalaciones.filter(
    (instalacion) =>
      instalacion.estado === "Ocupado"
  ).length;

  const mantenimiento = instalaciones.filter(
    (instalacion) =>
      instalacion.estado === "Mantenimiento"
  ).length;

  return (
    <main className="instalaciones-page">

      {/* =====================================================
          ENCABEZADO
      ====================================================== */}

      <section className="instalaciones-header">

        <div>

          <div className="page-badge">

            <Building2 size={16} />

            Gestión de espacios

          </div>

          <h1>
            Instalaciones
          </h1>

          <p>
            Consulta los espacios disponibles y administra
            las instalaciones del campus universitario.
          </p>

        </div>

        <div className="installation-summary">

          <div className="summary-icon">

            <Building2 size={22} />

          </div>

          <div>

            <strong>
              {instalaciones.length}
            </strong>

            <span>
              Espacios registrados
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          ESTADÍSTICAS
      ====================================================== */}

      <section className="installation-stats">

        <div className="installation-stat-card total">

          <div className="installation-stat-icon">

            <Building2 size={20} />

          </div>

          <div>

            <strong>
              {instalaciones.length}
            </strong>

            <span>
              Total
            </span>

          </div>

        </div>


        <div className="installation-stat-card available">

          <div className="installation-stat-icon">

            <CheckCircle2 size={20} />

          </div>

          <div>

            <strong>
              {disponibles}
            </strong>

            <span>
              Disponibles
            </span>

          </div>

        </div>


        <div className="installation-stat-card occupied">

          <div className="installation-stat-icon">

            <Clock3 size={20} />

          </div>

          <div>

            <strong>
              {ocupadas}
            </strong>

            <span>
              Ocupadas
            </span>

          </div>

        </div>


        <div className="installation-stat-card maintenance">

          <div className="installation-stat-icon">

            <FlaskConical size={20} />

          </div>

          <div>

            <strong>
              {mantenimiento}
            </strong>

            <span>
              Mantenimiento
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          BARRA DE HERRAMIENTAS
      ====================================================== */}

      <section className="installation-toolbar">

        <div className="installation-search">

          <Search size={20} />

          <input
            type="text"
            placeholder="Buscar instalación..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
          />

        </div>


        <div className="installation-filters">

          {tipos.map((tipo) => (

            <button
              key={tipo}
              className={
                filtro === tipo
                  ? "filter-active"
                  : ""
              }
              onClick={() =>
                setFiltro(tipo)
              }
            >

              {tipo}

            </button>

          ))}

        </div>

      </section>


      {/* =====================================================
          RESULTADOS
      ====================================================== */}

      <section className="installations-section">

        <div className="installations-section-header">

          <div>

            <h2>
              Espacios del campus
            </h2>

            <p>
              {instalacionesFiltradas.length}{" "}
              instalaciones encontradas
            </p>

          </div>

        </div>


        <div className="installations-grid">

          {instalacionesFiltradas.map(
            (instalacion) => {

              const Icono =
                instalacion.icono;

              return (

                <article
                  className="installation-card"
                  key={instalacion.id}
                >

                  {/* ==========================================
                      PARTE SUPERIOR
                  =========================================== */}

                  <div className="installation-card-top">

                    <div className="installation-icon">

                      <Icono size={25} />

                    </div>


                    <span
                      className={`installation-status ${instalacion.estado
                        .toLowerCase()
                        .replace("ó", "o")}`}
                    >

                      <span className="status-dot"></span>

                      {instalacion.estado}

                    </span>

                  </div>


                  {/* ==========================================
                      INFORMACIÓN
                  =========================================== */}

                  <div className="installation-content">

                    <span className="installation-type">

                      {instalacion.tipo}

                    </span>

                    <h3>
                      {instalacion.nombre}
                    </h3>

                    <p>
                      {instalacion.descripcion}
                    </p>


                    <div className="installation-details">

                      <div>

                        <MapPin size={17} />

                        <span>
                          {instalacion.ubicacion}
                        </span>

                      </div>


                      <div>

                        <Users size={17} />

                        <span>
                          Capacidad:{" "}
                          {instalacion.capacidad}
                        </span>

                      </div>

                    </div>

                  </div>


                  {/* ==========================================
                      BOTONES
                  =========================================== */}

                  <div className="installation-card-footer">

                    <button
                      className="details-button"
                      onClick={() =>
                        abrirDetalles(
                          instalacion
                        )
                      }
                    >

                      <Eye size={17} />

                      Ver detalles

                    </button>


                    {instalacion.estado ===
                      "Disponible" && (

                      <button
                        className="request-button"
                        onClick={() =>
                          solicitarInstalacion(
                            instalacion
                          )
                        }
                      >

                        <CalendarDays
                          size={17}
                        />

                        Solicitar

                      </button>

                    )}

                  </div>

                </article>

              );

            }
          )}

        </div>


        {/* =====================================================
            SIN RESULTADOS
        ====================================================== */}

        {instalacionesFiltradas.length ===
          0 && (

          <div className="no-installations">

            <Building2 size={42} />

            <h3>
              No encontramos instalaciones
            </h3>

            <p>
              Intenta realizar otra búsqueda
              o cambiar el filtro.
            </p>

          </div>

        )}

      </section>


      {/* =====================================================
          MODAL DE DETALLES
      ====================================================== */}

      {instalacionSeleccionada && (

        <div
          className="installation-modal-overlay"
          onClick={cerrarDetalles}
        >

          <div
            className="installation-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ================================================
                CABECERA MODAL
            ================================================= */}

            <div className="installation-modal-header">

              <div>

                <span>
                  {instalacionSeleccionada.tipo}
                </span>

                <h2>
                  {instalacionSeleccionada.nombre}
                </h2>

              </div>


              <button
                className="installation-modal-close"
                onClick={cerrarDetalles}
              >

                <X size={19} />

              </button>

            </div>


            {/* ================================================
                ESTADO
            ================================================= */}

            <div
              className={`installation-modal-status ${instalacionSeleccionada.estado
                .toLowerCase()
                .replace("ó", "o")}`}
            >

              <span className="status-dot"></span>

              {instalacionSeleccionada.estado}

            </div>


            {/* ================================================
                DESCRIPCIÓN
            ================================================= */}

            <div className="installation-modal-description">

              <p>
                {instalacionSeleccionada.descripcion}
              </p>

            </div>


            {/* ================================================
                INFORMACIÓN
            ================================================= */}

            <div className="installation-modal-info">

              <div>

                <MapPin size={19} />

                <section>

                  <span>
                    Ubicación
                  </span>

                  <strong>
                    {instalacionSeleccionada.ubicacion}
                  </strong>

                </section>

              </div>


              <div>

                <Users size={19} />

                <section>

                  <span>
                    Capacidad
                  </span>

                  <strong>
                    {instalacionSeleccionada.capacidad}{" "}
                    personas
                  </strong>

                </section>

              </div>

            </div>


            {/* ================================================
                CARACTERÍSTICAS
            ================================================= */}

            <div className="installation-features">
  <h3>Características</h3>

  <div className="installation-features-list">
    {instalacionSeleccionada.caracteristicas.map(
      (caracteristica, index) => (
        <div className="installation-feature" key={index}>
          <CheckCircle2 size={15} />
          <span>{caracteristica}</span>
        </div>
      )
    )}
  </div>
</div>


            {/* ================================================
                BOTONES MODAL
            ================================================= */}

            <div className="installation-modal-actions">

              <button
                className="installation-modal-secondary"
                onClick={cerrarDetalles}
              >

                Cerrar

              </button>


              {instalacionSeleccionada.estado ===
                "Disponible" && (

                <button
                  className="installation-modal-primary"
                  onClick={() => {
                    cerrarDetalles();

                    solicitarInstalacion(
                      instalacionSeleccionada
                    );
                  }}
                >

                  <CalendarDays size={17} />

                  Consultar disponibilidad

                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default Instalaciones;