// MainMenu.js
import './MainMenu.css'; // Importa el archivo de estilos específico para MainMenu
import React from 'react';

const MainMenu = ({ onSelectModule, onLogout }) => {
  const handleModuleClick = (moduleName) => {
    onSelectModule(moduleName);
  };

  return (
    <div className="main-menu">
      <h2>Main Menu</h2>
      <ul>
        <li onClick={() => handleModuleClick('AuthModule')}>Authentication & Authorization</li>
        <li onClick={() => handleModuleClick('DataStorageModule')}>Data Storage</li>
        <li onClick={() => handleModuleClick('SecurityIncidentsModule')}>Security Incidents</li>
        <li onClick={onLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default MainMenu;
