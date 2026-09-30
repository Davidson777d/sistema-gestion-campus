import { createContext, useContext, useState } from "react";

const SolicitudesContext = createContext();

export function SolicitudesProvider({ children }) {
  const [solicitudes, setSolicitudes] = useState([
    {
      id: "#125",
      solicitante: "Juan Pérez",
      instalacion: "Auditorio Principal",
      tipo: "Auditorio",
      fecha: "22 Sep 2026",
      hora: "08:00 - 12:00",
      personas: 120,
      proposito: "Conferencia académica",
      estado: "Pendiente",
      accion: "Solicitud creada"
    },
    {
      id: "#126",
      solicitante: "Ana Torres",
      instalacion: "Aula A-101",
      tipo: "Aula",
      fecha: "23 Sep 2026",
      hora: "10:00 - 12:00",
      personas: 35,
      proposito: "Clase especial",
      estado: "Pendiente",
      accion: "Solicitud creada"
    },
    {
      id: "#127",
      solicitante: "Carlos Ruiz",
      instalacion: "Laboratorio 1",
      tipo: "Laboratorio",
      fecha: "24 Sep 2026",
      hora: "14:00 - 16:00",
      personas: 30,
      proposito: "Práctica de laboratorio",
      estado: "Pendiente",
      accion: "Solicitud creada"
    }
  ]);

  // Crear una nueva solicitud
  const agregarSolicitud = (nuevaSolicitud) => {
    const nueva = {
      id: `#${128 + solicitudes.length}`,
      ...nuevaSolicitud,
      estado: "Pendiente",
      accion: "Solicitud creada"
    };

    setSolicitudes((actuales) => [nueva, ...actuales]);

    return nueva;
  };

  // Aprobar una solicitud
  const aprobarSolicitud = (id) => {
    setSolicitudes((actuales) =>
      actuales.map((solicitud) =>
        solicitud.id === id
          ? {
              ...solicitud,
              estado: "Aprobada",
              accion: "Solicitud aprobada"
            }
          : solicitud
      )
    );
  };

  // Rechazar una solicitud
  const rechazarSolicitud = (id) => {
    setSolicitudes((actuales) =>
      actuales.map((solicitud) =>
        solicitud.id === id
          ? {
              ...solicitud,
              estado: "Rechazada",
              accion: "Solicitud rechazada"
            }
          : solicitud
      )
    );
  };

  // Reasignar una instalación
  const reasignarSolicitud = (id, nuevaInstalacion) => {
    setSolicitudes((actuales) =>
      actuales.map((solicitud) =>
        solicitud.id === id
          ? {
              ...solicitud,
              instalacion: nuevaInstalacion,
              estado: "Reasignada",
              accion: "Solicitud reasignada"
            }
          : solicitud
      )
    );
  };

  // Obtener una solicitud específica
  const obtenerSolicitud = (id) => {
    return solicitudes.find((solicitud) => solicitud.id === id);
  };

  // Solicitudes pendientes
  const solicitudesPendientes = solicitudes.filter(
    (solicitud) => solicitud.estado === "Pendiente"
  );

  // Solicitudes aprobadas
  const solicitudesAprobadas = solicitudes.filter(
    (solicitud) => solicitud.estado === "Aprobada"
  );

  // Solicitudes rechazadas
  const solicitudesRechazadas = solicitudes.filter(
    (solicitud) => solicitud.estado === "Rechazada"
  );

  // Solicitudes reasignadas
  const solicitudesReasignadas = solicitudes.filter(
    (solicitud) => solicitud.estado === "Reasignada"
  );

  return (
    <SolicitudesContext.Provider
      value={{
        solicitudes,
        solicitudesPendientes,
        solicitudesAprobadas,
        solicitudesRechazadas,
        solicitudesReasignadas,
        agregarSolicitud,
        aprobarSolicitud,
        rechazarSolicitud,
        reasignarSolicitud,
        obtenerSolicitud
      }}
    >
      {children}
    </SolicitudesContext.Provider>
  );
}

export function useSolicitudes() {
  return useContext(SolicitudesContext);
}