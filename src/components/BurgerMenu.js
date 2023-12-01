import React, { useState } from 'react';
import './BurgerMenu.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const BurgerMenu = ({ onSelectModule, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleModuleClick = (moduleName) => {
    onSelectModule(moduleName);
    setIsOpen(false);
  };

  return (
    <div className="burger-menu">
      <button className="menu-toggle" onClick={handleToggle}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        {/* Botón para cerrar el menú */}
        <button className="close-menu" onClick={handleClose}>
          <FaTimes />
        </button>
        <ul>
          <li onClick={() => handleModuleClick('AuthModule')}>Authentication & Authorization</li>
          <li onClick={() => handleModuleClick('DataStorageModule')}>Data Storage</li>
          <li onClick={() => handleModuleClick('SecurityIncidentsModule')}>Security Incidents</li>
          <li className="logout-button" onClick={onLogout}>Logout</li>
        </ul>
      </div>
      {isOpen && <div className="overlay" onClick={handleToggle}></div>}
    </div>
  );
};

export default BurgerMenu;
