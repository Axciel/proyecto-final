import React, { createContext, useContext, useState } from 'react';

const ActivityContext = createContext();

export const useActivity = () => {
  return useContext(ActivityContext);
};

export const ActivityProvider = ({ children }) => {
  const [activityLog, setActivityLog] = useState([]);

  const logActivity = (user, action, details) => {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, user, action, details };
    
    setActivityLog(prevLog => [...prevLog, logEntry]);
  };
  

  return (
    <ActivityContext.Provider value={{ activityLog, logActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityContext;
