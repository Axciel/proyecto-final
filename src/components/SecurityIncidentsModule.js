import React, { useState, useEffect } from 'react';
import activityLogger from './activityLogger';
import './SecurityIncidentsModule.css'; // Asegúrate de importar tu archivo de estilos CSS

const SecurityIncidentsModule = () => {
  const [filteredActivityLog, setFilteredActivityLog] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Obtener registros de actividad
    const allLogs = activityLogger.getLogs();
    setLogs(allLogs);
    setFilteredActivityLog(allLogs);
  }, []);

  useEffect(() => {
    // Filtrar registros por término de búsqueda
    const filteredLogs = logs.filter(log =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredActivityLog(filteredLogs);
  }, [searchTerm, logs]);

  return (
    <div className="security-incidents-module">
      <h2>Registro de Actividad</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por usuario o acción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="activity-list">
        {filteredActivityLog.map((log, index) => (
          <li key={index} className="activity-item">
            <div className="activity-timestamp">{log.timestamp}</div>
            <div className="activity-details">
              <p>Usuario: {log.user}</p>
              <p>Acción: {log.action}</p>
              {/* Otros detalles de registro que desees mostrar */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecurityIncidentsModule;
