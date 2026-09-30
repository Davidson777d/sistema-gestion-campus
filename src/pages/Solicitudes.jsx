import {
  FileText,
  Building2,
  CalendarDays,
  Clock3,
  Users,
  MapPin,
  Send,
  ArrowLeft,
  CheckCircle2,
  ClipboardList
} from "lucide-react";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSolicitudes } from "../context/SolicitudesContext";
import { useAuth } from "../context/AuthContext";

function Solicitudes() {
  const location = useLocation();
  const navigate = useNavigate();

  const { agregarSolicitud } = useSolicitudes();
  const { usuario } = useAuth();

  const datosDisponibilidad = location.state;

  const [proposito, setProposito] = useState("");
  const [cantidadPersonas, setCantidadPersonas] = useState("");
  const [servicio, setServicio] = useState("Ninguno");
  const [descripcion, setDescripcion] = useState("");
  const [enviada, setEnviada] = useState(false);
  const [solicitudCreada, setSolicitudCreada] = useState(null);

  const instalacion =
    datosDisponibilidad?.instalacion || "Aula A-101";

  const tipo =
    datosDisponibilidad?.tipo || "Aula";

  const fecha =
    datosDisponibilidad?.fecha || "23 Sep 2026";

  const hora =
    datosDisponibilidad?.hora || "10:00 - 12:00";

  const capacidad =
    datosDisponibilidad?.capacidad || 40;

  const ubicacion =
    datosDisponibilidad?.ubicacion || "Edificio A";

  const enviarSolicitud = (e) => {
    e.preventDefault();

    if (!proposito.trim()) {
      return;
    }

    const nuevaSolicitud = agregarSolicitud({
      solicitante: usuario?.nombre || "Usuario",
      instalacion,
      tipo,
      fecha,
      hora,
      personas: Number(cantidadPersonas) || 0,
      proposito,
      servicio,
      descripcion,
      capacidad,
      ubicacion
    });

    setSolicitudCreada(nuevaSolicitud);
    setEnviada(true);
  };

  if (enviada) {
    return (
      <main className="request-page">
        <div className="request-success-container">

          <div className="request-success-icon">
            <CheckCircle2 size={42} />
          </div>

          <span className="request-success-label">
            SOLICITUD REGISTRADA
          </span>

          <h1>¡Solicitud enviada correctamente!</h1>

          <p>
            Tu solicitud ha sido registrada y se encuentra
            pendiente de aprobación.
          </p>

          <div className="request-success-card">

            <div className="success-card-header">
              <div>
                <span>Solicitud</span>

                <strong>
                  {solicitudCreada?.id || "Nueva solicitud"}
                </strong>
              </div>

              <span className="success-status">
                <span></span>
                Pendiente
              </span>
            </div>

            <div className="success-card-divider"></div>

            <div className="success-card-grid">

              <div>
                <span>Instalación</span>
                <strong>
                  <Building2 size={15} />
                  {instalacion}
                </strong>
              </div>

              <div>
                <span>Fecha</span>
                <strong>
                  <CalendarDays size={15} />
                  {fecha}
                </strong>
              </div>

              <div>
                <span>Horario</span>
                <strong>
                  <Clock3 size={15} />
                  {hora}
                </strong>
              </div>

              <div>
                <span>Solicitante</span>
                <strong>
                  <Users size={15} />
                  {usuario?.nombre || "Usuario"}
                </strong>
              </div>

            </div>
          </div>

          <div className="request-success-actions">

            <button
              type="button"
              className="request-secondary-button"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft size={17} />
              Volver al Dashboard
            </button>

            <button
              type="button"
              className="request-primary-button"
              onClick={() => navigate("/historial")}
            >
              <ClipboardList size={17} />
              Ver historial
            </button>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="request-page">

      <section className="request-header">

        <div>
          <span className="request-badge">
            <FileText size={15} />
            GESTIÓN DE ESPACIOS
          </span>

          <h1>Solicitud de instalación</h1>

          <p>
            Completa la información para solicitar el uso
            de una instalación del campus.
          </p>
        </div>

        <button
          type="button"
          className="request-back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={17} />
          Regresar
        </button>

      </section>

      <section className="request-layout">

        <div className="request-form-card">

          <div className="request-card-header">
            <div className="request-card-icon">
              <FileText size={20} />
            </div>

            <div>
              <h2>Información de la solicitud</h2>
              <p>
                Ingresa los datos necesarios para procesar
                tu solicitud.
              </p>
            </div>
          </div>

          <form onSubmit={enviarSolicitud}>

            <div className="request-section-title">
              <span>01</span>
              Información general
            </div>

            <div className="request-form-grid">

              <div className="request-field">

                <label>
                  Propósito de la solicitud
                  <span>*</span>
                </label>

                <input
                  type="text"
                  value={proposito}
                  onChange={(e) =>
                    setProposito(e.target.value)
                  }
                  placeholder="Ej. Clase, conferencia, reunión..."
                  required
                />

              </div>

              <div className="request-field">

                <label>
                  Cantidad de personas
                </label>

                <input
                  type="number"
                  min="1"
                  max={capacidad}
                  value={cantidadPersonas}
                  onChange={(e) =>
                    setCantidadPersonas(e.target.value)
                  }
                  placeholder={`Máximo ${capacidad}`}
                />

              </div>

            </div>

            <div className="request-field">

              <label>
                Servicio adicional
              </label>

              <select
                value={servicio}
                onChange={(e) =>
                  setServicio(e.target.value)
                }
              >
                <option>Ninguno</option>
                <option>Proyector</option>
                <option>Sonido</option>
                <option>Micrófonos</option>
                <option>Internet</option>
                <option>Proyector y sonido</option>
              </select>

            </div>

            <div className="request-field">

              <label>
                Descripción / observaciones
              </label>

              <textarea
                value={descripcion}
                onChange={(e) =>
                  setDescripcion(e.target.value)
                }
                placeholder="Agrega información adicional que consideres importante..."
                rows="5"
              />

            </div>

            <div className="request-section-title">
              <span>02</span>
              Datos de la instalación
            </div>

            <div className="request-installation-summary">

              <div className="request-installation-icon">
                <Building2 size={24} />
              </div>

              <div className="request-installation-info">

                <span>INSTALACIÓN SELECCIONADA</span>

                <strong>
                  {instalacion}
                </strong>

                <p>
                  {tipo} · Capacidad: {capacidad} personas
                </p>

              </div>

            </div>

            <div className="request-data-grid">

              <div className="request-data-item">
                <MapPin size={17} />

                <div>
                  <span>Ubicación</span>
                  <strong>{ubicacion}</strong>
                </div>
              </div>

              <div className="request-data-item">
                <CalendarDays size={17} />

                <div>
                  <span>Fecha</span>
                  <strong>{fecha}</strong>
                </div>
              </div>

              <div className="request-data-item">
                <Clock3 size={17} />

                <div>
                  <span>Horario</span>
                  <strong>{hora}</strong>
                </div>
              </div>

              <div className="request-data-item">
                <Users size={17} />

                <div>
                  <span>Capacidad</span>
                  <strong>{capacidad} personas</strong>
                </div>
              </div>

            </div>

            <div className="request-form-footer">

              <div className="request-required-info">
                <span>*</span>
                Campos obligatorios
              </div>

              <button
                type="submit"
                className="request-submit-button"
              >
                <Send size={17} />
                Enviar solicitud
              </button>

            </div>

          </form>

        </div>

        <aside className="request-summary-card">

          <div className="request-summary-header">

            <span>RESUMEN</span>

            <FileText size={19} />

          </div>

          <h3>
            {instalacion}
          </h3>

          <p className="request-summary-type">
            {tipo}
          </p>

          <div className="request-summary-divider"></div>

          <div className="request-summary-row">

            <CalendarDays size={16} />

            <div>
              <span>Fecha</span>
              <strong>{fecha}</strong>
            </div>

          </div>

          <div className="request-summary-row">

            <Clock3 size={16} />

            <div>
              <span>Horario</span>
              <strong>{hora}</strong>
            </div>

          </div>

          <div className="request-summary-row">

            <MapPin size={16} />

            <div>
              <span>Ubicación</span>
              <strong>{ubicacion}</strong>
            </div>

          </div>

          <div className="request-summary-row">

            <Users size={16} />

            <div>
              <span>Capacidad</span>
              <strong>{capacidad} personas</strong>
            </div>

          </div>

          <div className="request-summary-notice">

            <CheckCircle2 size={17} />

            <p>
              Tu solicitud será enviada al responsable
              correspondiente para su revisión y aprobación.
            </p>

          </div>

        </aside>

      </section>

    </main>
  );
}

export default Solicitudes;