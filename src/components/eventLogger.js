const eventLogger = {
  logActivity: (user, action, details) => {
    const timestamp = new Date().toISOString();
    const logEntry = { id: Math.random().toString(36).substr(2, 9), timestamp, user, action, details };
    
    let incidentLog = JSON.parse(localStorage.getItem('incidentLog')) || [];
    incidentLog.push(logEntry);
    localStorage.setItem('incidentLog', JSON.stringify(incidentLog));

    console.log('Actividad registrada:', logEntry);
  },
};

export default eventLogger;
