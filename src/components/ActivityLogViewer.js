// ActivityLogViewer.js

import React, { useState, useEffect } from 'react';
import activityLogger from './activityLogger';

const ActivityLogViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Observador para actualizar los logs cuando se registre una nueva actividad
    const observer = {
      notify: (activity) => {
        setLogs(prevLogs => [...prevLogs, activity]);
      }
    };

    activityLogger.addObserver(observer);

    return () => {
      // Limpiar el observador al desmontar el componente
      activityLogger.removeObserver(observer);
    };
  }, []);

  return (
    <div className="activity-log">
      <h2>Registro de Actividades</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <p>{log.timestamp} - {log.user} - {log.action}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLogViewer;
